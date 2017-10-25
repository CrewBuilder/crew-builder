const Sequelize = require('sequelize');
require('dotenv').config();
const expect = require('chai').expect;
const seed = require('../../../server/db/seed.js');
const db = require('../../../server/db/index.js');

describe('Postgres crewbuilder db', function() {

  beforeEach(function(done) {
    seed().then(function() { done(); });
  });

  it('Should connect to the crewbuilder database', function() {
    return db.sequelize.authenticate();
  });

  it('Should create a new user if facebook id is not yet in the db', function(done) {
    // this might eventually test upsert helper function, for now query is written here
    let profile = '{"DISPLAY_NAME":"maryjane","EMAIL":"maryjane@maryjane.com","IMAGE_URL":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}';
    let facebookId = '123456';
    db.User.findOne({ where: { facebookId: facebookId } })
      .then(function(user) {
        if (!user) {
          // No user found... one should be created
          db.User.create({ facebookId: facebookId, facebook: profile })
            .then(function(user) {
              console.log('User created');
              expect(user.facebook).to.equal(profile);
              done();
            });
        }
      });
  });

  it('Should not create a new user if facebookId already exists', function(done) {
    // this might eventually test upsert helper function, for now query is written here
    let profile = '{"DISPLAY_NAME":"maryjane","EMAIL":"maryjane@maryjane.com","IMAGE_URL":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}';
    let facebookId = '123456';
    // create user
    db.User.create({ facebookId: facebookId, facebook: profile })
      .then(function() { return db.User.findOne({ where: { facebookId: facebookId } }); })
      .then(function(user) {
        if (!user) {
          // should not enter this conditional
          db.User.create({ facebookId: facebookId, facebook: profile })
            .then(function(user) {
              done(user); // should fail if this is reached
            });
        } else {
          expect(user).to.exist;
          done();
        }
      });

  });

  it('Should associate a user with crews via the users_crews join table', function(done) {
    // seed data has user 1 belonging to 5 crews
    db.User.findOne( { where: { id: 1 } } )
      .then(function(user) {
        return db.User_Crew.findAll({ where: { userId: 1 } });
      })
      .then(function(crews) {
        expect(crews.length).to.equal(5);
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('Should create a new crew by id', function(done) {
    db.Crew.findById(1)
      .then(crew => {
        expect(crew.id).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Should return all crews given an array of ids', function(done) {
    db.Crew.findAll({
      where: {
        id: {
          $in: [1, 2, 3, 4]
        }
      }
    })
      .then(crewsData => {
        if (!crewsData.length) {
          done(err);
        } else {
          expect(crewsData.length).to.equal(4);
          done();
        }
      });
  });

  it('Should create a new crew', function(done) {
    let crewData = {
      "name": "Christiansen, Grimes and Rosenbaum",
      "description": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
      "image": "http://dummyimage.com/160x231.jpg/cc0000/ffffff"
    };
    db.Crew.create(crewData)
      .then(crew => {
        expect(crew.name).to.equal(crewData.name);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});