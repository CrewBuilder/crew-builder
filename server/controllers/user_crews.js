const db = require('../models');

module.exports = {
  leaveCrew(req, res) {
    let user_id = req.query.user_id;
    let crew_id = req.query.crew_id;
    return db.User_Crew
      .destroy({
        where: {
          crew_id: crew_id,
          user_id: user_id
        }
      })
      .then(destroyed => res.sendStatus(202))
      .catch(err => res.status(400).send(err));
  },

  joinCrew(req, res) {
    let user_crew = {
      user_id: req.body.user_id,
      crew_id: req.body.crew_id,
    };
    return db.User_Crew
      .create(user_crew)
      .then(created => res.status(201).send(created))
      .catch(err => res.status(400).send(err));
  }
};