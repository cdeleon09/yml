'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MatchSchema = new Schema({
  player1: {
    type: Schema.Types.ObjectId,
    required: 'Player 1 is required.'
  },
  player2: {
    type: Schema.Types.ObjectId,
    Required: 'Player 2 is required.'
  },
  win1: {
    type: Number
  },
  win2: {
    type: Number
  }
});

module.exports = mongoose.model('Match', MatchSchema);
