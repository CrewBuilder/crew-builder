const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fbRouting = require('./server/auth/utils/facebookTokens.js');
const cors = require('cors');
const passportConfig = require('./server/auth/passport.js');
const cloudinary = require('cloudinary');
const multer = require('multer');
const upload = multer({dest: './uploads/'});
const db = require('./server/models/index.js');
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
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log('SERVER STARTED: Listening on port:' + port);
    });
  });
}

app.post('/image', upload.single('picture'), function(req, res, next) {
  // console.log(req.file)
  if (req.file) {
    cloudinary.v2.uploader.upload(req.file.path, {public_id: req.file.originalname},
      function(error, result) {
        // console.log(result)
        res.json({success: true, message: result.secure_url})
      })
  } else {
    res.status(500);
    res.send("Image was not uploaded to cloudinary")
  }
})

cloudinary.v2.uploader.upload('my_image.jpg', {public_id: "sample_id"},
    function(error, result){console.log(result)});

module.exports = app;
