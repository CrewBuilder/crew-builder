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
            user_id: userId,
            crew_id: crewId
          }
        });
      })
      .catch(err => {
        expect(err).to.exist;
        done();
      });
  });
  /* *************** associations *************** */
  it('Should retrieve a list of a crew\'s unverified tasks for crew leader view', function(done) {
    taskHelpers.getUnverifiedTasks(4, (err, tasks) => {
      expect(tasks.length).to.equal(2);
      done();
    });
  });

});