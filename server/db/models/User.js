const db = require('../index.js');
const Sequelize = require('sequelize');
// const Crew = require('./Crew');

const User = db.define('user', {
  facebook: Sequelize.JSON
});

// force: true will drop the table if it already exists
User.sync({
  force: true
});

module.exports = User;