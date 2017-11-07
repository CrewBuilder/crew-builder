const db = require('../models');

module.exports = {
  searchCrews(req, res) {
    if (req.query.qs) {
      let qs = `%${req.query.qs}%`;
      return db.Crew
        .findAll({
          where: {
            $or: {
              crew_name: {
                $iLike: qs
              },
              crew_description: {
                $iLike: qs
              }
            }
          }
        })
        .then(crews => res.status(200).send(crews))
        .catch(err => res.status(404).send(err));
    } else {
      return db.Crew
        .findAll()
        .then(crews => res.status(200).send(crews))
        .catch(err => res.status(404).send(err));
    }
  },

  newCrew(req, res) {
    let user_id = req.body.user_id;
    return db.Crew
      .create(req.body)
      .then(created => {
        return db.User_Crew
          .create({
            user_id: user_id,
            crew_id: created.id,
            role: 'leader'
          });
      })
      .then(created => {
        return db.Crew.findOne({
          where: {
            id: created.crew_id
          },
          include: [{
            model: db.User_Crew,
            where: {
              role: 'leader'
            }
          }]
        });
      })
      .then(crew => res.status(201).send(crew))
      .catch(err => {
        console.log('New crew creation error: ', err.SequelizeDatabaseError);
        res.status(400).send(err);
      });
  }
};
