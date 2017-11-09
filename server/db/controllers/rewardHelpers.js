let db = require('../index.js');

module.exports = {

  createReward(req, res) {
    db.reward
      .create(req.body)
      .then(created => res.status(201).send(created))
      .catch(err => {
        if (err.SequelizeDatabaseError) {
          console.log('Create reward error in Sequelize: ', err.SequelizeDatabaseError);
          res.sendStatus(500);
        } else {
          console.log('Create reward error in request: ', err);
        }
      });
  },

  getRewardsByCrew(req, res) {
    db.reward
      .findAll({
        where: {
          crew_id: req.query.crew_id
        }
      })
      .then(rewards => res.status(200).send(rewards))
      .catch(err => {
        if (err.SequelizeDatabaseError) {
          console.log('Get rewards by crew error in Sequelize: ', err.SequelizeDatabaseError);
          res.sendStatus(500);
        } else {
          console.log('Get rewards by crew error in request: ', err);
        }
      });
  },

  destroyReward(req, res) {
    db.reward
      .destroy({
        where: {
          id: req.query.reward_id
        }
      })
      .then(deleted => res.sendStatus(204))
      .catch(err => {
        if (err.SequelizeDatabaseError) {
          console.log('Delete reward error in Sequelize: ', err.SequelizeDatabaseError);
          res.sendStatus(500);
        } else {
          console.log('Delete reward error in request: ', err);
        }
      });
  }
};