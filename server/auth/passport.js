const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
const upsertFbUser = require('./../controllers/users.js').newUser;


// Define strategy
module.exports = () => {
  passport.use(new FacebookTokenStrategy({
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_SECRET,
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
    return upsertFbUser(userProfile)
      .then((user) => done(user));
  }));
};


