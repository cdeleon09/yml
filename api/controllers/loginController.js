'use strict';

var passport = require('passport'),
mongoose = require('mongoose'),
User = mongoose.model('User');

exports.login = function(req, res){
  console.log(req.body);
  passport.authenticate('local', function(err, user){
    console.log(user);
  });
};
