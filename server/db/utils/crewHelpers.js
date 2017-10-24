let Crew = require('./../models/Crew.js');

// Returns one crew for single id
//currently unused
exports.findCrewById = (id, cb) => {
  Crew.findById(id)
  .then(crew => {
    cb(null, crew);
  })
  .catch(err => {
    cb(err, null);
  })
}

// Returns all crews for array of id(s). Used by '/user/crews' endpoint in config.js.
exports.findAllCrewsByIds = (ids, cb) => {
  Crews.findAll({
    where: {
      id: {
        $in: ids
      }
    }
  }, (err, crewsData) => {
    if (!crewsData.length) {
      cb(err, null);
    } else {
      cb(null, crewsData);
    }
  });
}