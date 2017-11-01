const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const path = require('path');
const server = require('../../index.js');

// ##################################
// Test Server and Client Are Active
// ##################################

describe('Server and Client Are Active', function() {

  it('Respond with 200 at localhost', function(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });

  it('Responds with index.html at root path', function(done) {
    request(server)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
      .then(res => expect(res.text).to.contain('<div id="app"></div>'));
    done();
  });

  it('Responds with a list of all crews', function(done) {
    request(server)
      .get('/crews')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(15);
        done();
      })
      .catch(err =>{
        done(err);
      });
  });

  it('Responds with a list of all crews that match a search string', function(done) {
    request(server)
      .get('/crews?qs=\'Integer\'')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(3);
        done();
      })
      .catch(err =>{
        done(err);
      });
  });

  it('Removes the association between a user and a crew upon user request to delete', function(done) {
    request(server)
      .delete('/user/crews?id=1crewId=4')
      .expect(202)
      .then(res => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });
});