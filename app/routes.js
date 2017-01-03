var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '../views/pages/index.html'));
});

router.get('/login', function(req, res){
  res.sendFile(path.join(__dirname, '../views/pages/login.html'));
});

router.get('/signup', function(req, res){
  res.sendFile(path.join(__dirname, '../views/pages/signup.html'));
});