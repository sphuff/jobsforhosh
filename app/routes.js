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
router.post('/login', function(req, res){
  res.send('welcome back ' + req.body.email);
});

router.get('/signup', function(req, res){
  res.render('pages/signup', {title: 'signup'});
});
router.post('/signup', function(req, res){
  res.send('hi there ' + req.body.email);
});

router.get('/card', function(req, res){
  res.sendFile(path.join(__dirname, '../views/pages/card.html'));
});
