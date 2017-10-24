const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
const upsertFbUser = require('./../db/utils/userHelpers.js').upsertFbUser;


// Define strategy
module.exports = () => {
  passport.use(new FacebookTokenStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_SECRET,
  },
  function (accessToken, refreshToken, profile, done) {
  //make profile data manageable in our DB
    let userProfile = {
      FACEBOOK_ID: profile.id,
      DISPLAY_NAME: profile.name,
      EMAIL: profile.emails[0].value,
      IMAGE_URL: profile.photos[0].value,
      TOKEN: accessToken
    }
    upsertFbUser(userProfile, done);
  }));
};


