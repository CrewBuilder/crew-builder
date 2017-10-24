const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fbRouting = require('./server/auth/utils/facebookTokens');
let cors = require('cors');
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
//CORS config
let corsOption = {
  origin: true,
  methods: 'GET,HEAD,PUT,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));
//Add ROUTES
app.use(fbRouting);


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
