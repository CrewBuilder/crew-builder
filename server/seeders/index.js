const UserSeed = require('./user.js');
const CrewSeed = require('./crew.js');
const TaskSeed = require('./task.js');
const UserCrewSeed = require('./user_crew.js');
const UserTaskSeed = require('./user_task.js');

module.exports = function(db) {
  return db.sequelize.drop()
    .then(() => { return db.sequelize.sync(); })
    .then(() => { return db.User.bulkCreate(UserSeed); })
    .then(() => { return db.Crew.bulkCreate(CrewSeed); })
    .then(() => { return db.Task.bulkCreate(TaskSeed); })
    .then(() => { return db.User_Crew.bulkCreate(UserCrewSeed); })
    .then(() => { return db.User_Task.bulkCreate(UserTaskSeed); })
    .catch(err => { console.log('Database did not sync: ', err); });
};