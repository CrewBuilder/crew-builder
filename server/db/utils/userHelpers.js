let User = require('./../models/User.js');

//Find or create user
exports.upsertFbUser = (profile, cb) => {
  // Find user by FB id
  User.findOne(
    {
      where: {
        facebookId: profile.facebookId
      }
    })
  .then(user => {
    if (!user) {
      // No user found...let's create one
      User.create(profile)
      .then(user => {
        console.log('Created a new user', user);
        // Callback with user data
        return cb(null, user);
      });
    } else {
      return cb(err, null);
    }
  })
}

// Returns user for given User id
exports.findUserById = (id, cb) => {
  User.findById(id)
  .then(user => {
    cb(null, user);
  })
  .catch(err => {
    cb(err, null);
  })
}