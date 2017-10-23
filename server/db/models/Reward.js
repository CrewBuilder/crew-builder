const db = require('../index.js');
const Sequelize = require('sequelize');

const Reward = db.define('task', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  points: Sequelize.INTEGER,
  limit: Sequelize.INTEGER,
  expiry: Sequelize.DATE
});

// force: true will drop the table if it already exists
Reward.sync({
  force: true
});

module.exports = Reward;