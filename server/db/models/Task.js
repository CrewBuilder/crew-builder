const db = require('../index.js');
const Sequelize = require('sequelize');

const Task = db.define('task', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  points: Sequelize.INTEGER,
  limit: Sequelize.INTEGER,
  expiry: Sequelize.DATE
});

// force: true will drop the table if it already exists
Task.sync({
  force: true
});

module.exports = Task;