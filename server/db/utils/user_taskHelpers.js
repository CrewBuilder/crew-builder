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
        attributes: ['completed', 'verified']
      }
    }]
  })
    .then(user => {
      if (!user) {
        cb('no data found', null);
      } else {
        tasksInProgress = user.tasks;
        let excludeIds = user.tasks.map(task => task.id);
        return db.task.findAll({
          where: {
            id: {
              $notIn: excludeIds
            },
            crewId: crewId
          }
        });
      }
    })
    .then(tasks => {
      cb(null, {
        tasksInProgress: tasksInProgress,
        tasksAvailable: tasks
      });
    })
    .catch(err => {
      cb(err, null);
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
  db.user_task.update(
    {
      completed: true, // this may already be true, but doing this makes the request work for both verifiying and completing
      verified: verified
    },
    {
      where: {id: userTaskId}
    })
    .then((updated) => {
      return db.user_task.findOne({ where: {id: userTaskId}});
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
      newPoints = verified ? userCrew.points + points : points; //will only add points when being verified
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