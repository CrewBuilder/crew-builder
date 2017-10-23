let jwt = require('jsonwebtoken');
let expressJwt = require('express-jwt');
let express = require('express');
let router = express.Router();
let FacebookTokenStrategy = require('passport-facebook-token');
let passport = require('passport')
let User = require('./../../db/models/User.js');

passport.use(new FacebookTokenStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_SECRET,
}, function (accessToken, refreshToken, profile, done) {
  // TODO: must define upsertFbUser method. This will find or create a new user with facebook
  // User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
  //   return done(err, user);
  // });
}));

let createToken = (auth) => {
  return jwt.sign({
    id: auth.id
  }, 'crew-bldr-secret', {
    expiresIn: 60 * 120
  });
};

let generateToken = (req, res, next) => {
  req.token = create(req.auth);
  next();
}

let sendToken = (req, res) => {
  res.setHeader('x-auth-token', req.token);
  res.status(200).send(req.auth);
};

let authenticate = expressJwt({
  secret: 'crew-bldr-secret',
  requestProperty: 'auth',
  getToken: (req) => {
    if (req.headers['x-auth-token']) {
      return req.headers['x-auth-token'];
    } else return null;
  }
});

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

  let getCurrentUser = (req, res, next) => {
    // TODO: Find user by ID helper function
    //User.findById(req.auth.id, function (err, user) {
      // if (err) {
      //   next(err)
      // } else {
      //   req.user = user;
      //   next();
      // }
    // })
  }

  let getOne = (req, res) => {
    let user = req.user.toObject();

    delete user['facebookProvider'];
    delete user['__v'];

    res.json(user);
  }

  router.route('/auth/me')
  .get(authenticate, getCurrentUser, getOne);

module.exports = router;
