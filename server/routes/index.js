const models = require('../models');
const controllers = require('../controllers');
const passport = require('passport');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({ message: 'Hello' });
  });

  //app.get('/api/auth/me', controllers.auth.lookup);
  app.get('/api/user/crews', controllers.crews.getCrewsByUser);
  app.get('/api/user/tasks', controllers.tasks.getTasksByUserCrew);
  app.get('/api/crew/tasks', controllers.tasks.getTasksByCrew);
  app.get('/api/crews', controllers.crews.searchCrews);
  app.get('/api/leader/members', controllers.users.getCrewMembers);
  app.get('/api/leader/tasks', controllers.tasks.getUnverifiedTasks);

  // app.post('/api/auth/facebook',
  //   passport.authenticate('facebook-token', { session: false }),
  //   controllers.auth.facebook);
  app.post('/api/task', controllers.tasks.newTask);
  app.post('/api/crew', controllers.crews.newCrew);
  app.post('/api/user/crews', controllers.user_crews.joinCrew);
  app.post('/api/user/tasks', controllers.user_tasks.claimTask);

  app.put('/api/user/tasks', controllers.user_tasks.updateTask);

  app.delete('/api/user/crews', controllers.user_crews.leaveCrew);
  app.delete('/api/tasks', controllers.tasks.deleteTask);

};