//load db and all tables
const db = require('./index.js');

//load seed data
const UserSeed = require('../../test/server/db/seed/user.js');
const CrewSeed = require('../../test/server/db/seed/crew.js');
const TaskSeed = require('../../test/server/db/seed/task.js');
const UserCrewSeed = require('../../test/server/db/seed/user_crew.js');
const UserTaskSeed = require('../../test/server/db/seed/user_task.js');

module.exports = function() {
  return db.sequelize.drop()
    .then(() => { return db.sequelize.sync(); })
    .then(() => { return db.User.bulkCreate(UserSeed); })
    .then(() => { return db.Crew.bulkCreate(CrewSeed); })
    .then(() => { return db.Task.bulkCreate(TaskSeed); })
    .then(() => { return db.User_Crew.bulkCreate(UserCrewSeed); })
    .then(() => { return db.User_Task.bulkCreate(UserTaskSeed); })
    .catch(err => { console.log('Database did not sync: ', err); });
};