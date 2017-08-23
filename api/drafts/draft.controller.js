'use strict';

var mongoose = require('mongoose'),
  Draft = mongoose.model('Draft');

exports.getDrafts = function(req, res){
  Draft.find({}).populate({
    path:'pods.players'
  }).exec(function(err, drafts) {
    if (err) {
      res.send(err);
    }
    res.json(drafts);
  });
};

exports.createDraft = function(req, res){
  var newDraft = new Draft(req.body);
  newDraft.save(function(err, draft){
    if (err) {
      console.log(err);
      res.status(400).send('Failed to create draft.');
    } else {
      res.json(draft);
    }
  });
};

exports.addPodToDraft = function(req, res){
  Draft.findByIdAndUpdate(req.params.id, {$addToSet: {pods: req.body}}, function(err, draft){
      if(err){
        res.status(400).send(err);
      }
      res.json(draft);
  });
};

exports.addUserToPod = function(req, res){
  Draft.findOneAndUpdate({_id:req.params.draftId,
    "pods.$._id":req.params.podId},
    {$addToSet: { "pods.$.players" : req.body.userId}},
    {new:true},
    function(err, draft){
      if(err){
        res.status(400).send(err);
      }
      res.json(draft);
  });
};
