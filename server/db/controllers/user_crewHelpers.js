const db = require('../index.js');

exports.getCrewsByUser = (req, res) => {
  let id = req.query.id;
  return db.user
    .findOne({
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
    .then(found => res.status(200).send(parseData(found)))
    .catch(err => res.status(500).send(err));
};

exports.postUserCrew = (req, res) => {
  let user_id = req.body.user_id;
  let crew_id = req.body.crew_id;
  return db.user_crew.create({
    user_id: user_id,
    crew_id: crew_id,
    points: 0,
    achievement: 'none',
    role: 'member'
  })
    .then(userCrew => res.status(201).send(userCrew))
    .catch(err => res.status(500).send(err));
};

exports.getCrewMembers = (req, res) => {
  let crew_id = req.query.crew_id;
  return db.user_crew
    .findAll({
      where: {
        crew_id: crew_id,
        role: 'member'
      },
      include: [{
        model: db.user
      }]
    })
    .then(members => res.status(200).send(members))
    .catch(err => res.status(500).send(err));
};

exports.leaveCrew = (req, res) => {
  let user_id = req.body.id;
  let crew_id = req.body.crew_id;
  return db.user_crew.destroy({
    where: {
      crew_id: crew_id,
      user_id: user_id
    }
  })
    .then(destroyed => res.sendStatus(204))
    .catch(err => res.status(500).send(err));
};

exports.claimReward = (req, res, next) => {
  db.user_crew
    .findOne({
      where: {
        user_id: req.body.user_id,
        crew_id: req.body.crew_id
      }
    })
    .then(found => {
      let oldPoints = found.points;
      if (oldPoints - req.body.reward.points < 0) {
        res.status(401).send('Not enough points for this reward');
      }
      return found.update({
        points: oldPoints - req.body.reward.points
      });
    })
    .then(updated => {
      next();
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
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