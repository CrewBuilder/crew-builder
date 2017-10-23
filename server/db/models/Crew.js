const db = require('../index.js');
const Sequelize = require('sequelize');
const Task = require('./Task');


const Crew = db.define('crew', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
  image: Sequelize.STRING
});

// create an association when both Crew and Task are resolved
Promise.all([Crew, Task])
  .then(values => {
    Crew.hasMany(Task);
    Task.belongsTo(Crew);
  })
  .catch(err => console.log('Error in crew-task association'));

// force: true will drop the table if it already exists
db.sync({
  force: true
});

module.exports = Crew;