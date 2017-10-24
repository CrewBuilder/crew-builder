const db = require('../index.js');
const Sequelize = require('sequelize');
// const Crew = require('./Crew');

const User = db.define('user', {
  facebookId: Sequelize.STRING,
  facebook: Sequelize.JSONB
});

// force: true will drop the table if it already exists
// User.sync({
//   force: true
// });

module.exports = User;