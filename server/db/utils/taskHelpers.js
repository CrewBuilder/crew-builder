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
exports.findAllTasksByIds = (ids, crew_id, cb) => {
  db.task.findAll({
    where: {
      crew_id: crew_id,
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

// Returns all tasks not in array of id(s). User by '/user/tasks' endpoint in config.js.
exports.findAllTasksByNotIds = (ids, crew_id, cb) => {
  db.task.findAll({
    where: {
      crew_id: crew_id,
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

exports.getTasksByCrew = (crew_id, cb) => {
  db.task.findAll({
    where: {crew_id: crew_id}
  })
    .then(tasks => {
      if (!tasks.length) {
        cb('No tasks found.', null);
      } else {
        cb(null, tasks);
      }
    });
};

exports.getUnverifiedTasks = (crew_id) => {
  return db.task.findAll({
    attributes: ['id', 'name', 'description', 'points', 'expiry'],
    where: {crew_id: crew_id},
    include: [{
      model: db.user_task,
      where: {completed: true, verified: false},
      include: {
        model: db.user
      }
    }]
  });
};

// Allows task creation
exports.postTask = (taskData, cb) => {
  db.task.create(taskData)
    .then(task => {
      // Callback with task data
      return cb(null, task);
    })
    .catch(err => {
      return cb(err, null);
    });
};



