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

exports.getTasksByCrew = (crewId, cb) => {
  db.task.findAll({
    where: {crewId: crewId}
  })
    .then(tasks => {
      if (!tasks.length) {
        cb('No tasks found.', null);
      } else {
        cb(null, tasks);
      }
    });
};

exports.getUnverifiedTasks = (crewId, cb) => {
  db.user_crew.findAll({
    attributes: ['user_id'],
    where: {crew_id: crewId}
  })
    .then(userCrews => {
      if (!userCrews.length) {
        cb('no users found for this crew', null);
      } else {
        userIds = userCrews.map(userCrew => {
          return userCrew.user_id;
        });
        return db.user.findAll({
          where: { id: userIds},
          include: [{
            model: db.task,
            where: {crewId: crewId},
            through: {
              where: {completed: true, verified: false},
              attributes: ['id']
            }
          }]
        });
      }
    })
    .then(users => {
      var taskList = [ ];
      users.forEach(user => {
        let profile = JSON.parse(user.facebook);
        user.tasks.forEach(task => {
          taskList.push({
            taskId: task.id,
            taskName: task.name,
            taskDescription: task.description,
            points: task.points,
            userId: user.id,
            userName: profile.DISPLAY_NAME,
            userEmail: profile.EMAIL,
            userImg: profile.IMAGE_URL,
            userTaskId: task.user_task.id
          });
        });
      });
      cb(null, taskList);
    })
    .catch(err => {
      cb(err, null);
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



