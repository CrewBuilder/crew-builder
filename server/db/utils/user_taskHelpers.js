const db = require('../index.js');

// Returns all of a user's tasks. not currently in use, replaced by query below
exports.getTasksByUser = (userId, cb) => {
  db.user_task.findAll({
    where: {
      userId: userId
    }
  })
    .then(tasksData => {
      let ids = [];

      if (!tasksData.length) {
        cb(`No tasks for user: ${id}`, null);
      } else {
        tasksData.forEach((task) => {
          ids.push(task.dataValues.id);
        });
        cb(null, tasksData, ids);
      }
    })
    .catch(err => {
      console.log('Caught err', err);
      // cb(err, null);
    });
};

exports.getTasksByUserCrew = (userId, crewId, cb) => {
  let tasksInProgress = [];
  db.user.findOne({
    where: {id: userId},
    include: [{
      model: db.task,
      where: {crewId: crewId},
      through: {
        attributes: ['id', 'completed', 'verified']
      }
    }]
  })
    .then(user => {
      let excludeIds = [];
      if (user) {
        tasksInProgress = user.tasks;
        excludeIds = user.tasks.map(task => task.id);
      }
      return db.task.findAll({
        where: {
          id: {
            $notIn: excludeIds
          },
          crewId: crewId
        }
      });
    })
    .then(tasks => {
      return cb(null, {
        tasksInProgress: tasksInProgress,
        tasksAvailable: tasks
      });
    })
    .catch(err => {
      return cb(err, null);
    });
};

exports.postUserTask = (userId, taskId, cb) => {
  db.user_task.create({
    user_id: userId,
    task_id: taskId,
  })
    .then(userTask => {
      cb(null, userTask);
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.updateTask = (userTaskId, verified, cb) => {
  let points, newPoints, userId, crewId, taskId;
  db.user_task.findOne({ where: {id: userTaskId}})
    .then((userTask) => {
      userTask.completed = true;
      userTask.verified = verified;
      return userTask.save();
    })
    .then(userTask => {
      userId = userTask.user_id;
      taskId = userTask.task_id;
      return db.task.findOne({where: {id: taskId}});
    })
    .then(task => {
      points = task.points;
      crewId = task.crewId;
      return db.user_crew.findOne({where: {user_id: userId, crew_id: crewId}});
    })
    .then(userCrew => {
      newPoints = verified ? userCrew.points + points : userCrew.points; //will only add points when being verified
      return db.user_crew.update({points: newPoints}, {where: {user_id: userId, crew_id: crewId}});
    })
    .then(updated => {
      return db.user_crew.findOne({where: {user_id: userId, crew_id: crewId}});
    })
    .then(userCrew => {
      cb(null, userCrew);
    })
    .catch(err => {
      cb(err, null);
    });
};