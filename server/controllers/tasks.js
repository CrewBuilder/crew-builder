const db = require('../models');

module.exports = {
  getTasksByCrew(req, res) {
    let crew_id = req.query.crew_id;
    return db.Task
      .findAll({
        where: {
          crew_id: crew_id
        }
      })
      .then(crews => res.status(200).send(crews))
      .catch(err => res.status(401).send(err));
  },

  getUnverifiedTasks(req, res) {
    let crew_id = req.query.crew_id;
    return db.Task
      .findAll({
        where: {
          crew_id: crew_id
        },
        include: [{
          model: db.User_Task,
          where: {
            completed: true,
            verified: false
          },
          include: [{
            model: db.User
          }]
        }]
      })
      .then(tasks => parseTasks(tasks))
      .then(tasks => res.status(200).send(tasks))
      .catch(err => res.status(400).send(err));
  },

  newTask(req, res) {
    return db.Task
      .create(req.body)
      .then(task => res.status(201).send(task))
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  deleteTask(req, res) {
    let task_id = req.query.task_id;
    return db.Task
      .destroy({
        where: {
          id: task_id
        }
      })
      .then(destroyed => res.sendStatus(202))
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
  },

  getTasksByUserCrew(req, res) {
    let user_id = req.query.user_id;
    let crew_id = req.query.crew_id;
    let tasksInProgress,
      tasksUnclaimed;
    return db.Task
      .findAll({
        where: {
          crew_id: crew_id
        },
        include: [{
          model: db.User_Task,
          where: {
            user_id: user_id,
            verified: false
          },
        }]
      })
      .then(tasks => {
        tasksInProgress = tasks;
        return db.User_Task.findAll({
          where: {
            user_id: user_id
          },
          attributes: ['task_id']
        });
      })
      .then(tasks => {
        tasks = tasks.map(task => task.task_id);
        return db.Task
          .findAll({
            where: {
              crew_id: crew_id,
              id: {
                $notIn: tasks
              }
            },

          });
      })
      .then(tasks => {
        tasksAvailable = tasks;
        res.status(200).send({
          tasksInProgress: tasksInProgress,
          tasksAvailable: tasksAvailable
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },
};

const parseTasks = (tasks) =>{
  return new Promise((resolve, reject) => {
    let parsedTasks = [ ];
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      for (let j = 0; j < task.User_Tasks.length; j++) {
        let user = task.User_Tasks[j].User;
        let profile = JSON.parse(user.facebook);
        parsedTasks.push({
          task_id: task.id,
          task_name: task.task_name,
          task_description: task.task_description,
          points: task.points,
          expiry: task.expiry,
          user_id: user.id,
          user_name: profile.DISPLAY_NAME,
          user_email: profile.EMAIL,
          user_image: profile.IMAGE_URL,
        });
      }
      if (i === tasks.length - 1) {
        resolve(parsedTasks);
      }
    }
  });
};