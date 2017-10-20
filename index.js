const express = require('express');
const bodyParser = require('body-parser');

// INIT APP
const app = express();

// MIDDLEWARE
app.use(express.static((__dirname + '/client/public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.get('*', (req, res) => {
  res.send('Server Running');
});

// CHECK PORT AND START SERVER
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server Started: Listening on port:' + port);
});

module.exports = app;
