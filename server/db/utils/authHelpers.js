const jwt = require('jsonwebtoken');


module.exports = {
  verifyToken(req, res, next) {
    if (process.env.DEV_MODE && process.env.DEV_MODE === 'test') {
      next();
    }

    let token = req.headers['x-auth-token'];
    console.log(token);
    if (token) {
      return new Promise ((resolve, reject) => {
        jwt.verify(token, 'crew-bldr-secret', (err, decoded) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded);
          }
        });
      })
        .then(decoded => {
          req.decoded = decoded;
          next();
        })
        .catch(err => {
          res.status(403).send('Invalid authorization token sent');
        });
    } else {
      res.status(403).send('No token sent');
    }
  }
};