const db = require('../index.js'); // Queries the User_Crew table, returns all of a User's crews by Id
exports.getCrewsByUser = (id, cb) => {
  //this query tested OK
  db.User_Crew.findAll({
    where: {
      userId: id
    }
  })
    .then(crews => {
      if (!crews.length) {
        cb(`No crews for user: ${id}`, null);
      } else {
        cb(null, crews);
      }
    })
    .catch(err => {
      cb(err, null);
    });
};