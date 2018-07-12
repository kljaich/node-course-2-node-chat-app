var socket = io();

// Listen for builtin connect events from the server
socket.on('connect', function () {
  console.log('Connected to server');

  // Emit a createEmail event to the server after a
  // socket.io connection was established
  // socket.emit('createEmail', {
  //   to: "mom@example.com",
  //   text: "Take out the garbage you lazy son"
  // });

  // Emit a createMessage event to the server after a
  // socket.io connection was established
  // socket.emit('createMessage', {
  //   from: "me@example.you",
  //   text: "This is a test message for the Chat Room"
  // })
});

// Listen for builtin disconnect events from the server
socket.on('disconnect', function () {
  console.log('Disconnected to server');
});

// Listen for a custom newEmail event sent from the server
// socket.on('newEmail', function (email) {
//   console.log('New email arrived', email);
// });

// Listen for a custom newMessage event sent from the server
socket.on('newMessage', function (message) {
  console.log('New chat room message arrived', message);
});
