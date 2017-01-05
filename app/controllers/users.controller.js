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
  console.log(userObject);
  if (userObject.email && userObject.password && isValidEmail(userObject.email))
    return true;
  else 
    return false;
}

function constructUserObjectFromRequest(req) {
  
  var user = {};
  user.password = req.body.password;
  user.email = req.body.email;
  user.signupDate = new Date();
  
  return user;
}

// exported controller methods
module.exports = {
  showUser : (req, res) => {
    
    if (!isValidId(req.query.id)) {
      res.status(400).send({error:
      {
        code: 400,
        title: "Bad Request",
        description: "Must pass valid id"
      }});
      return;
    }
    
    User.findById(req.query.id, function(err, user){
      if (err) {
        res.send(err);
      }
      else {
        res.send(user);
      }
    });
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
    
    const userObject = constructUserObjectFromRequest(req);
    var newUser = new User(userObject);
    newUser.save();
    
    res.send(newUser);
    // render page
  }
}
