var express = require('express');
var path = require('path');
var router = express.Router();
const jobsController = require('./controllers/jobs.controller');
const usersController = require('./controllers/users.controller');

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
