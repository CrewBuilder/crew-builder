const db = require('../index.js');
const Sequelize = require('sequelize');

const Task = db.db.define('task', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  points: Sequelize.Integer,
  limit: Sequelize.,
  expiry: Sequelize.DATE
});

// force: true will drop the table if it already exists
Task.sync({
  force: true
});

exports.Task = Task;