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

  it('Connects to the database', function() {
    return db.sequelize.authenticate();
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
      .expect(204)
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

  it('Responds to DELETE: /tasks with a 204', function(done) {
    request(server)
      .delete('/tasks?taskId=4')
      .expect(204)
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
      .expect(204)
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

  it('Deletes a crew', function(done) {
    request(server)
      .delete('/crew?crew_id=4')
      .expect(204)
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
    this.timeout(3000);
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
            crew_id: 2,
            crew_name: 'Iona\'s Crew'
          });
      })
      .then(res => {
        expect(res.status).to.equal(200);
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

  it('Posts a new crew', function(done) {
    let body = {
      name: 'New Crew',
      description: 'New description',
      image: 'new image',
      user_id: 1
    };
    request(server)
      .post('/crew')
      .send(body)
      .expect(200)
      .then(res => {
        expect(res.body.name).to.equal(body.name);
        expect(res.body.description).to.equal(body.description);
        expect(res.body.image).to.equal('new image');
        return db.user_crew
          .findOne({
            where: {
              user_id: body.user_id,
              crew_id: res.body.id
            }
          });
      })
      .then(found => {
        expect(found.role).to.equal('leader');
        done();
      })
      .catch(err => done(err));
  });

  it('Updates a task as completed without adding any points', function(done) {
    request(server)
      .put('/user/tasks')
      .send({
        user_id: 5,
        task_id: 28,
        points: 250,
        crew_id: 13
      })
      .expect(200)
      .then(res => {
        expect(res.body.user_id).to.equal(5);
        expect(res.body.crew_id).to.equal(13);
        expect(res.body.points).to.equal(0);
        return db.user_task
          .findOne({
            where: {
              user_id: 5,
              task_id: 28
            }
          });
      })
      .then(found => {
        expect(found.completed).to.be.true;
        expect(found.verified).to.be.false;
        done();
      })
      .catch(err => done(err));
  });

  it('Updates a task and adds point when verifying a task', function(done) {
    request(server)
      .put('/user/tasks')
      .send({
        user_id: 2,
        task_id: 13, // 150 points, crew 3
        points: 150,
        crew_id: 3,
        verified: true
      })
      .expect(200)
      .then(res => {
        expect(res.body.user_id).to.equal(2);
        expect(res.body.crew_id).to.equal(3);
        expect(res.body.points).to.equal(150);
        return db.user_task
          .findOne({
            where: {
              user_id: 2,
              task_id: 13
            }
          });
      })
      .then(found => {
        expect(found.completed).to.be.true;
        expect(found.verified).to.be.true;
        done();
      })
      .catch(err => done(err));
  });

  it('Edits crew information', function(done) {
    let body = {
      name: 'New Crew 1 name',
      description: 'New crew 1 description',
      image: 'new crew 1 image',
    };
    request(server)
      .put('/crew?crew_id=1')
      .send(body)
      .expect(200)
      .then(res => {
        return db.crew
          .findOne({
            where: {
              id: 1
            }
          });
      })
      .then(found => {
        expect(found.name).to.equal(body.name);
        expect(found.description).to.equal(body.description);
        expect(found.image).to.equal(body.image);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with a list of all crews to which a user belongs', function(done) {
    request(server)
      .get('/user/crews?id=1')
      .expect(200)
      .then(res => {
        expect(res.body.leader.length).to.equal(1);
        expect(res.body.member.length).to.equal(14);
        expect(res.body.leader[0].crew.id).to.equal(1);
        expect(res.body.leader[0].role).to.equal('leader');
        expect(res.body.member[0].role).to.equal('member');
        done();
      })
      .catch(err => done(err));
  });
});