const db = require('../index.js');
const sequelize = require('sequelize');
const Crews = require('./Crew');
const Tasks = require('./Task');

const Crews_Tasks = db.define('crews_tasks', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

// create a junction table when both Tasks and Crews are resolved
Promise.all([Crews, Tasks])
  .then(values => {
    Crews.belongsToMany(Tasks, {through: Crews_Tasks, foreignKey: 'crewId'});
    Crews.belongsToMany(Users, {through: Crews_Tasks, foreignKey: 'taskId'});
  })
  .catch(error => {
    console.log('error!')
  })

db.sync({
  force: true
});

module.exports = Crews_Tasks;