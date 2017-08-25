'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  player1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: 'Player 1 is required.'
  },
  player2: {
    type: Schema.Types.ObjectId,
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

var PodSchema = new Schema({
  name: {
    type: String,
    required: 'Pod name is required.'
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  matches: [MatchSchema]
});

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

module.exports = mongoose.model('Draft', DraftSchema);
