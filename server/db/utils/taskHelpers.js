const db = require('../index.js');
// Returns a single task by its unique id
exports.findTaskById = (id, cb) => {
  db.task.findById(id)
    .then(task => {
      cb(null, task);
    })
    .catch(err => {
      cb(err, null);
    });
};

// Returns all tasks for array of id(s). Used by '/user/tasks' endpoint in config.js.
exports.findAllTasksByIds = (ids, crewId, cb) => {
  db.task.findAll({
    where: {
      crewId: crewId,
      id: {
        $in: ids
      }
    }
  })
    .then(tasksData => {
      console.log('ddd',tasksData)
      if (!tasksData.length) {
        cb(err, null);
      } else {
        cb(null, tasksData);
      }
    });
};

// Returns all tasks not in array of id(s). User by '/user/tasks' endpoint in config.js.
exports.findAllTasksByNotIds = (ids, crewId, cb) => {
  db.task.findAll({
    where: {
      crewId: crewId,
      id: {
        $notIn: ids
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
  db.task.create(taskData)
    .then(task => {
      console.log('Created a new task', task);
      // Callback with task data
      return cb(null, task);
    })
    .catch(err => {
      return cb(err, null);
    });
};



