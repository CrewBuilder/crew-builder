const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const path = require('path');
const server = require('../../index.js');
const db = require('../../server/db/index.js');
const seed = require('../../server/db/seed.js');

// ##################################
// Test Server and Client Are Active
// ##################################

describe('Server and Client Are Active', function() {
  beforeEach(function(done) {
    seed().then(function() { done(); });
  });

  after(function(done) {
    seed().then(function() { done(); });
  });

  it('Responds with 200 at localhost', function(done) {
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
        expect(res.body.length).to.equal(7);
        done();
      })
      .catch(err => done(err));
  });

  it('Removes the association between a user and a crew upon user request to delete', function(done) {
    request(server)
      .delete('/user/crews?id=1crew_id=4')
      .expect(202)
      .then(res => {
        expect(!res.body.length).to.be.true;
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Responds to GET: /leader/tasks with a list of tasks in progress', function(done) {
    request(server)
      .get('/leader/tasks?crew_id=13')
      .expect(200)
      .then(res => {
        expect(res.body[0].name).to.equal('Tweet a link to our SoundCloud');
        expect(!res.body[1]).to.be.true;
        done();
      })
      .catch(err =>{
        done(err);
      });
  });

  it('Responds to DELETE: /tasks with a 202', function(done) {
    request(server)
      .delete('/tasks?taskId=4')
      .expect(202)
      .then(res => {
        done();
      })
      .catch(err => {
        done(err);
      });
  });

  it('Responds with a new reward created', function(done) {
    let newReward = {
      name: 'T-shirt',
      description: 'get a crew T-shirt',
      points: 300,
      limit: 1,
      expiry: new Date() + 1000,
      crew_id: 4
    };
    request(server)
      .post('/crew/rewards')
      .send(newReward)
      .expect(201)
      .then(res => {
        expect(res.body.name).to.equal(newReward.name);
        done();
      })
      .catch(err => done(err));
  });

  it('Deletes a specified reward', function(done) {
    request(server)
      .delete('/crew/rewards?reward_id=1')
      .expect(202)
      .then(res => {
        return db.reward.findOne({
          where: {
            id: 1
          }
        });
      })
      .then(found => {
        expect(!found).to.be.true;
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with all of the rewards for a given crew', function(done) {
    request(server)
      .get('/crew/rewards?crew_id=3')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(3);
        done();
      })
      .catch(err => done(err));
  });

  it('Updates crew information', function(done) {
    request(server)
      .put('/crew?crew_id=4')
      .send({
        name: 'Changed name'
      })
      .expect(200)
      .then(res => {
        return db.crew
          .findOne({
            where: {
              id: 4
            }
          });
      })
      .then(found => {
        expect(found.name).to.equal('Changed name');
        done();
      })
      .catch(err => done(err));
  });

  it('Deletes a crew', function(done) {
    request(server)
      .delete('/crew?crew_id=4')
      .expect(202)
      .then(res => {
        return db.crew
          .findOne({
            where: {
              id: 4
            }
          });
      })
      .then((found) => {
        expect(!found).to.be.true;
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with an empty array for a crew that has no tasks', function(done) {
    db.crew
      .create()
      .then(created => {
        return request(server)
          .get(`/leader/tasks?crew_id=${created.id}`);
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.length).to.equal(0);
        done();
      })
      .catch(err => done(err));
  });

  it('Sends email and Deletes points for a claimed reward', function(done) {
    db.user_crew
      .update({
        points: 500
      }, {
        where: {
          user_id: 1,
          crew_id: 2
        }
      })
      .then(updated => {
        return request(server)
          .put('/reward/claim')
          .send({
            reward: {
              points: 100
            },
            email: 'ipjwilli@gmail.com',
            user_id: 1,
            crew_id: 2
          });
      })
      .then(res => {
        expect(res.status).to.equal(200);
      })
      .then(() => {
        return db.user_crew
          .findOne({
            where: {
              user_id: 1,
              crew_id: 2
            }
          });
      })
      .then(found => {
        expect(found.points).to.equal(400);
        done();
      })
      .catch(err => done(err));
  });
});