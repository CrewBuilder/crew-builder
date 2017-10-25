require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('crewbuilder', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  port: process.env.DB_PORT,
  logging: false,

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

var db = {};

fs
  .readdirSync(path.join(__dirname, '/models'))
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, '/models/', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;