const db = require('../index.js');
const sequelize = require('sequelize')
const Users = require('./User');
const Crews = require('./Crew');

const Users_Crews = db.define('users_crews', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

// create a junction table when both Users and Crews are resolved
Promise.all([Users, Crews])
  .then(values => {
    Users.belongsToMany(Crews, {through: Users_Crews, foreignKey: 'userId'});
    Crews.belongsToMany(Users, {through: Users_Crews, foreignKey: 'crewId'});
  })
  .catch(error => {
    console.log('error!')
  })

db.sync({
  force: true
});

module.exports = Users_Crews;