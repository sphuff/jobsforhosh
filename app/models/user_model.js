var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  password: String,
  email: String,
  admin: Boolean,
  signupDate: Date
});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;