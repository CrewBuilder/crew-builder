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
        attributes: ['id', 'name', 'description', 'points', 'expiry'],
        where: {crew_id: req.query.crew_id},
        include: [{
          model: db.user_task,
          where: { completed: true, verified: false },
          include: {
            model: db.user
          }
        }]
      })
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


