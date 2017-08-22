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

module.exports = mongoose.model('Pod', PodSchema);
