const db = require('../index.js');

exports.getTasksByUserCrew = (userId, crew_id, cb) => {
  let tasksInProgress = [];
  db.user.findOne({
    where: {id: userId},
    include: [{
      model: db.task,
      where: {crew_id: crew_id},
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
          crew_id: crew_id
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
  let points, newPoints, userId, crew_id, taskId;
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
      crew_id = task.crew_id;
      return db.user_crew.findOne({where: {user_id: userId, crew_id: crew_id}});
    })
    .then(userCrew => {

      newPoints = verified ? userCrew.points + points : userCrew.points; //will only add points when being verified
      return db.user_crew.update({points: newPoints}, {where: {user_id: userId, crew_id: crew_id}});
    })
    .then(updated => {
      return db.user_crew.findOne({where: {user_id: userId, crew_id: crew_id}});
    })
    .then(userCrew => {
      cb(null, userCrew);
    })
    .catch(err => {
      cb(err, null);
    });
};