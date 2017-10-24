const Sequelize = require('sequelize');
require('dotenv').config();
const expect = require('chai').expect;
const seed = require('../../../server/db/seed.js');
const User = require('../../../server/db/models/User.js');
const Crew = require('../../../server/db/models/Crew.js');
const Task = require('../../../server/db/models/Task.js');
const UserCrew = require('../../../server/db/models/User_Crew.js');
const UserTask = require('../../../server/db/models/User_Task.js');
const db = new Sequelize('crewbuilder', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
});

describe('Postgres crewbuilder db', function() {

  beforeEach(function(done) {
    seed().then(function() { done(); });
  });

  it('Should connect to the crewbuilder database', function() {
    return db.authenticate();
  });

  it('Upsert should create a new user if facebook id is not yet in the db', function(done) {
    let profile = '{"DISPLAY_NAME":"maryjane","EMAIL":"maryjane@maryjane.com","IMAGE_URL":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}';
    let facebookId = '123456';
    // this should eventually test upsert helper function, for now query is written here
    User.findOne({ where: { facebookId: facebookId } })
      .then(function(user) {
        if (!user) {
          // No user found... one should be created
          User.create({ facebookId: facebookId, facebook: profile })
            .then(function(user) {
              console.log('User created');
              expect(user.facebook).to.equal(profile);
              done();
            });
        }
      });
  });

  it('Upsert should not create a new user if facebookId already exists', function(done) {
    let profile = '{"DISPLAY_NAME":"maryjane","EMAIL":"maryjane@maryjane.com","IMAGE_URL":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}';
    let facebookId = '123456';
    // create user
    User.create({ facebookId: facebookId, facebook: profile })
      .then(function() { return User.findOne({ where: { facebookId: facebookId } }); })
      .then(function(user) {
        if (!user) {
          // should not enter this conditional
          User.create({ facebookId: facebookId, facebook: profile })
            .then(function(user) {
              done(user); // should fail if this is reached
            });
        } else {
          expect(user).to.exist;
          done();
        }
      });
  });
});