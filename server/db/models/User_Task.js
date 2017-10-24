const db = require('../index.js');
const Sequelize = require('sequelize');
const User = require('./User');
const Task = require('./Task');

const UsersTasks = db.define('users_tasks', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  verified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

// create a junction table when both Users and Tasks are resolved
Promise.all([User, Task])
  .then(values => {
    User.belongsToMany(Task, {through: UsersTasks, foreignKey: 'userId'});
    Task.belongsToMany(User, {through: UsersTasks, foreignKey: 'taskId'});
  })
  .catch(error => {
    console.log('error!');
  });

module.exports = UsersTasks;