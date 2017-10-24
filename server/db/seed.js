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

module.exports = (function() {
  db.drop()
    .then(() => {
      console.log('Database dropped.');
      db.sync()

        .then(() => { //seed users table
          UserSeed.forEach(user => {
            User.create({
              facebook: user.facebook
            }).then(() => console.log('Users created')).catch(err => console.log('error seeding Users', err));
          });
        })

        .then(() => { //seed crews table
          CrewSeed.forEach(crew => {
            Crew.create({
              name: crew.name,
              description: crew.description,
              image: crew.image
            }).then(() => console.log('Crews created')).catch(err => console.log('error seeding Crews', err));
          });
        })

        .then(() => { //seed tasks
          TaskSeed.forEach(task => {
            Task.create({
              name: task.name,
              description: task.description,
              points: task.points,
              limit: task.limit,
              expiry: task.expiry,
              crewId: task.crewId
            }).then(() => console.log('Task created')).catch(err => console.log('error seeding Tasks', err));
          });
        })

        .then(() => { //seed users_crews
          UserCrewSeed.forEach(userCrew => {
            UserCrew.create({
              userId: userCrew.userId,
              crewId: userCrew.crewId,
              points: userCrew.points,
              achievement: userCrew.achievement,
              role: userCrew.role
            }).then(() => console.log('UserCrew created')).catch(err => console.log('error seeding UserCrew', err));
          });
        })

        .then(() => { //seed users_crews
          UserTaskSeed.forEach(userTask => {
            UserTask.create({
              userId: userTask.userId,
              taskId: userTask.taskId,
              completed: userTask.completed,
              verified: userTask.verified,
            }).then(() => console.log('UserTask created')).catch(err => console.log('error seeding UserTask', err));
          });
        })
        .catch(err => {
          console.log('Databse did not sync: ', err);
        });
    });
}) ();