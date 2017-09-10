'use strict';
exports.getDrafts = function(Draft){
  return function(req, res){
    Draft.find({ "pods.players" : req.user._id }).populate('pods.players pods.matches.player1 pods.matches.player2')
    .exec(function(err, drafts) {
      if (err) {
        res.status(400).send(err);
      } else {
        res.json(drafts);
      }
    });
  };
};

exports.createDraft = function(Draft){
  return function(req, res){
    var newDraft = new Draft(req.body.draft);
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
      res.json(draft);
    },
    function(err) {console.log(err); res.status(400).send('Failed to create draft');});
  };
};

exports.addPodToDraft = function(Draft){
  return function(req, res){
    Draft.findByIdAndUpdate(req.params.id, {$addToSet: {pods: req.body}}, function(err, draft){
      if(err){
        res.status(400).send(err);
      } else {
        res.json(draft);
      }
    });
  };
};

exports.addUserToPod = function(Draft){
  return function(req, res){
    var _ = require('underscore');
    Draft.findById(req.params.draftId).then(function(draft){
      var pod = _.findWhere(draft.pods, {id:req.params.podId});
      var player = _.find(pod.players, function(p){ return p == req.body.userId; });
      if(player){
        res.status(400).send('Player already exists in this pod!');
        return null;
      }
      for(var i=0;i < pod.players.length;i++){
        pod.matches.push({
          player1:req.body.userId,
          player2:pod.players[i],
          win1:0,
          win2:0
        });
      }
      pod.players.push(req.body.userId);
      return draft.save();
    }).then(function(d){
      if(d){
        res.json(d);
      }
    });
  };
};

exports.updateMatchResults = function(Draft){
  return function(req, res){
    //need to include user in the query
    Draft.findOneAndUpdate({
        _id:req.params.draftId, "pods._id":req.params.podId, "pods.matches._id":req.params.matchId
      },
      {
        $set: {"pods.$.matches.0.win1":req.body.win1,"pods.$.matches.0.win2":req.body.win2}
      },
      {new:true},
      function(err, draft){
        if(err){
          res.status(400).send(err);
        } else {
          res.json(draft);
        }
      }
    );
  };
};

exports.removeUserFromPod = function(Draft){
  return function(req, res){
    Draft.findById(req.params.draftId).then(function(draft){
      var _ = require('underscore');
      var pod = _.findWhere(draft.pods, {id:req.params.podId});
      if(pod){
        pod.players = _.reject(pod.players, function(p){ return p == req.params.userId; });
        pod.matches = _.reject(pod.matches, function(m){ return m.player1 == req.params.userId || m.player2 == req.params.userId; });
        return draft.save();
      }
    }).then(function(d){
      if(d){
        res.json(d);
      }
    });
  };
};

exports.deletePod = function(Draft){
  return function(req, res){
    Draft.findByIdAndUpdate(req.params.draftId, {
      $pull: {pods: {_id:req.params.podId}}
    }, function(err, d){
      if(err){
        res.status(400).send(err);
      } else {
        res.json(d);
      }
    });
  };
};

exports.deleteDraft = function(Draft){
  return function(req, res){
    Draft.findByIdAndRemove(req.params.id).then(function(err){
      if(err){
        res.status(400).send(err);
      } else {
        res.send();
      }
    });
  };
};
