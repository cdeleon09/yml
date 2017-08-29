'user strict';
module.exports = function(autoIncrement){
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    email: {
      type: String,
      required: 'Email is required.',
      unique: true
    },
    password: {
      type: String,
      required: 'Password is required.'
    },
    firstName: {
      type: String,
      required: 'First name is required.'
    },
    lastName: {
      type: String,
      required: 'Last name is required.'
    }
  });

  UserSchema.methods.toJSON = function(){
    var obj = this.toObject();
    delete obj.password;
    return obj;
  };


  UserSchema.plugin(autoIncrement.plugin, {model:"User", startAt:1});
  return mongoose.model('User', UserSchema);
}
