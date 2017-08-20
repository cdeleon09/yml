'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PodSchema = new Schema({
  name: {
    type: String,
    Required: true
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

module.exports = mongoose.model('Pod', PodSchema);
