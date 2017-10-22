const db = require('../index.js');
const sequelize = require('sequelize')
const Users = require('./Users');
const Crews = require('./Crew');

const Users_Crews = db.define('users_crews', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

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