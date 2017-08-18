'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    Required: true
  },
  password: {
    type: String,
    Required: true
  },
  email: {
    type: String,
    Required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  }
});

module.exports = mongoose.model('Users', UserSchema);
