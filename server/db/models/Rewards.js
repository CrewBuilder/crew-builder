const db = require('../index.js');
const Sequelize = require('sequelize');

const Rewards = db.db.define('task', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  points: Sequelize.Integer,
  limit: Sequelize.Integer,
  expiry: Sequelize.DATE
});

// force: true will drop the table if it already exists
Rewards.sync({
  force: true
});

exports.Rewards = Rewards;