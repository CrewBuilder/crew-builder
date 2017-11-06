const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
const User = require('../models').User;
const config = require('../config/config.js')[facebook];


// Define strategy
module.exports = () => {
  passport.use(new FacebookTokenStrategy({
    clientID: config.FB_CLIENT_ID,
    clientSecret: config.FB_SECRET
  },
  function (accessToken, refreshToken, profile, done) {
  //make profile data manageable in our DB
    let userProfile = {
      facebook_id: profile.id,
      facebook: {
        DISPLAY_NAME: profile.displayName,
        EMAIL: profile.emails[0].value,
        IMAGE_URL: profile.photos[0].value,
        TOKEN: accessToken
      }
    };
    User
      .upsert({
        facebook_id: userProfile.facebook_id,
        facebook: userProfile.facebook
      })
      .then(() => done());
  }));
};