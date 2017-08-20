'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Pod = mongoose.model('Pod');

exports.getPods = function(req, res){
  Pod.find({}, function(err, users) {
    if (err) {
      res.send(err);
    }
    res.json(users);
  });
};

exports.createPod = function(req, res){
  var newPod = new Pod(req.body);
  newPod.save(function(err, pod){
    if (err) {
      res.status(400).send('Failed to create pod.');
    } else {
      res.json(pod);
    }
  });
};

exports.addUserToPod = function(req, res){
  if(req.body.userId <= 0){
    res.status(400).send('Invalid user id.');
  }
  Pod.findById(req.params.id, function(err, pod){
    if (err) {
      res.send(err);
    }
    if(!pod){
      res.status(400).send('Invalid pod.');
    }
    pod.players.push(req.body.userId);
    pod.save(function(err, pod){
      if (err) {
        res.status(400).send('Failed to save pod.');
      } else {
        res.json(pod);
      }
    })
  });
};
