'use strict';
exports.getDrafts = function(Draft){
  return function(req, res){
    Draft.find({}).populate('pods.players pods.matches.player1 pods.matches.player2')
    .exec(function(err, drafts) {
      if (err) {
        res.send(err);
      }
      res.json(drafts);
    });
  };
};

exports.createDraft = function(Draft){
  return function(req, res){
    var newDraft = new Draft(req.body);
    var Combinatorics = require('js-combinatorics');
    for(var i=0; i < newDraft.pods.length; i++){
      if(newDraft.pods[i].players.length <= 1){
        continue;
      }
      newDraft.pods[i].matches = [];
      var matchCmb = Combinatorics.combination(newDraft.pods[i].players, 2);
      var match;
      while(match=matchCmb.next()){
        newDraft.pods[i].matches.push({
          player1:match[0],
          player2:match[1],
          win1:0,
          win2:0
        });
      }
    }
    newDraft.save().then(function(draft){
      return draft;
    }, function(err) {res.status(400).send('Failed to create draft');})
    .then(function(draft){

      res.json(draft);
    });
  };
};

exports.addPodToDraft = function(Draft){
  return function(req, res){
    Draft.findByIdAndUpdate(req.params.id, {$addToSet: {pods: req.body}}, function(err, draft){
      if(err){
        res.status(400).send(err);
      }
      res.json(draft);
    });
  };
};

exports.addUserToPod = function(Draft){
  return function(req, res){
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
};
