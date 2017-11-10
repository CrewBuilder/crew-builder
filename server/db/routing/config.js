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
router.get('/user/tasks', getTasksByUserCrew);
router.get('/crew/tasks', getTasksByCrew);
router.get('/crews', searchCrews);
router.get('/leader/members', getCrewMembers);
router.get('/leader/tasks', getUnverifiedTasks);
router.get('/crew/rewards', getRewardsByCrew);
/***************************************************************/
/************************ POST REQUESTS ************************/
/***************************************************************/
router.post('/task', postTask);
router.post('/crew', postCrew);
router.post('/user/crews', postUserCrew);
router.post('/user/tasks', postUserTask);
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

router.delete('/user/crews', leaveCrew);
router.delete('/tasks', deleteTask);
router.delete('/crew/rewards', deleteReward);
router.delete('/crew', deleteCrew);

module.exports = router;