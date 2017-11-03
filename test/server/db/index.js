const Sequelize = require('sequelize');
require('dotenv').config();
const expect = require('chai').expect;
const seed = require('../../../server/db/seed.js');
const db = require('../../../server/db/index.js');
const crewHelpers = require('../../../server/db/utils/crewHelpers.js');
const taskHelpers = require('../../../server/db/utils/taskHelpers.js');
const user_crewHelpers = require('../../../server/db/utils/user_crewHelpers.js');
const user_taskHelpers = require('../../../server/db/utils/user_taskHelpers.js');
const userHelpers = require('../../../server/db/utils/userHelpers.js');

describe('Postgres crewbuilder db', function() {

  beforeEach(function(done) {
    seed().then(function() { done(); });
  });

  it('Should connect to the crewbuilder database', function() {
    return db.sequelize.authenticate();
  });

  it('Should remove a row from the user-crew table when a user requests to leave', function(done) {
    user_crewHelpers.leaveCrew(1, 4)
      .then(deleted => {
        return db.user_crew.findOne({
          where: {
            user_id: 1,
            crew_id: 4
          }
        });
      })
      .then(userCrew => {
        console.log(userCrew);
        expect(!userCrew).to.be.true;
        done();
      })
      .catch(err => {
        done(err);
      });
  });
  /* *************** associations *************** */
  it('Should retrieve a list of a crew\'s unverified tasks for crew leader view', function(done) {
    taskHelpers.getUnverifiedTasks(13)
      .then(tasks => {
        expect(tasks[0].id).to.equal(98);
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Should delete a task and all associated user_tasks', function(done) {
    taskHelpers.deleteTask(5)
      .then(deleted => {
        expect(deleted).to.equal(1);
      })
      .then(() => {
        return db.user_task.findAll({
          where: {
            task_id: 5
          }
        });
      })
      .then((user_tasks => {
        expect(user_tasks.length).to.equal(0);
        done();
      }))
      .catch(err => {
        done(err);
      });
  });

});