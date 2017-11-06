const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fbRouting = require('./server/auth/utils/facebookTokens.js');
const cors = require('cors');
const passportConfig = require('./server/auth/passport.js');
const db = require('./server/models/index.js');
const seed = require('./server/seeders');
require('dotenv').config();

passportConfig();
// INIT APP
const app = express();

//CORS config
let corsOption = {
  origin: true,
  methods: 'OPTIONS,GET,HEAD,PUT,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


// MIDDLEWARE
app.use(express.static((__dirname + '/client/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Add ROUTES
app.use(fbRouting);
require('./server/routes')(app);

// ROUTES
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/public/index.html');
});

// CHECK PORT AND START SERVER
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV && process.env.NODE_ENV === 'test') {
  app.listen(port, () => {
    console.log('SERVER STARTED: Listening on port:' + port);
  });
} else {
  seed(db)
    .then(() => {
      app.listen(port, () => {
        console.log('SERVER STARTED: Listening on port:' + port);
      });
    });
}

module.exports = app;
