require('dotenv').config();
var mongoose = require('mongoose');
var User = require('../models/user_model');

// helper methods
function isValidId(id){
  if (id != null && id.match(/^[0-9a-fA-F]{24}$/)){
    return true;
  }

  return false;
}

function isValidEmail(email){
  var reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email != null && reg.test(email)){
    return true;
  }

  return false;
}

function isValidUserObject(userObject){
  if (userObject.email && userObject.password && isValidEmail(userObject.email))
    return true;
  else
    return false;
}

// exported controller methods
module.exports = {
  showUser : (req, res) => {

    User.findOne({email: req.query.email}, function(err, user){
      if (err) res.send(err);
      else if (user == null) res.status(404).send('User not found');
      user.comparePassword(req.query.password, function(err, isMatch) {
          if (err) res.send(err);
          if (isMatch) res.redirect('/user');
          else res.status(401).send('Invalid password');
      });
    })
    // render page
  },

  saveUser : (req, res) => {

    if (!isValidUserObject(req.body)) {
      res.status(400).send({error:
        {
          code: 400,
          title: "Bad Request",
          description: "Must pass valid email and password"
        }});
      return;
    }

    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      date: new Date()
    });
    newUser.save(function(err, user){
      if (err) res.send(err);
    });
    // render page
    res.redirect('/user');
  }
}
