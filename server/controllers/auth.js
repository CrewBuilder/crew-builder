let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let User = require('../../models').User;

module.exports.lookup = (req, res) => {
  return expressJwt({
    secret: 'crew-bldr-secret',
    requestProperty: 'auth',
    getToken: (req) => {
      if (req.headers['x-auth-token']) {
        return req.headers['x-auth-token'];
      } else {
        return null;
      }
    }
  })
    .then(() => {
      return User
        .findOne({
          where: {
            facebook_id: req.auth.id
          }
        });
    })
    .then(user => {
      delete user.facebook.TOKEN;
      res.json(user);
    });
};

module.exports.facebook = (req, res) => {
  if (!req.user) {
    res.status(401).send('User not authenticated');
  } else {
    req.auth = {
      id: req.user.id
    };
    return new Promise((resolve, reject) => {
      jwt
        .sign({ id: req.auth.id },
          'crew-bldr-secret',
          { expiresIn: 60 * 120 },
          (err, token) => {
            if (err) {
              reject(err);
            } else {
              resolve(token);
            }
          });
    })
      .then(token => {
        res.setHeader('x-auth-token', token);
        res.status(200).send(req.auth);
      });
  }
};