const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../../index');
const db = require('../../server/models');
const seed = require('../../server/seeders');
chai.use(require('chai-moment'));

describe('API integration tests', function () {

  beforeEach(function (done) {
    seed(db).then(() => done());
  });

  it('connects to the test database', function() {
    return db.sequelize.authenticate();
  });

  it('Responds with 200 at localhost', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .then(() => done())
      .catch(err => done(err));
  });

  it('Responds with a user\'s crews as { leader: [ ], member: [ ]}', function(done) {
    request(app)
      .get('/api/user/crews?user_id=1')
      .expect(200)
      .then(res => {
        expect(res.body.leader.length).to.equal(1);
        expect(res.body.member.length).to.equal(14);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with an empty list if the user is not yet a member of any crews', function(done) {
    db.User
      .create()
      .then(user => {
        let id = user.id;
        return request(app)
          .get(`/api/user/crews?user_id=${id}`);
      })
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.member.length).to.equal(0);
        expect(res.body.leader.length).to.equal(0);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with lists of users tasks in progress and tasks not yet claimed', function(done) {
    request(app)
      .get('/api/user/tasks?user_id=1&crew_id=4')
      .expect(200)
      .then(res => {
        expect(res.body.tasksInProgress.length).to.equal(0);
        expect(res.body.tasksAvailable.length).to.equal(16);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with a list of tasks belonging to a crew', function(done) {
    request(app)
      .get('/api/crew/tasks?crew_id=4')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(17);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with a list of all crews when no search query is sent', function(done) {
    request(app)
      .get('/api/crews')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(15);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with a list of matching crews when a search query is sent', function(done) {
    request(app)
      .get('/api/crews?qs=community')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(7);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with all the members of a given crew', function(done) {
    request(app)
      .get('/api/leader/members?crew_id=4')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(14);
        done();
      })
      .catch(err => done(err));
  });

  it('Responds with a list of unverified tasks for a crew leader', function(done) {
    request(app)
      .get('/api/leader/tasks?crew_id=13')
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1);
        expect(res.body[0].task_name).to.equal('Tweet a link to our SoundCloud');
        done();
      })
      .catch(err => done(err));
  });

  it('Creates a new task', function(done) {
    let expiry = new Date();
    let task = {
      task_name: 'Task 1',
      task_description: 'Task 1 added',
      points: 55,
      limit: 3,
      expiry: expiry,
      task_url: 'task_url',
      crew_id: 4
    };

    request(app)
      .post('/api/task')
      .send(task)
      .expect(201)
      .then(res => {
        expect(res.body.id).to.equal(177);
        expect(res.body.task_name).to.equal('Task 1');
        expect(res.body.task_description).to.equal('Task 1 added');
        expect(res.body.points).to.equal(55);
        expect(res.body.limit).to.equal(3);
        expect(res.body.expiry).to.be.sameMoment(expiry);
        expect(res.body.task_url).to.equal('task_url');
        expect(res.body.crew_id).to.equal(4);
        done();
      })
      .catch(err => done(err));
  });

  it('Creates a new crew and associates with the leader', function(done) {
    let crew = {
      user_id: 4,
      crew_name: 'New crew',
      crew_description: 'New crew description',
      crew_url: 'sampleurl',
      crew_image: 'sampleimage'
    };

    request(app)
      .post('/api/crew')
      .send(crew)
      .expect(201)
      .then(res => {
        expect(res.body.crew_name).to.equal('New crew');
        done();
      })
      .catch(err => done(err));
  });

  it('Creates a new User_Crew entry when a user joins a crew', function(done) {
    db.User
      .create()
      .then(created => {
        return request(app)
          .post('/api/user/crews')
          .send({
            user_id: created.id,
            crew_id: 4,
          });
      })
      .then(res => {
        expect(res.body.user_id).to.equal(16);
        expect(res.body.crew_id).to.equal(4);
        expect(res.body.role).to.equal('member');
        expect(res.body.points).to.equal(0);
        expect(res.body.achievement).to.equal('Newbie');
        done();
      })
      .catch(err => done(err));
  });

  it('Creates a new User_Task entry when a user claims a task', function(done) {
    request(app)
      .post('/api/user/tasks')
      .send({
        user_id: 5,
        task_id: 35
      })
      .expect(201)
      .then(res => {
        expect(res.body.user_id).to.equal(5);
        expect(res.body.task_id).to.equal(35);
        expect(res.body.completed).to.be.false;
        expect(res.body.verified).to.be.false;
        expect(res.body.archived).to.be.false;
        done();
      })
      .catch(err => done(err));
  });

  it('Updates a task as completed', function(done) {
    db.User_Task
      .create({
        user_id: 5,
        task_id: 35
      })
      .then(created => {
        return request(app)
          .put('/api/user/tasks')
          .send({
            user_id: 5,
            task_id: 35
          });
      })
      .then(res => {
        return db.User_Task
          .findOne({
            where: {
              user_id: 5,
              task_id: 35
            }
          });
      })
      .then(found => {
        expect(found.completed).to.be.true;
        done();
      })
      .catch(err => done(err));
  });

  it('Updates a task and adds points when a task is verified', function(done) {
    request(app)
      .put('/api/user/tasks')
      .send({
        user_id: 3,
        task_id: 98,
        verified: true
      })
      .expect(200)
      .then(res => {
        return db.User_Task
          .findOne({
            where: {
              user_id: 3,
              task_id: 98
            }
          });
      })
      .then(found => {
        expect(found.verified).to.be.true;
        done();
      })
      .catch(err => done(err));
  });

  it('Deletes a row from User-Crew when a member leaves', function(done) {
    request(app)
      .delete('/api/user/crews?user_id=1&crew_id=3')
      .expect(202)
      .then(res => {
        return db.User_Crew
          .findOne({
            where: {
              user_id: 1,
              crew_id: 3
            }
          });
      })
      .then(found => {
        expect(!found).to.be.true;
        done();
      })
      .catch(err => done(err));
  });

  it('Deletes a task and all associations', function(done) {
    request(app)
      .delete('/api/tasks?task_id=1')
      .expect(202)
      .then(res => {
        db.Task
          .findOne({
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
});