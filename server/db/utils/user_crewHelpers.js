const db = require('../index.js'); // Queries the User_Crew table, returns all of a User's crews by Id
exports.getCrewsByUser = (id, cb) => {
  //this query tested OK
  db.user.findOne({
    where: {
      id: id
    },
    include: [{
      model: db.crew,
      through: {
        attributes: ['points', 'role', 'achievement']
      }
    }]
  })
    .then(user => {
      if (!user.crews.length) {
        cb(`No crews for user: ${id}`, null);
      } else {
        cb(null, parseData(user));
      }
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.postUserCrew = (userId, crewId, cb) => {
  db.user_crew.create({
    user_id: userId,
    crew_id: crewId,
    points: 0,
    achievement: "none",
    role: "member"
  })
    .then(userCrew => {
      cb(null, userCrew);
    })
    .catch(err => {
      cb(err, null);
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

