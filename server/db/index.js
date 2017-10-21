const sequelize = require('sequelize');

const db = new sequelize('crewbuilder', 'meghanasarikonda', '', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

exports = db;