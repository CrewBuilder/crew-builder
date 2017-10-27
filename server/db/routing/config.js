let express = require('express');
let router = express.Router();

// Get id's for Join tables
let getCrewsByUser = require('./../utils/user_crewHelpers.js').getCrewsByUser;
let getTasksByUser = require('./../utils/user_taskHelpers.js').getTasksByUser;
// Get list of data rows from array of id's
let findAllTasksByIds = require('./../utils/taskHelpers.js').findAllTasksByIds;
let findAllCrewsByIds = require('./../utils/crewHelpers.js').findAllCrewsByIds;
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

// '/user/tasks' endpoint returns ALL user's tasks. Will have to filter tasks by crew on the front end.
router.get('/user/tasks', (req, res) => { // test with postman, returns object with three different arrays: userTasks, tasksInProgress (for the crew in question), and tasksAvailable (for the crew in question)
  // Expects req.user.id
  // | userId | taskId | crewId | task name (from tasks) | task description..... (from tasks) | isVerified (from user-task) | isComplete (From userTask)
  let id = req.query.id;
  let crewId = req.query.crewId;
  // {userTasks: [], crewTasks: []}
  getTasksByUser(id, (err, tasks, ids) => {
    if (err) {
      console.log('err35', err)
      res.status(401).send('No tasks available. Try signing up for a Crew!');
    } else {
      console.log('Tasks', tasks, 'Ids', ids)
      findAllTasksByIds(ids, crewId, (err, tasksInProgress) => {
        findAllTasksByNotIds(ids, crewId, (err, tasksAvailable) => {
          let response = {
            userTasks: tasks,
            tasksInProgress: tasksInProgress,
            tasksAvailable: tasksAvailable
          };
          res.status(200).send(response);
        });
      });
    }
  });
});

// '/crew/tasks' endpoint returns ALL crew's tasks. Will have to filter by completion using user data on the front end.
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

// TODO: Need to also postTask to Crew_Task join table
let postTask = require('./../utils/taskHelpers.js').postTask;
// '/task' endpoint POSTs a task to the task table.
router.post('/task', (req, res) => {
  let task = {
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
    limit: req.body.limit,
    expiry: req.body.expiry
  }
  postTask(task, (err, task) => {
    if (err) {
      res.status(401).send('Could not post task');
    } else {
      res.status(200).send(task);
    }
  });
});

let postCrew = require('./../utils/crewHelpers.js').postCrew;
// '/crew' endpoint POSTs a task to the crew table.
router.post('/crew', (req, res) => {
  let crew = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image
  }
  postTask(crew, (err, crew) => {
    if (err) {
      res.status(401).send('Could not post crew');
    } else {
      res.status(200).send(crew);
    }
  });
});



module.exports = router;