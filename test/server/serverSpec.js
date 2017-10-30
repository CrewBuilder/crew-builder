const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const path = require('path');
const server = require('../../index.js');

// ##################################
// Test Server and Client Are Active
// ##################################

xdescribe('Server and Client Are Active', function() {

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
});