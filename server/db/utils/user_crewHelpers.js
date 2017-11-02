const db = require('../index.js'); // Queries the User_Crew table, returns all of a User's crews by Id
exports.getCrewsByUser = (id) => {
  return db.user.findOne({
    where: {
      id: id
    },
    include: [{
      model: db.crew,
      through: {
        attributes: ['points', 'role', 'achievement']
      }
    }]
  });
};

exports.postUserCrew = (userId, crewId, cb) => {
  db.user_crew.create({
    user_id: userId,
    crew_id: crewId,
    points: 0,
    achievement: 'none',
    role: 'member'
  })
    .then(userCrew => {
      cb(null, userCrew);
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.getCrewMembers = (crewId, cb) => {
  db.user_crew.findAll({
    where: {
      crew_id: crewId
    }
  })
    .then(members => {
      cb(null, members);
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.leaveCrew = (userId, crewId) => {
  return db.user_crew.findOne({
    where: {
      crew_id: crewId,
      user_id: userId
    }
  }).then(userCrew => {
    userCrew.destroy();
  });
};

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
