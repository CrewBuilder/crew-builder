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
        cb(null, user.tasks);
      }
    })
    .catch(err => {
      cb(err, null);
    });
};