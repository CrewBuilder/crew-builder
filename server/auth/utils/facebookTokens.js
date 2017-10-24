let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let express = require('express');
let router = express.Router();
let passport = require('passport')
let User = require('./../../db/models/User.js');
let upsertFbUser = require('./../../db/utils/userHelpers.js').upsertFbUser;
let findUserById = require('./../../db/utils/userHelpers.js').findUserById;

// Hashes a unique JWT for our user
let createToken = (auth) => {
  return jwt.sign({
    id: auth.id
  }, 'crew-bldr-secret', {
    expiresIn: 60 * 120
  });
};

// Sets req.token property
let generateToken = (req, res, next) => {
  req.token = createToken(req.auth);
  next();
}

// Sends token to client
let sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};

// Matches a user's token to ours
let authenticate = expressJwt({
  secret: 'crew-bldr-secret',
  requestProperty: 'auth',
  getToken: (req) => {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    } else return null;
  }
});

// Handles /auth route for facebook
router.route('/auth/facebook')
.post(passport.authenticate('facebook-token', {session: false}), (req, res, next) => {
  if (!req.user) {
    return res.status(401, 'User not authenticated');
  } else {
    req.auth = {
      id: req.user.id
    };
    next();
  }

}, generateToken, sendToken);

// Returns User data by id
let getCurrentUser = (req, res, next) => {
  findUserById(req.auth.id, (err, user) => {
    if (err) {
      next(err);
    } else {
      req.user = user;
      next();
    }
  });
}

let getOne = (req, res) => {
  let user = req.user;
  // TODO: Determine if we need any of this 'facebook' data sent to the client. Probably we want to keep it here
  delete user['facebook']['TOKEN'];
  // TODO: Determine if this makes things cleaner
  //delete user['__v'];

  res.json(user);
}

// Expects req.user.id to be defined. Queries DB and returns the User's data
router.route('/auth/me')
.get(authenticate, getCurrentUser, getOne);

module.exports = router;