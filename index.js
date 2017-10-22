const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('dotenv').config();


// INIT APP
const app = express();

// MIDDLEWARE
app.use(express.static((__dirname + '/client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({secret: 'build crew', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());


// PASSPORT START
passport.serializeUser((user, done) => {
  let name = user._json.name;
  let id = user._json.id;
  let picture = user._json.picture.data.url;
  let email = user._json.email;
  console.log('User profile has been received');
  console.log('Display name', name);
  console.log('Picture', picture);
  console.log('Email', email);
  //TODO: A function which tests if user is in db by email
  //handleUserDataFacebook(user)
  done(null, id);
});

passport.deserializeUser((id, done) => {
  // TODO: A function which finds User data from db
  //User.findById(id, function(err, user) {
    // done(err,user)
  //})
  done(null, id);
});

passport.use(new FacebookStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'photos', 'emails', 'displayName']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('AccessToken', accessToken);
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

app.get('/logout', function(req, res){
  req.logout();
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
  console.log('SERVER STARTED: Listening on port:' + port);
});

module.exports = app;
