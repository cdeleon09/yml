//init vars
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  passport = require('passport'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  cors = require('cors'),
  autoIncrement = require('mongoose-auto-increment');

//db configuration
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local', {useMongoClient:true});

//init Schema
autoIncrement.initialize(mongoose.connection);
require('./api/schema').initialize(autoIncrement);

//init parser.
app.use(cookieParser('drawgobitches'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}));

//init session/passport
app.use(session({
  secret: 'drawgobitches',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 15000,
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
require('./api/authentication')(passport);

//init web api routes
var routes = require('./api/routes');
routes(app, passport);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('YML API server started on: ' + port);
