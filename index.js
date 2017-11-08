const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fbRouting = require('./server/auth/utils/facebookTokens.js');
const modelRouting = require('./server/db/routing/config.js');
const cors = require('cors');
const passportConfig = require('./server/auth/passport.js');
const db = require('./server/db/index.js');
const cloudinary = require('cloudinary');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const checkAuth = require('./server/db/utils/authHelpers').verifyToken;

require('dotenv').config();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

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
app.use(modelRouting);

// ROUTES
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/client/public/index.html');
});

// CHECK PORT AND START SERVER
const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log('SERVER STARTED: Listening on port:' + port);
// });

db.sequelize.sync().then(function() {
  app.listen(port, () => {
    console.log('SERVER STARTED: Listening on port:' + port);
  });
});

app.post('/image', upload.single('picture'), function(req, res, next) {
  // console.log(req.file)
  if (req.file) {
    cloudinary.v2.uploader.upload(req.file.path, {public_id: req.file.originalname},
      function(error, result) {
        // console.log(result)
        res.json({success: true, message: result.secure_url});
      });
  } else {
    res.json({success: true, message: `http://res.cloudinary.com/${process.env.CLOUD_NAME}/image/upload/group-of-people-in-a-formation_318-44341.jpg.jpg`});
  }
});


module.exports = app;
