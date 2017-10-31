const Sequelize = require('sequelize');
require('dotenv').config();
const expect = require('chai').expect;
const seed = require('../../../server/db/seed.js');
const db = require('../../../server/db/index.js');

xdescribe('Postgres crewbuilder db', function() {

  beforeEach(function(done) {
    seed().then(function() { done(); });
  });

  it('Should connect to the crewbuilder database', function() {
    return db.sequelize.authenticate();
  });


  /* *************** associations *************** */
  it('Should retrieve a list of a crew\'s tasks in progress using the associations between crews, tasks, and users', function(done) {
    db.user_crew.findAll({
      attributes: ['user_id'],
      where: {crew_id: 4}
    })
      .then(userCrews => {
        if (!userCrews.length) {
          done('no users found for this crew');
        } else {
          userIds = userCrews.map(userCrew => {
            return userCrew.user_id;
          });
          return db.user.findAll({
            where: { id: userIds},
            include: [{
              model: db.task,
              where: {crewId: 4},
              through: {
                where: {completed: true, verified: false},
                attributes: ['id']
              }
            }]
          });
        }
      })
      .then(users => {
        var taskList = [ ];
        users.forEach(user => {
          let profile = JSON.parse(user.facebook);
          user.tasks.forEach(task => {
            taskList.push({
              taskId: task.id,
              taskName: task.name,
              taskDescription: task.description,
              points: task.points,
              userId: user.id,
              userName: profile.DISPLAY_NAME,
              userEmail: profile.EMAIL,
              userImg: profile.IMAGE_URL,
              userTaskId: task.user_task.id
            });
          });
        });
        expect(taskList.length).to.equal(2);
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
        expect(user.tasks.length).to.equal(3);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  xit('Should build a custom crew list for a user', function(done) {
    db.user.findOne({
      where: {
        id: 1
      },
      include: [{
        model: db.crew,
        through: {
          attributes: ['points', 'role', 'achievement']
        }
      }]
    })
      .then(user => {
        if (!user.crews.length) {
          done(`No crews for user: ${id}`);
        } else {
          console.log(user.crews[0].user_crew.points);
          expect(user.crews.length).to.equal(5);
          done();
        }
      })
      .catch(err => {
        done(err);
      });
  });

  /* *************** user *************** */
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

  /* *************** user_crew *************** */
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

  /* *************** user_task *************** */
  xit('Should create a new entry in user_task when a user claims a task', function(done) {
    db.user_task.create({
      user_id: 1,
      task_id: 45
    })
      .then(userTask => {
        expect(userTask.completed).to.equal(false);
        done();
      })
      .catch(err => {
        done(err);
      });
  });


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

  /* *************** crew *************** */
  xit('Should find a new crew by id', function(done) {
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
      'name': 'Christiansen, Grimes and Rosenbaum',
      'description': 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim.',
      'image': 'http://dummyimage.com/160x231.jpg/cc0000/ffffff'
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

  /* *************** task *************** */
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
      'name': 'Viola clauseniana Baker',
      'description': 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.',
      'points': 89,
      'crewId': 4,
      'expiry': '2017-01-25T19:10:29Z',
      'limit': 66
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

  /* *************** special routes *************** */
  xit('Should return two lists of tasks for a user: tasksInProgress and tasksAvailable', function(done) {
    let tasksInProgress = [];
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
        if (!user) {
          done('no data found');
        } else {
          tasksInProgress = user.tasks;
          let excludeIds = user.tasks.map(task => task.id);
          return db.task.findAll({
            where: {
              id: {
                $notIn: excludeIds
              },
              crewId: 4
            }
          });
        }
      })
      .then(tasks => {
        let response = {
          tasksInProgress: tasksInProgress,
          tasksAvailable: tasks
        };
        expect(response.tasksAvailable.length).to.equal(7);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  xit('Should update a task as verified and add points to user_crews', function(done) {
    let userId, taskId, crewId, points, newPoints, userCrew;
    const verified = true;
    db.user_task.update(
      {
        completed: true, // this may already be true, but doing this makes the request work for both verifiying and completing
        verified: verified
      },
      {
        where: {id: 10}
      })
      .then((updated) => {
        return db.user_task.findOne({ where: {id: 10}});
      })
      .then(userTask => {
        userId = userTask.user_id;
        taskId = userTask.task_id;
        return db.task.findOne({where: {id: taskId}});
      })
      .then(task => {
        points = task.points;
        crewId = task.crewId;
        return db.user_crew.findOne({where: {user_id: userId, crew_id: crewId}});
      })
      .then(userCrew => {
        newPoints = verified ? userCrew.points + points : userCrew.points; //will only add points when being verified
        return db.user_crew.update({points: newPoints}, {where: {user_id: userId, crew_id: crewId}});
      })
      .then(updated => {
        return db.user_crew.findOne({where: {user_id: userId, crew_id: crewId}});
      })
      .then(userCrew => {
        expect(userCrew.points).to.equal(newPoints);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  xit('Should mark a task as complete in user_task without adding any points', function(done) {
    let userId, taskId, crewId, points, newPoints, userCrew;
    const verified = false;
    db.user_task.update(
      {
        completed: true, // this may already be true, but doing this makes the request work for both verifiying and completing
        verified: verified
      },
      {
        where: {id: 4}
      })
      .then((updated) => {
        return db.user_task.findOne({ where: {id: 4}});
      })
      .then(userTask => {
        userId = userTask.user_id;
        taskId = userTask.task_id;
        return db.task.findOne({where: {id: taskId}});
      })
      .then(task => {
        points = task.points;
        crewId = task.crewId;
        return db.user_crew.findOne({where: {user_id: userId, crew_id: crewId}});
      })
      .then(userCrew => {
        newPoints = verified ? userCrew.points + points : userCrew.points; //will only add points when being verified
        return db.user_crew.update({points: newPoints}, {where: {user_id: userId, crew_id: crewId}});
      })
      .then(updated => {
        return db.user_crew.findOne({where: {user_id: userId, crew_id: crewId}});
      })
      .then(userCrew => {
        expect(userCrew.points).to.equal(0);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Should return crews that match a search term', function(done) {
    db.crew.findAll({
      where: {
        $or: {
          name: {
            $iLike: '%Integer%'
          },
          description: {
            $iLike: '%Integer%'
          }
        }
      }
    })
      .then(crews => {
        console.log(crews);
        expect(crews.length).to.equal(3);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

});