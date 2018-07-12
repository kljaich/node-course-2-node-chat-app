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

// Listen for new connection events from user clients
// and print out a message when one is received.
// Note, a connection event is built-in.
io.on('connection', (socket) => {
  console.log('New user client connected');

  // Create and send newEmail event to a user client
  // socket.emit('newEmail');
  // socket.emit('newEmail', {
  //   from: 'mike@example.com',
  //   text: 'Hey. What is going on',
  //   createdAt: 123
  // });

  // Create listen event for createEmail from a user client
  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  // Create and send newMessage event to a user client
  socket.emit('newMessage', {
    from: 'admin@example.com',
    text: 'You are getting removed from the chat room',
    createdAt: 123
  });

  // Create listen event for createMessage from a user client
  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);
  });

  // Listen for builtin disconnect events from user clients
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
