const expect = require('chai').expect;
const requests = require('../../client/components/utils/requests.jsx');
const seed = require('../../server/db/seed.js');

describe('Front-end API requests', function() {

  beforeEach(function(done) {
    seed().then(function() { done(); });
  });

  xit('Updates the status of a task to completed', function(done) {
    requests.UpdateTask(1, (data) => {
      expect(data.completed).to.be.true;
      done();
    });
  });

  it('Gets all of the tasks for a leader of a crew to verify', function(done) {
    requests.GetLeaderTasks(4, (tasks) => {
      expect(tasks).to.exist;
      done();
    });
  });
});