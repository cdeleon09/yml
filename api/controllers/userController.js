'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.getUsers = function(req, res){
  User.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

exports.createUser = function(req, res){
  //var newUser = new User(req.body);

  debugger;

  var newUser = new User({
    _id: req.body._id,
    email:req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })

  newUser.save(function(err, user){
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
