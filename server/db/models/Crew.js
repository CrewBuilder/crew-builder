const db = require('../index.js');
const Sequelize = require('sequelize');

// console.log('db-------->', db)
const Crew = db.define('crew', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image: Sequelize.STRING
});

// force: true will drop the table if it already exists
Crew.sync({
  force: true
});

module.exports = Crew;