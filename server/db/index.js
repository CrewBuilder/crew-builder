const sequelize = require('sequelize');
require('dotenv').config();
const Crew = require('./models/Crew');
const User = require('./models/User');


const db = new sequelize('crewbuilder', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

User.User.belongsToMany(Crew.Crew, {through: 'UserCrew'})
Crew.Crew.belongsToMany(User.User, {through: 'UserCrew'})

exports.db = db;