const Sequelize = require('sequelize');
require('dotenv').config();
const expect = require('chai').expect;
const seed = require('../../../server/db/seed.js');
const db = require('../../../server/db/index.js');
const userCrewHelpers = require('../../../server/db/utils/user_crewHelpers');

describe('Postgres crewbuilder db', function() {

  beforeEach(function(done) {
    seed().then(function() { done(); });
  });

  it('Should connect to the crewbuilder database', function() {
    return db.sequelize.authenticate();
  });



  it('Should remove a row from the user-crew table when a user requests to leave', function(done) {
    userCrewHelpers.leaveCrew(1, 4)
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

});