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

// Allows crew creation
exports.postCrew = (crewData, cb) => {
  //this query has been tested OK
  db.crew.create(crewData)
    .then(crew => {
      return cb(null, crew);
    })
    .catch(err => {
      return cb(err, null);
    });
};