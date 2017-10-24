const db = require('../index.js');
const Sequelize = require('sequelize');
const User = require('./User');
const Crew = require('./Crew');

const UsersCrews = db.define('users_crews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  achievement: Sequelize.STRING,
  role: Sequelize.STRING
});

// create a junction table when both Users and Crews are resolved
Promise.all([User, Crew])
  .then(values => {
    User.belongsToMany(Crew, {through: UsersCrews, foreignKey: 'userId'});
    Crew.belongsToMany(User, {through: UsersCrews, foreignKey: 'crewId'});
  })
  .catch(error => {
    console.log('error!');
  });

// db.sync({
//   force: true
// });

module.exports = UsersCrews;