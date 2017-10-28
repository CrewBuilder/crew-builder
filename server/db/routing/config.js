const express = require('express');
const router = express.Router();

/**************************************************************/
/************************ GET REQUESTS ************************/
/**************************************************************/

// GET: /user/crews => returns user's crew(s) data
const getCrewsByUser = require('./../utils/user_crewHelpers.js').getCrewsByUser;
router.get('/user/crews', (req, res) => { // tested with postman, returns array of user_crew data for user
  let id = req.query.id;
  getCrewsByUser(id, (err, crews) => {
    if (err) {
      res.status(401).send('User has not signed up for any crews');
    } else {
      res.status(200).send(crews);
    }
  });
});

// GET: /user/tasks => retrieves a list of user's tasks in progress, and a list of all available tasks for the crew in view
const getTasksByUserCrew = require('./../utils/user_taskHelpers.js').getTasksByUserCrew;
router.get('/user/tasks', (req, res) => {
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

// GET: /crew/tasks => retrieves all tasks for a given crew
const getTasksByCrew = require('./../utils/taskHelpers.js').getTasksByCrew;
router.get('/crew/tasks', (req, res) => {
  let id = req.query.crewId;
  getTasksByCrew(id, (err, tasks) => {
    if (err) {
      res.status(401).send('No tasks available. Tell your Crew Leader to add some!');
    } else {
      res.status(200).send(tasks);
    }
  });
});

// GET: /crews => retrieves all crews in current db
const getAllCrews = require('./../utils/crewHelpers.js').findAllCrews;
router.get('/crews', (req, res) => {
  getAllCrews((err, crews) => {
    if (err) {
      res.status(401).send('No crews yet exist.');
    } else {
      res.status(200).send(crews);
    }
  });
});

// GET: leader/members => leader requests members, retrieves list of user data for the crew
const getCrewMembers = require('./../utils/user_crewHelpers.js').getCrewMembers;
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

// GET: /leader/tasks?crewId={CREW_ID} => retrieves unverified tasks for a crew
const getUnverifiedTasks = require('./../utils/taskHelpers.js').getUnverifiedTasks;
router.get('/leader/tasks', (req, res) => {
  let crewId = req.query.crewId;
  getUnverifiedTasks(crewId, (err, tasks) => {
    if (err) {
      res.status(401).send('Could not complete request for unverified tasks.');
    } else {
      res.status(200).send(tasks);
    }
  });
});
/***************************************************************/
/************************ POST REQUESTS ************************/
/***************************************************************/

// POST: /task => crew leader creates a task, creates a new row in task table.
let postTask = require('./../utils/taskHelpers.js').postTask;
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

// POST: /crew => user creates a new crew, creates a new row in crew table
const postCrew = require('./../utils/crewHelpers.js').postCrew;
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

// POST: user/crews => user joins a crew, creates a new row in user_crew table
const postUserCrew = require('./../utils/user_crewHelpers.js').postUserCrew;
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

// POST: user/tasks => user claims a task, creates a new row in user_task table
const postUserTask = require('./../utils/user_taskHelpers.js').postUserTask;
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

/**************************************************************/
/************************ PUT REQUESTS ************************/
/**************************************************************/



/*****************************************************************/
/************************ DELETE REQUESTS ************************/
/*****************************************************************/

module.exports = router;