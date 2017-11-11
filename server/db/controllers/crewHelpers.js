const db = require('../index.js');

// Allows crew creation
module.exports = {
  postCrew(req, res) {
    let crew = {
      name: req.body.name,
      description: req.body.description,
      image: req.body.image
    };
    let user_id = req.body.user_id;
    let newCrew;
    db.crew
      .create(crew)
      .then(crew => {
        newCrew = crew;
        return db.user_crew.create({
          crew_id: crew.id,
          user_id: user_id,
          role: 'leader'
        });
      })
      .then(crew => {
        res.status(200).send(newCrew);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  },

  searchCrews(req, res) {
    qs = req.query.qs || null;
    if (qs) {
      qs = `%${qs}%`;
      return db.crew
        .findAll({
          where: {
            $or: {
              name: {
                $iLike: qs
              },
              description: {
                $iLike: qs
              }
            }
          }
        })
        .then(found => res.status(200).send(found))
        .catch(err => res.status(500).send(err));
    } else {
      return db.crew
        .findAll()
        .then(found => res.status(200).send(found))
        .catch(err => res.status(500).send(err));
    }
  },

  editCrew(req, res) {
    return db.crew
      .findOne({
        where: {
          id: req.query.crew_id
        }
      })
      .then(found => {
        return found.update(req.body);
      })
      .then(updated => res.status(200).send(updated))
      .catch(err => {
        console.log(err);
        res.status(500).send(err);
      });
  },

  deleteCrew(req, res) {
    return db.crew
      .destroy({
        where: {
          id: req.query.crew_id
        }
      })
      .then(destroyed => res.sendStatus(204))
      .catch(err => res.status(500).send(err));
  }
};
