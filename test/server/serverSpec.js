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
      .get('/crews?qs=community')
      .expect(200)
      .then(res => {
        console.log(res.body);
        expect(res.body.length).to.equal(7);
        done();
      })
      .catch(err => done(err));
  });

  it('Removes the association between a user and a crew upon user request to delete', function(done) {
    request(server)
      .delete('/user/crews?id=1crewId=4')
      .expect(202)
      .then(res => {
        expect(!res.body.length).to.be.true;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Responds to GET: \'leader/tasks\' with a list of tasks in progress', function(done) {
    request(server)
      .get('/leader/tasks?crewId=4')
      .expect(200)
      .then(res => {
        expect(res.body[0].taskName).to.equal('Kshlerin-Herman');
        expect(res.body[1].taskName).to.equal('Jerde, Bauch and Barrows');
        expect(!res.body[2]).to.be.true;
        done();
      })
      .catch(err =>{
        done(err);
      });
  });
});