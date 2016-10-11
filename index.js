// Setup basic express server
const googleAuth = require('./googleAuth');
const calendar = require('./calendar');

const express = require('express');

const app = express();
const server = require('http').createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.get('/calendar', (req, res) => {
  calendar.listEvents(googleAuth.getAuth()).then(events => res.json(events));
});

app.use(express.static(__dirname + '/public'));
