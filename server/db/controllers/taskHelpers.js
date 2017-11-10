const db = require('../index.js');

module.exports = {
  getTasksByCrew(req, res) {
    return db.task
      .findAll({
        where: {
          crew_id: req.query.crew_id
        }
      })
      .then(tasks => res.status(200).send(tasks))
      .catch(err => res.status(500).send(err));
  },

  getUnverifiedTasks(req, res) {
    return db.task
      .findAll({
        where: {
          crew_id: req.query.crew_id
        },
        include: [{
          model: db.user_task,
          where: {
            completed: true,
            verified: false
          },
          include: {
            model: db.user
          }
        }]
      })
      .then(tasks => parseUnverifiedTasks(tasks))
      .then(tasks => res.status(200).send(tasks))
      .catch(err => res.status(500).send(err));
  },

  postTask(req, res) {
    let task = {
      name: req.body.name,
      description: req.body.description,
      points: req.body.points,
      limit: req.body.limit,
      expiry: req.body.expiry,
      crew_id: req.body.crew_id
    };
    db.task
      .create(task)
      .then(task => res.status(201).send(task))
      .catch(err => res.status(500).send(err));
  },

  deleteTask(req, res) {
    let task_id = req.query.taskId;
    return db.task
      .destroy({
        where: {
          id: task_id
        }
      })
      .then(destroyed => res.sendStatus(204))
      .catch(err => res.status(500).send(err));
  }
};

const parseUnverifiedTasks = (tasks) =>{
  if (tasks.length === 0) {
    return [ ];
  }
  return new Promise((resolve, reject) => {
    let parsedTasks = [ ];
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      for (let j = 0; j < task.user_tasks.length; j++) {
        let user = task.user_tasks[j].user;
        let profile = JSON.parse(user.facebook);
        parsedTasks.push({
          task_id: task.id,
          task_name: task.name,
          task_description: task.description,
          points: task.points,
          expiry: task.expiry,
          user_id: user.id,
          user_name: profile.DISPLAY_NAME,
          user_email: profile.EMAIL,
          user_image: profile.IMAGE_URL,
          user_task_id: task.user_tasks[j].id
        });
      }
      if (i === tasks.length - 1) {
        resolve(parsedTasks);
      }
    }
  });
};