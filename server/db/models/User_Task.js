const db = require('../index.js');
const sequelize = require('sequelize');
const Users = require('./User');
const Tasks = require('./Task');

const Users_Tasks = db.define('users_tasks', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

// create a junction table when both Users and Tasks are resolved
Promise.all([Users, Tasks])
  .then(values => {
    Users.belongsToMany(Tasks, {through: Users_Tasks, foreignKey: 'userId'});
    Tasks.belongsToMany(Users, {through: Users_Tasks, foreignKey: 'taskId'});
  })
  .catch(error => {
    console.log('error!')
  })

db.sync({
  force: true
});

module.exports = Users_Tasks;