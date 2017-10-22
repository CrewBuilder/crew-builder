const sequelize = require('sequelize');
require('dotenv').config();
const expect = require('chai').expect;

describe('Postgres crewbuilder db', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = new sequelize('crewbuilder', process.env.DB_USER, process.env.DB_PASSWORD, {
      host: 'localhost',
      dialect: 'postgres',
    });
    done();
  });

  afterEach(function() {
    dbConnection.sync({force: true});
  });

  it('Should connect to the crewbuilder database', function() {
    return dbConnection.authenticate();
  });
});