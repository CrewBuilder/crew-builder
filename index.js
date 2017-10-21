const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;


// INIT APP
const app = express();

// MIDDLEWARE
app.use(express.static((__dirname + '/client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.get('*', (req, res) => {
  res.send('Server is Running');
});

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
    clientID: '356644548109752',
    clientSecret: '52ad76caab8dd22fbece177eb65aa942',
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // TODO: Add CRUD database command here
    //                                   |
    //                                   v
    // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

// PASSPORT END

// CHECK PORT AND START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server Started: Listening on port:' + port);
});

module.exports = app;
