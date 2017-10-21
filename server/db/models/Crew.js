// const db = require('../index.js');
const Sequelize = require('sequelize');

const Crew = db.db.define('crew', {
  name: Sequelize.STRING,
  description: Sequelize.STRING
});

// force: true will drop the table if it already exists
Crew.sync({
  force: true
});

exports.Crew = Crew;