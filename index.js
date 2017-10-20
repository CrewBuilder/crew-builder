const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static((__dirname + '/client/public')));
app.use(bodyParser.json());

app.get('*', (req, res) => {
  res.send('Server Running');
});

app.listen(3000, () => {
  console.log('Listening on localhost:3000');
});
