const db = require('../index.js');

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

exports.postUserCrew = (userId, crew_id, cb) => {
  db.user_crew.create({
    user_id: userId,
    crew_id: crew_id,
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

exports.getCrewMembers = (crew_id, cb) => {
  db.user_crew.findAll({
    where: {
      crew_id: crew_id
    }
  })
    .then(members => {
      cb(null, members);
    })
    .catch(err => {
      cb(err, null);
    });
};

exports.leaveCrew = (userId, crew_id) => {
  return db.user_crew.destroy({
    where: {
      crew_id: crew_id,
      user_id: userId
    }
  });
};