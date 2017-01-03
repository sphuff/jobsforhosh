var express = require('express');
var path = require('path');
var router = express.Router();

module.exports = router;

router.get('/', function(req, res){
  res.render('pages/home', {title: 'hi'});
});

router.get('/login', function(req, res){
  res.render('pages/login', {title: 'login'});
});

router.get('/signup', function(req, res){
  res.render('pages/signup', {title: 'signup'});
});

router.get('/card', function(req, res){
  res.sendFile(path.join(__dirname, '../views/pages/card.html'));
});