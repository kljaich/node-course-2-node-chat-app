const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
console.log(publicPath);

// Heroku sets process.env.PORT, otherwise use port 3000 locally
const port = process.env.PORT || 3000;

var app = express();

// Configure express app
app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//   response.render('index.html');
// });

app.listen(port, () => {
  console.log(`Started on port ${port}`);
})
