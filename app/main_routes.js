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

router.get('/user', usersController.showUser, function(req, res){
  // var userInfo = decodeURIComponent(req.query);
  // console.log(userInfo);
  // console.log(req.query);
  console.log(req.query.email);
  res.render('pages/user_page', {title: 'User Page', email: req.query.email});
});

router.post('/user', usersController.saveUser, function(req, res){
  // var userInfo = decodeURIComponent(req.query);
  // console.log(userInfo);
  // console.log(req.query);
  console.log(req.query.email);
  res.render('pages/user_page', {title: 'User Page', email: req.query.email});
});
