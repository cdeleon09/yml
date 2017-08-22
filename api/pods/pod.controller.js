'use strict';

var mongoose = require('mongoose'),
  Pod = mongoose.model('Pod');

exports.getPods = function(req, res){
  Pod.find({}, function(err, pods) {
    if (err) {
      res.send(err);
    }
    res.json(pods);
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
  Pod.findByIdAndUpdate(req.params.id, {$addToSet: {users: req.body.userId}}, function(err, pod){
      if(err){
        res.status(400).send(err);
      }
      res.json(pod);
  });
};
