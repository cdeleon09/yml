'user strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    Required: true
  },
  password: {
    type: String,
    Required: true
  },
  firstName: {
    type: String,
    Required: true
  },
  lastName: {
    type: String,
    Required: true
  }
});

module.exports = mongoose.model('Users', UserSchema);
