const db = require('../index.js');
const Sequelize = require('sequelize');

const Reward = db.define('rewards', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  points: Sequelize.INTEGER,
  limit: Sequelize.INTEGER,
  expiry: Sequelize.DATE
});

module.exports = Reward;