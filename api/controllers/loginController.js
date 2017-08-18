'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('Users');

exports.login = function(req, res){
  User.find({email:req.body.email, password:req.body.password}, function(err, u) {
    if (err) {
      res.send(err);
    }
    res.json(u);
  });
};
