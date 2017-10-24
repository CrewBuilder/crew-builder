const db = require('../index.js');
const Sequelize = require('sequelize');
const Crew = require('./Crew.js');

const Task = db.define('task', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  points: Sequelize.INTEGER,
  limit: Sequelize.INTEGER,
  expiry: Sequelize.DATE
});

// create an association when both Crew and Task are resolved
Promise.all([Crew, Task])
  .then(values => {
    Crew.hasMany(Task);
    Task.belongsTo(Crew);
  })
  .catch(err => console.log('Error in crew-task association'));

module.exports = Task;