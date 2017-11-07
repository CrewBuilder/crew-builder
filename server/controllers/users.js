const db = require('../models');

module.exports = {
  newUser(profile, cb) {
    db.User
      .findOne({
        where: {
          facebook_id: profile.facebook_id
        }
      })
      .then((found) => {
        if (found) {
          return db.User
            .findOne({
              where: {
                facebook: profile.facebook
              }
            });
        } else {
          return db.User
            .create({
              facebook_id: profile.facebook_id,
              facebook: profile
            });
        }
      })
      .then(user => cb(null, user))
      .catch(err => cb(err, null));
  },

  findUserById(id) {
    return db.User
      .findOne({
        where: {
          id: id
        }
      });
  },

  getCrewMembers(req, res) {
    let crew_id = req.query.crew_id;
    return db.User
      .findAll({
        include: [{
          model: db.User_Crew,
          where: {
            crew_id: crew_id,
            role: 'member'
          }
        }]
      })
      .then(users => res.status(200).send(users))
      .catch(err => res.status(401).send(err));
  },

  getCrewsByUser(req, res) {
    let user_id = req.query.user_id;
    return db.User.findOne({
      where: {
        id: user_id
      },
      include: [{
        model: db.Crew,
        through: {
          attributes: ['points', 'role', 'achievement']
        }
      }]
    })
      .then(user => {
        res.status(200).send(parseData(user));
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};

const parseData = user => {
  let crews = user.Crews;
  let response = {
    leader: [],
    member: []
  };
  crews.forEach(crew => {

    if (crew.User_Crew.role === 'leader') {
      response.leader.push({
        points: crew.User_Crew.points,
        achievement: crew.User_Crew.achievement,
        role: crew.User_Crew.role,
        crew: {
          id: crew.id,
          crew_name: crew.crew_name,
          crew_description: crew.crew_description,
          crew_image: crew.crew_image
        }
      });

    } else {
      response.member.push({
        points: crew.User_Crew.points,
        achievement: crew.User_Crew.achievement,
        role: crew.User_Crew.role,
        crew: {
          id: crew.id,
          crew_name: crew.crew_name,
          crew_description: crew.crew_description,
          crew_image: crew.crew_image
        }
      });
    }
  });

  return response;
};