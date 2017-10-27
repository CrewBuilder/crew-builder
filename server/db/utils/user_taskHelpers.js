const db = require('../index.js');

// Returns all of a user's tasks. Used in config.js.
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
        })
        cb(null, tasksData, ids);
      }
    })
    .catch(err => {
      console.log('Caught err', err)
      // cb(err, null);
    });
};

// // Find all projects with a least one task where task.state === project.state
// Project.findAll({
//     include: [{
//         model: Task,
//         where: { state: Sequelize.col('project.state') }
//     }]
// })