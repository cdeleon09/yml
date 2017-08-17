'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    Required: true
  }
});

module.exports = mongoose.model('Users', UserSchema);
