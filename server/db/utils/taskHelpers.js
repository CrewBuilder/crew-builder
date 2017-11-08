const db = require('../index.js');

exports.getTasksByCrew = (crew_id, cb) => {
  return db.task
    .findAll({
      where: {crew_id: req.query.crew_id}
    })
    .then(tasks => res.status(200).send(tasks))
    .catch(err => res.status(500).send(err));
};

exports.getUnverifiedTasks = (req, res) => {
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
};

exports.postTask = (taskData, cb) => {
  db.task.create(taskData)
    .then(task => {
      return cb(null, task);
    })
    .catch(err => {
      return cb(err, null);
    });
};

exports.deleteTask = (taskId) => {
  return db.task.destroy({
    where: {
      id: taskId
    }
  });
};


