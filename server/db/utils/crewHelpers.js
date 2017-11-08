const db = require('../index.js');
// Returns one crew for single id
//currently unused
exports.findCrewById = (id, cb) => {
  //this query has been tested OK
  db.crew.findById(id)
    .then(crew => {
      cb(null, crew);
    })
    .catch(err => {
      cb(err, null);
    });
};

// Returns all crews for array of id(s). Used by '/user/crews' endpoint in config.js.
exports.findAllCrewsByIds = (ids, cb) => {
  //this query has been test OK
  db.crew.findAll({
    where: {
      id: {
        $in: ids
      }
    }
  })
    .then(crewsData => {
      if (!crewsData.length) {
        cb(err, null);
      } else {
        cb(null, crewsData);
      }
    });
};

// Returns all crews in the database
exports.findAllCrews = (cb) => {
  return db.crew.findAll();
};

// Allows crew creation
exports.postCrew = (crewData, userId, cb) => {
  //this query has been tested OK
  let user = userId;
  db.crew.create(crewData)
    .then(crew => {
      return crew.id;
    })
    .then(crew_id => {
      db.user_crew.create({
        crew_id: crew_id,
        user_id: user,
        points: 0,
        achievement: 'none',
        role: 'leader'
      })
        .then(crew => {
          cb(null, crew);
        });
    })
    .catch(err => {
      return cb(err, null);
    });
};

exports.searchCrews = (qs) => {
  if (qs) {
    qs = `%${qs}%`;
    return db.crew.findAll({
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
    });
  } else {
    return db.crew.findAll();
  }
};

exports.editCrew = (req, res) => {
  return db.crew
    .update(req.body, {
      where: {
        id: req.query.crew_id
      }
    })
    .then(updated => res.status(200).send(updated))
    .catch(err => res.status(500).send(err));
};