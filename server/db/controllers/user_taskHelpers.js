const db = require('../index.js');

module.exports = {
  getTasksByUserCrew(req, res) {
    let id = req.query.id;
    let crew_id = req.query.crew_id;
    let tasksInProgress = [];
    db.user.findOne({
      where: {
        id: id
      },
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
        res.status(200).send({
          tasksInProgress: tasksInProgress,
          tasksAvailable: tasks
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  postUserTask(req, res) {
    let user_id = req.body.user_id;
    let task_id = req.body.task_id;
    db.user_task.create({
      user_id: user_id,
      task_id: task_id,
    })
      .then(userTask => res.status(201).send(userTask))
      .catch(err => res.status(500).send(err));
  },

  updateTask(req, res) {
    let newPoints, updatedUserCrew;
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
        newPoints = req.body.verified ? userCrew.points + req.body.points * 1 : userCrew.points; // will only add points when being verified
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
  }
};