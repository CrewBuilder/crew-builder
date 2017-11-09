const express = require('express');
const router = express.Router();

const getCrewsByUser = require('./../controllers/user_crewHelpers.js').getCrewsByUser;
const getTasksByUserCrew = require('./../controllers/user_taskHelpers.js').getTasksByUserCrew;
const getTasksByCrew = require('./../controllers/taskHelpers.js').getTasksByCrew;
const searchCrews = require('./../controllers/crewHelpers.js').searchCrews;
const getCrewMembers = require('./../controllers/user_crewHelpers.js').getCrewMembers;
const getUnverifiedTasks = require('./../controllers/taskHelpers.js').getUnverifiedTasks;
const getRewardsByCrew = require('./../controllers/rewardHelpers.js').getRewardsByCrew;

const postTask = require('./../controllers/taskHelpers.js').postTask;
const postCrew = require('./../controllers/crewHelpers.js').postCrew;
const postUserCrew = require('./../controllers/user_crewHelpers.js').postUserCrew;
const postUserTask = require('./../controllers/user_taskHelpers.js').postUserTask;
const postReward = require('./../controllers/rewardHelpers.js').createReward;

const updateTask = require('./../controllers/user_taskHelpers.js').updateTask;
const editCrew = require('./../controllers/crewHelpers.js').editCrew;
const claimReward = require('./../controllers/user_crewHelpers.js').claimReward;
const sendReward = require('../controllers/nodemailerHelpers.js').sendReward;

const leaveCrew = require('./../controllers/user_crewHelpers').leaveCrew;
const deleteTask = require('./../controllers/taskHelpers').deleteTask;
const deleteReward = require('./../controllers/rewardHelpers.js').destroyReward;
const deleteCrew = require('./../controllers/crewHelpers.js').deleteCrew;

// router.use(require('../controllers/authHelpers').verifyToken);

/**************************************************************/
/************************ GET REQUESTS ************************/
/**************************************************************/

router.get('/user/crews', getCrewsByUser);

router.get('/user/tasks', (req, res) => {
  let id = req.query.id;
  let crew_id = req.query.crew_id;
  getTasksByUserCrew(id, crew_id, (err, user) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(user);
    }
  });
});

router.get('/crew/tasks', getTasksByCrew);

router.get('/crews', searchCrews);

router.get('/leader/members', (req, res) => {
  let crew_id = req.query.crew_id;
  getCrewMembers(crew_id, (err, members) => {
    if (err) {
      res.status(401).send('Could not claim task');
    } else {
      res.status(200).send(members);
    }
  });
});

router.get('/leader/tasks', getUnverifiedTasks);

router.get('/crew/rewards', getRewardsByCrew);
/***************************************************************/
/************************ POST REQUESTS ************************/
/***************************************************************/

router.post('/task', postTask);

router.post('/crew', postCrew);

router.post('/user/crews', (req, res) => {
  let userId = req.body.userId;
  let crew_id = req.body.crew_id;
  postUserCrew(userId, crew_id, (err, userCrew) => {
    if (err) {
      res.status(401).send('Could not join crew');
    } else {
      res.status(200).send(userCrew);
    }
  });
});

router.post('/user/tasks', (req, res) => {
  let userId = req.body.userId;
  let taskId = req.body.taskId;
  postUserTask(userId, taskId, (err, userTask) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(userTask);
    }
  });
});

router.post('/crew/rewards', postReward, sendReward);

/**************************************************************/
/************************ PUT REQUESTS ************************/
/**************************************************************/

router.put('/user/tasks', updateTask);

router.put('/crew', editCrew);

router.put('/reward/claim', claimReward, sendReward);

/*****************************************************************/
/************************ DELETE REQUESTS ************************/
/*****************************************************************/

router.delete('/user/crews', (req, res) => {
  let userId = req.body.id;
  let crew_id = req.body.crew_id;
  leaveCrew(userId, crew_id)
    .then(deleted => {
      res.sendStatus(202);
    })
    .catch(err => {
      console.log(err);
      res.status(401).send(err);
    });
});

router.delete('/tasks', deleteTask);

router.delete('/crew/rewards', deleteReward);
router.delete('/crew', deleteCrew);

module.exports = router;


const parseUnverifiedTasks = (tasks) =>{
  return new Promise((resolve, reject) => {
    let parsedTasks = [ ];
    for (let i = 0; i < tasks.length; i++) {
      let task = tasks[i];
      for (let j = 0; j < task.user_tasks.length; j++) {
        let user = task.user_tasks[j].user;
        let profile = JSON.parse(user.facebook);
        parsedTasks.push({
          taskId: task.id,
          taskName: task.name,
          taskDescription: task.description,
          points: task.points,
          expiry: task.expiry,
          userId: user.id,
          userName: profile.DISPLAY_NAME,
          userEmail: profile.EMAIL,
          userImg: profile.IMAGE_URL,
          userTaskId: task.user_tasks[j].id
        });
      }
      if (i === tasks.length - 1) {
        resolve(parsedTasks);
      }
    }
  });
};