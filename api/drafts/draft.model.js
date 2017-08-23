'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  ]
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
