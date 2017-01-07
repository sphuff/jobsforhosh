var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
    saltRounds = 10;

var userSchema = new Schema({
  password: {type: String, required: true},
  email: {type: String, required: true, index: {unique: true}},
  admin: Boolean,
  signupDate: Date
});

userSchema.pre('save', function(next){
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(saltRounds, function(err, salt){
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return next(err);

    cb(null, isMatch);
  });
}

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;
