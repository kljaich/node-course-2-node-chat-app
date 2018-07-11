const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


// Heroku sets process.env.PORT, otherwise use port 3000 locally
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// Configure express app
app.use(express.static(publicPath));

// Listen for new connections and print out a message when
// once is detected.  Note, connection is built-in.
io.on('connection', (socket) => {
  console.log('New user connected');

  // Listen for disconnects
  socket.on('disconnect', () => {
    console.log('Disconnect from client');
  })
});

// app.get('/', (req, res) => {
//   response.render('index.html');
// });

server.listen(port, () => {
  console.log(`Started on port ${port}`);
})
