const Sequelize = require('sequelize');
require('dotenv').config();
const expect = require('chai').expect;
const User = require('../../../server/db/models/User.js');
const Crew = require('../../../server/db/models/Crew.js');
const Task = require('../../../server/db/models/Task.js');
const UserCrew = require('../../../server/db/models/User_Crew.js');
const UserTask = require('../../../server/db/models/User_Task.js');

describe('Postgres crewbuilder db', function() {
  var db;

  beforeEach(function(done) {
    //connect to (presumably seeded) database 'crewbuilder'
    db = new Sequelize('crewbuilder', process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
    });
    done();
  });

  afterEach(function() {
  });

  it('Should connect to the crewbuilder database', function() {
    return db.authenticate();
  });

  it('Should create a new user if facebook id is not already in the db', function(done) {
    let profile = '{"DISPLAY_NAME": "maryjane", "EMAIL": "maryjane@maryjane.com", "IMAGE_URL": "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg", "FACEBOOK_ID": "123456"}';
    profile = JSON.parse(profile);

    User.findOne(
      {
        where: {
          facebook: {
            FACEBOOK_ID: profile.FACEBOOK_ID
          }
        }
      })
      .then(function(user) {
        if (!user) {
          // No user found...let's create one
          User.create({ facebook: JSON.stringify(profile) })
            .then(user => {
              console.log('User created');
              expect(user.facebook).to.equal(profile);
            });
        }
      });
    done();
  });
});