//load db and all tables
const connection = require('./index.js');
const Crew = require('./models/Crew.js');
const Task = require('./models/Task.js');
const User = require('./models/User.js');
const UserCrew = require('./models/User_Crew.js');
const UserTask = require('./models/User_Task.js');

//load seed data
const CrewSeed = require('../../test/db/seed/crew.js');
const TaskSeed = require('../../test/db/seed/task.js');
const UserSeed = require('../../test/db/seed/user.js');
const UserCrewSeed = require('../../test/db/seed/user_crew.js');
const UserTaskSeed = require('../../test/db/seed/user_task.js');

connection.drop()
  .then(() => {
    console.log('Database dropped.');
    connection.sync();
  })
  .catch(err => {
    console.log('Databse did not sync: ', e);
  });