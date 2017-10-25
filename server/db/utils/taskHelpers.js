const db = require('../index.js');
// Returns a single task by its unique id
exports.findTaskById = (id, cb) => {
  db.Task.findById(id)
    .then(task => {
      cb(null, task);
    })
    .catch(err => {
      cb(err, null);
    });
};

// Returns all tasks for array of id(s). Used by '/user/tasks' endpoint in config.js.
exports.findAllTasksByIds = (ids, cb) => {
  db.Task.findAll({
    where: {
      id: {
        $in: ids
      }
    }
  })
    .then(tasksData => {
      if (!tasksData.length) {
        cb(err, null);
      } else {
        cb(null, tasksData);
      }
    });
};

// Allows task creation
exports.postTask = (taskData, cb) => {
  db.Task.create(taskData)
    .then(task => {
      console.log('Created a new task', task);
      // Callback with task data
      return cb(null, task);
    })
    .catch(err => {
      return cb(err, null);
    });
};



