//load db and all tables
const db = require('./index.js');
const User = require('./models/User.js');
const Crew = require('./models/Crew.js');
const Task = require('./models/Task.js');
const UserCrew = require('./models/User_Crew.js');
const UserTask = require('./models/User_Task.js');

//load seed data
const UserSeed = require('../../test/server/db/seed/user.js');
const CrewSeed = require('../../test/server/db/seed/crew.js');
const TaskSeed = require('../../test/server/db/seed/task.js');
const UserCrewSeed = require('../../test/server/db/seed/user_crew.js');
const UserTaskSeed = require('../../test/server/db/seed/user_task.js');

module.exports = function() {
  return db.drop()
    .then(() => { return db.sync(); })
    .then(() => { return User.bulkCreate(UserSeed); })
    .then(() => { return Crew.bulkCreate(CrewSeed); })
    .then(() => { return Task.bulkCreate(TaskSeed); })
    .then(() => { return UserCrew.bulkCreate(UserCrewSeed); })
    .then(() => { return UserTask.bulkCreate(UserTaskSeed); })
    .catch(err => { console.log('Database did not sync: ', err); });
};