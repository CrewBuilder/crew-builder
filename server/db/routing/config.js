const express = require('express');
const router = express.Router();

const getCrewsByUser = require('./../utils/user_crewHelpers.js').getCrewsByUser;
const getTasksByUserCrew = require('./../utils/user_taskHelpers.js').getTasksByUserCrew;
const getTasksByCrew = require('./../utils/taskHelpers.js').getTasksByCrew;
const searchCrews = require('./../utils/crewHelpers.js').searchCrews;
const getCrewMembers = require('./../utils/user_crewHelpers.js').getCrewMembers;
const getUnverifiedTasks = require('./../utils/taskHelpers.js').getUnverifiedTasks;
const getRewardsByCrew = require('./../utils/rewardHelpers.js').getRewardsByCrew;

const postTask = require('./../utils/taskHelpers.js').postTask;
const postCrew = require('./../utils/crewHelpers.js').postCrew;
const postUserCrew = require('./../utils/user_crewHelpers.js').postUserCrew;
const postUserTask = require('./../utils/user_taskHelpers.js').postUserTask;
const postReward = require('./../utils/rewardHelpers.js').createReward;

const updateTask = require('./../utils/user_taskHelpers.js').updateTask;
const editCrew = require('./../utils/crewHelpers.js').editCrew;
const claimReward = require('./../utils/user_crewHelpers.js').claimReward;
const sendReward = require('../utils/nodemailerHelpers.js').sendReward;

const leaveCrew = require('./../utils/user_crewHelpers').leaveCrew;
const deleteTask = require('./../utils/taskHelpers').deleteTask;
const deleteReward = require('./../utils/rewardHelpers.js').destroyReward;
const deleteCrew = require('./../utils/crewHelpers.js').deleteCrew;

// router.use(require('../utils/authHelpers').verifyToken);

/**************************************************************/
/************************ GET REQUESTS ************************/
/**************************************************************/

router.get('/user/crews', (req, res) => { // tested with postman, returns array of user_crew data for user
  let id = req.query.id;
  getCrewsByUser(id).
    then(crews => {
      res.status(200).send(parseData(crews));
    })
    .catch(err => {
      res.status(401).send(err);
    });
});

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

router.get('/crews', (req, res) => {
  qs = req.query.qs || null;
  searchCrews(qs)
    .then(crews => {
      res.status(200).send(crews);
    })
    .catch(err => {
      res.status(401).send(err);
    });
});

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

router.post('/task', (req, res) => {
  let task = {
    name: req.body.name,
    description: req.body.description,
    points: req.body.points,
    limit: req.body.limit,
    expiry: req.body.expiry,
    crew_id: req.body.crew_id
  };
  postTask(task, (err, task) => {
    if (err) {
      res.status(401).send('Could not post task');
    } else {
      res.status(200).send(task);
    }
  });
});

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

router.put('/user/tasks', (req, res) => {

  let userTaskId = req.body.userTaskId;
  let verified = req.body.verified || false;
  updateTask(userTaskId, verified, (err, userCrew) => {
    if (err) {
      res.status(401).send(err);
    } else {
      res.status(200).send(userCrew);
    }
  });
});

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

router.delete('/tasks', (req, res) => {
  deleteTask(req.query.taskId)
    .then(deleted => {
      if (deleted) {
        res.sendStatus(202);
      } else {
        res.status(404).send('Nothing was deleted');
      }
    })
    .catch(err => {
      res.status(404).send(err);
    });
});

router.delete('/crew/rewards', deleteReward);
router.delete('/crew', deleteCrew);

module.exports = router;

// Database response parsing functions
const parseData = (user) => {
  let crews = user.crews;
  let response = {
    leader: [],
    member: []
  };
  crews.forEach(crew => {

    if (crew.user_crew.role === 'leader') {
      response.leader.push({
        points: crew.user_crew.points,
        achievement: crew.user_crew.achievement,
        role: crew.user_crew.role,
        crew: {
          id: crew.id,
          name: crew.name,
          description: crew.description,
          image: crew.image
        }
      });

    } else {
      response.member.push({
        points: crew.user_crew.points,
        achievement: crew.user_crew.achievement,
        role: crew.user_crew.role,
        crew: {
          id: crew.id,
          name: crew.name,
          description: crew.description,
          image: crew.image
        }
      });
    }
  });

  return response;
};

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