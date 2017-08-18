var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
<<<<<<< HEAD
  bodyParser = require('body-parser')
  cors = require('cors');
=======
  bodyParser = require('body-parser');
>>>>>>> a5f5a3e4dfcd4b04b224d93281d3f57eccfb7bb2

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

var routes = require('./api/routes/routes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('YML API server started on: ' + port);
