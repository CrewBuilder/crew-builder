let Crews_Tasks = require('./../models/Crew_Task.js');


// Returns all of a user's tasks. Used in config.js.
exports.getTasksByUser = (id, cb) => {
  Crew_Task.findAll({
    where: {
      crewId: id
    }
  }, (err, tasksData) => {
    if (!tasksData.length) {
      cb(err, null);
    } else {
      cb(null, tasksData);
    }
  });
}