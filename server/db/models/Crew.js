const db = require('../index.js');
const Sequelize = require('sequelize');


const Crew = db.define('crew', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  image: Sequelize.STRING
});


module.exports = Crew;