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
  // socket.emit('newMessage', {
  //   from: 'admin@example.com',
  //   text: 'You are getting removed from the chat room',
  //   createdAt: 123
  // });

  // Send a broadcast message saying a new user client joined
  socket.broadcast.emit('newMessage', {
    from: 'admin',
    text: 'New user client has joined the Chat App',
    createdAt: new Date().getTime()
  });

  socket.emit('newMessage', {
    from: 'admin',
    text: 'Welcome to the Chat App',
    createdAt: new Date().getTime()
  });

  // Create custom listen event for createMessage from a user client
  socket.on('createMessage', (newMessage) => {
    console.log('createMessage', newMessage);

    // Send broadcast message to all user clients icluding the user
    // client that sent the message above, when a message is
    // received from a user client
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });

    // Send broadcast message to all user clients except the one
    // that sent the message above.
    // socket.broadcast.emit('newMessage', {
    //     from: newMessage.from,
    //     text: newMessage.text,
    //     createdAt: new Date().getTime()
    // });
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
