let Task = require('./../models/Task.js');

// Returns a single task by its unique id
exports.findTaskById = (id, cb) => {
  Task.findById(id)
  .then(task => {
    cb(null, task);
  })
  .catch(err => {
    cb(err, null);
  })
}

// Returns all tasks for array of id(s). Used by '/user/tasks' endpoint in config.js.
exports.findAllTasksByIds = (ids, cb) => {
  Task.findAll({
    where: {
      id: {
        $in: ids
      }
    }
  }, (err, tasksData) => {
    if (!tasksData.length) {
      cb(err, null);
    } else {
      cb(null, tasksData);
    }
  });
}


