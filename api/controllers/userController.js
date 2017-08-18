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
  var newUser = new User(req.body);
  newUser.save(function(err, user){
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};
