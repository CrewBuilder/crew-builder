let express = require('express');
let router = express.Router();

// at some point we may want to refactor this to just import certain files and call methods from those helpers
let getCrewsByUser = require('./../utils/user_crewHelpers.js').getCrewsByUser;
let getTasksByUser = require('./../utils/user_taskHelpers.js').getTasksByUser;
let getTasksByUserCrew = require('./../utils/user_taskHelpers.js').getTasksByUserCrew;
let getTasksByCrew = require('./../utils/taskHelpers.js').getTasksByCrew;
let findAllTasksByIds = require('./../utils/taskHelpers.js').findAllTasksByIds;
let findAllCrewsByIds = require('./../utils/crewHelpers.js').findAllCrewsByIds;
let getAllCrews = require('./../utils/crewHelpers.js').findAllCrews;
let findAllTasksByNotIds = require('./../utils/taskHelpers.js').findAllTasksByNotIds;

// '/user/crews' endpoint returns user's crew(s) data
router.get('/user/crews', (req, res) => { // tested with postman, returns array of user_crew data for user
  // Expects req.user.id
  let id = req.query.id;
  getCrewsByUser(id, (err, crews) => {
    if (err) {
      res.status(401).send('User has not signed up for any crews');
    } else {
      res.status(200).send(crews);
    }
  });
});

// '/user/tasks' endpoint returns ALL user's tasks in progress
router.get('/user/tasks', (req, res) => { // test with postman, returns object with three different arrays: userTasks, tasksInProgress (for the crew in question), and tasksAvailable (for the crew in question)
  // Expects req.user.id
  let id = req.query.id;
  let crewId = req.query.crewId;

  getTasksByUserCrew(id, crewId, (err, user) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(user);
    }
  });
});

// '/crew/tasks' endpoint returns ALL crew's tasks
router.get('/crew/tasks', (req, res) => {
  // Expects req.body.crewId
  let id = req.query.crewId;
  getTasksByCrew(id, (err, tasks) => {
    if (err) {
      res.status(401).send('No tasks available. Tell your Crew Leader to add some!');
    } else {
      res.status(200).send(tasks);
    }
  });
});

// '/crews' endpoint returns all crews in current db
router.get('/crews', (req, res) => {
  getAllCrews((err, crews) => {
    if (err) {
      res.status(401).send('No crews yet exist.');
    } else {
      res.status(200).send(crews);
    }
  });
});

// tested with postman
let postTask = require('./../utils/taskHelpers.js').postTask;
// '/task' endpoint POSTs a task to the task table.
router.post('/task', (req, res) => {
  let task = {
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
    limit: req.body.limit,
    expiry: req.body.expiry,
    crewId: req.body.crewId
  };
  postTask(task, (err, task) => {
    if (err) {
      res.status(401).send('Could not post task');
    } else {
      res.status(200).send(task);
    }
  });
});

let postCrew = require('./../utils/crewHelpers.js').postCrew;
// '/crew' endpoint POSTs a new crew.
router.post('/crew', (req, res) => {
  let crew = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  };
  let userId = req.body.userId;
  postCrew(crew, userId, (err, crew) => {
    if (err) {
      res.status(401).send('Could not post crew');
    } else {
      res.status(200).send(crew);
    }
  });
});

let postUserCrew = require('./../utils/user_crewHelpers.js').postUserCrew;
// User joins a crew! POSTs to User_Crew table
router.post('/user/crews', (req, res) => {
  let userId = req.body.userId;
  let crewId = req.body.crewId;
  postUserCrew(userId, crewId, (err, userCrew) => {
    if (err) {
      res.status(401).send('Could not join crew');
    } else {
      res.status(200).send(userCrew);
    }
  });
});

let postUserTask = require('./../utils/user_taskHelpers.js').postUserTask;
// User claims a task! POSTs to User_Task table
router.post('/user/tasks', (req, res) => {
  let userId = req.body.userId;
  let taskId = req.body.taskId;
  postUserTask(userId, taskId, (err, userTask) => {
    if (err) {
      res.status(401).send('Could not claim task');
    } else {
      res.status(200).send(userTask);
    }
  });
});

let getCrewMembers = require('./../utils/user_crewHelpers.js').getCrewMembers;
router.get('/leader/members', (req, res) => {
  let crewId = req.query.crewId;
  getCrewMembers(crewId, (err, members) => {
    if (err) {
      res.status(401).send('Could not claim task');
    } else {
      res.status(200).send(members);
    }
  });
});



module.exports = router;