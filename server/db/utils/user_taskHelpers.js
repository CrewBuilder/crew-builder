let Users_Tasks = require('./../models/User_Task.js');


// Returns all of a user's tasks. Used in config.js.
exports.getTasksByUser = (id, cb) => {
  Users_Tasks.findAll({
    where: {
      userId: id
    }
  }, (err, tasksData) => {
    if (!tasksData.length) {
      cb(err, null);
    } else {
      cb(null, tasksData);
    }
  });
}