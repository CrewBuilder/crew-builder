const jwt = require('jsonwebtoken');


module.exports = {
  verifyToken(req, res, next) {
    let token = req.headers['x-auth-token'] || null;
    if (token) {
      jwt.verify(token, 'crew-bldr-secret', (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(403).send('Invalid authorization token sent');
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      if (process.env.DEV_MODE && process.env.DEV_MODE === 'test') {
        next();
      } else {
        res.status(403).send('No token sent');
      }
    }
  }
};