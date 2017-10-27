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

  /* *************** user Tests *************** */
  xit('Should create a new user if facebook id is not yet in the db', function(done) {
    // this might eventually test upsert helper function, for now query is written here
    let profile = '{"DISPLAY_NAME":"maryjane","EMAIL":"maryjane@maryjane.com","IMAGE_URL":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}';
    let facebook_id = '123456';
    db.user.findOne({ where: { facebook_id: facebook_id } })
      .then(function(user) {
        if (!user) {
          // No user found... one should be created
          db.user.create({ facebook_id: facebook_id, facebook: profile })
            .then(function(user) {
              console.log('user created');
              expect(user.facebook).to.equal(profile);
              done();
            });
        }
      });
  });

  xit('Should not create a new user if facebook_id already exists', function(done) {
    // this might eventually test upsert helper function, for now query is written here
    let profile = '{"DISPLAY_NAME":"maryjane","EMAIL":"maryjane@maryjane.com","IMAGE_URL":"https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"}';
    let facebook_id = '123456';
    // create user
    db.user.create({ facebook_id: facebook_id, facebook: profile })
      .then(function() { return db.user.findOne({ where: { facebook_id: facebook_id } }); })
      .then(function(user) {
        if (!user) {
          // should not enter this conditional
          db.user.create({ facebook_id: facebook_id, facebook: profile })
            .then(function(user) {
              done(user); // should fail if this is reached
            });
        } else {
          expect(user).to.exist;
          done();
        }
      });

  });


  /* *************** user_crew Tests *************** */
  xit('Should find all crews associated with a user via the user_crew join table', function(done) {
    // seed data has user 1 belonging to 5 crews
    db.user_crew.findAll({
      where: {
        user_id: 1
      }
    })
      .then(crews => {
        if (!crews.length) {
          done('No crews found for user 1');
        } else {
          expect(crews.length).to.equal(5);
          done();
        }
      })
      .catch(err => {
        done(err);
      });
  });

  /* *************** user_task Tests *************** */
  xit('Should find all tasks associated with a user via the user_task join table', function(done) {
    db.user_task.findAll({
      where: {
        user_id: 1
      }
    })
      .then(tasksData => {
        if (!tasksData.length) {
          done('No tasks found for user 1');
        } else {
          expect(tasksData.length).to.equal(7);
          done();
        }
      })
      .catch(err => {
        done(err);
      });
  });


  /* *************** crew Tests *************** */
  xit('Should create a new crew by id', function(done) {
    db.crew.findById(1)
      .then(crew => {
        expect(crew.id).to.equal(1);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  xit('Should return all crews matching an array of ids', function(done) {
    db.crew.findAll({
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

  xit('Should create a new crew', function(done) {
    let crewData = {
      "name": "Christiansen, Grimes and Rosenbaum",
      "description": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.",
      "image": "http://dummyimage.com/160x231.jpg/cc0000/ffffff"
    };
    db.crew.create(crewData)
      .then(crew => {
        expect(crew.name).to.equal(crewData.name);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  /* *************** task Tests *************** */
  xit('Should find a task by Id', function(done) {
    db.task.findById(25)
      .then(task => {
        expect(task.id).to.equal(25);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  xit('Should find all crews matching an array of ids', function(done) {
    db.task.findAll({
      where: {
        id: {
          $in: [1, 2, 3, 4, 5]
        }
      }
    })
      .then(tasksData => {
        if (!tasksData.length) {
          done(err);
        } else {
          expect(tasksData.length).to.equal(5);
          done();
        }
      });
  });

  xit('Should create a new task', function(done) {
    var taskData = {
      "name": "Viola clauseniana Baker",
      "description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.",
      "points": 89,
      "crewId": 4,
      "expiry": "2017-01-25T19:10:29Z",
      "limit": 66
    };
    db.task.create(taskData)
      .then(task => {
        expect(task.name).to.equal(taskData.name);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Should build a custom task table based on the user_tasks and tasks tables', function(done) {
    db.user.findOne({
      where: {id: 1},
      include: [{
        model: db.task,
        where: {crewId: 4},
        through: {
          attributes: ['completed', 'verified']
        }
      }]
    })
      .then(user => {
        console.log(user.tasks[0]);
        expect(user.tasks.length).to.equal(3);
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});