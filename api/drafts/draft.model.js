'user strict';

module.exports = function(autoIncrement){
  var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

  var MatchSchema = new Schema({
    player1: {
      type: Number,
      ref: 'User',
      required: 'Player 1 is required.'
    },
    player2: {
      type: Number,
      ref: 'User',
      Required: 'Player 2 is required.'
    },
    win1: {
      type: Number
    },
    win2: {
      type: Number
    }
  });

  MatchSchema.plugin(autoIncrement.plugin, {model:"Match", startAt:1});

  var PodSchema = new Schema({
    name: {
      type: String,
      required: 'Pod name is required.'
    },
    players: [
      {
        type: Number,
        ref: 'User',
        unique: true
      }
    ],
    matches: [MatchSchema]
  });

  PodSchema.plugin(autoIncrement.plugin, {model:"Pod", startAt:1});

  var DraftSchema = new Schema({
    name: {
      type: String,
      required: 'Draft name is required.',
      unique: true
    },
    draftSet: {
      type: String,
      Required: 'Draft set is required.'
    },
    pods: [PodSchema]
  });

  DraftSchema.plugin(autoIncrement.plugin, {model:"Draft", startAt:1});
  return mongoose.model('Draft', DraftSchema);
}
