//init vars
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  passport = require('passport'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser'),
  cors = require('cors');

//db configuration
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local');

//init parser.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//init session/passport
require('./api/authentication')(passport);
app.use(session({ secret:'drawgobitches' }));
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./api/routes/routes');
routes(app, passport);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('YML API server started on: ' + port);
