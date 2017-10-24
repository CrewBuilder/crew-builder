const db = require('../index.js');
const Sequelize = require('sequelize');
// const Crew = require('./Crew');

const User = db.define('user', {
  facebookId: Sequelize.STRING,
  facebook: Sequelize.JSONB
});

module.exports = User;