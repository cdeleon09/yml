'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
  pods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pod'
    }
  ]
});

module.exports = mongoose.model('Draft', DraftSchema);
