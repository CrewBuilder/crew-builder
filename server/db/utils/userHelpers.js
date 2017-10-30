let db = require('../index.js');

//Find or create user
exports.upsertFbUser = (profile, cb) => {
  // Find user by FB id
  db.user.findOne(
    {
      where: {
        facebook_id: profile.facebookId
      }
    })
    .then(user => {
      if (!user) {
        // No user found...let's create one
        db.user.create(profile)
          .then(user => {
            console.log('Created a new user', user);
            // Callback with user data
            return cb(null, user);
          });
      } else {
        return cb(err, null);
      }
    });
};

// Returns user for given User id
exports.findUserById = (id, cb) => {
  db.user.findById(id)
    .then(user => {
      cb(null, user);
    })
    .catch(err => {
      cb(err, null);
    });
};