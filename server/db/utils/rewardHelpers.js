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

  destroyReward(req, res) {
    db.reward
      .destroy({
        where: {
          id: req.query.reward_id
        }
      })
      .then(deleted => res.sendStatus(202))
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