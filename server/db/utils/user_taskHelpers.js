const db = require('../index.js');

// Returns all of a user's tasks. Used in config.js.
exports.getTasksByUser = (id, cb) => {
  db.User_Task.findAll({
    where: {
      userId: id
    }
  })
    .then(tasksData => {
      if (!tasksData.length) {
        cb(`No tasks for user: ${id}`, null);
      } else {
        cb(null, tasksData);
      }
    })
    .catch(err => {
      cb(err, null);
    });
};