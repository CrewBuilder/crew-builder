const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

// INIT APP
const app = express();

// MIDDLEWARE
app.use(express.static((__dirname + '/client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());


// PASSPORT START
passport.serializeUser(function(user, done) {
  console.log('User profile has been received and is:', user );
  //TODO: A function which tests if user is in db by email
  //handleUserDataFacebook(user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // TODO: Add CRUD database command here
    //                                   |
    //                                   v
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
    return cb(null, profile)
  }
));

app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// PASSPORT END

// ROUTES
app.get('*', (req, res) => {
  res.send('Server is Running');
});
// CHECK PORT AND START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server Started: Listening on port:' + port);
});

module.exports = app;
