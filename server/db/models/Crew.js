const db = require('../index.js');
const Sequelize = require('sequelize');


const Crew = db.define('crew', {
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  image: Sequelize.STRING
});


// force: true will drop the table if it already exists
// Crew.sync({
//   force: true
// });

module.exports = Crew;