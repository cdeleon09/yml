'use strict';
var bcrypt = require('bcrypt');

exports.getUsers = function(User){
  return function(req, res){
    User.find({}, function(err, users) {
      if (err) {
        res.send(err);
      } else {
        res.json(users);
      }
    });
  };
};

exports.createUser = function(User){
  return function(req, res){
    var newUser = new User(req.body);
    bcrypt.hash(newUser.password, 10, function(err, hash){
      newUser.password = hash;
      newUser.save(function(err, user){
        if (err) {
          res.status(400).send('Failed to create user.');
        } else {
          res.sendStatus(200);
        }
      });
    });
  };
};
