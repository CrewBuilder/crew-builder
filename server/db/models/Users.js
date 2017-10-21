const db = require('../index.js');
const Sequelize = require('sequelize');

const User = db.db.define('user', {
  name: Sequelize.STRING
});

// force: true will drop the table if it already exists
User.sync({
  force: true
});

exports.User = User;