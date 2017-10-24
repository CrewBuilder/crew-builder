let Users_Crews = require('./../models/User_Crew.js');
// Queries the User_Crew table, returns all of a User's crews by Id
exports.getCrewsByUser = (id, cb) => {
  Users_Crews.findAll({
    attributes: ['crewId'],
    where: {
      userId: id
    }
  }, (err, crews) => {
    if (!crews.length) {
      cb(err, null);
    } else {
      cb(null, crews);
    }
  });
}