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

exports.updateTask = (req, res) => {
  let points, newPoints, updatedUserCrew;
  db.user_task
    .findOne({
      where: {
        user_id: req.body.user_id,
        task_id: req.body.task_id
      }
    })
    .then(found => {
      return found.update({
        completed: true,
        verified: req.body.verified || false
      });
    })
    .then(updated => {
      return db.user_crew
        .findOne({
          where: {
            user_id: req.body.user_id,
            crew_id: req.body.crew_id
          }
        });
    })
    .then(userCrew => {
      updatedUserCrew = userCrew;
      newPoints = req.body.verified ? userCrew.points + req.body.points : userCrew.points; // will only add points when being verified
      return userCrew.update({
        points: newPoints
      });
    })
    .then(updated => {
      res.status(200).send(updatedUserCrew);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
};