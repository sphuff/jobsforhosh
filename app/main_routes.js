var express = require('express');
var path = require('path');
var router = express.Router();
const jobsController = require('./controllers/jobs.controller');
const usersController = require('./controllers/users.controller');

module.exports = router;

router.get('/', function(req, res){
  res.render('pages/home');
});

router.get('/login', function(req, res){
  res.render('pages/login');
});

router.get('/signup', function(req, res){
  res.render('pages/signup');
});

router.get('/user', usersController.showUser, function(req, res){
  // var userInfo = decodeURIComponent(req.query);
  // console.log(userInfo);
  // console.log(req.query);
  console.log(req.query.email);
  res.render('pages/user_page');
});

router.post('/user', usersController.saveUser, function(req, res){
  // var userInfo = decodeURIComponent(req.query);
  // console.log(userInfo);
  // console.log(req.query);
  console.log(req.query.email);
  console.log('ready');
  var nodemailer = require('nodemailer');

  var transport = nodemailer.createTransport({
    host: "mailtrap.io",
    port: 2525,
    auth: {
      user: "a66c20b3450069",
      pass: "24ff36ee091b02"
    }
  });

  var mailOptions = {
    from: 'jobs@jobsforhosh.com',
    to: 'you@test.com',
    subject: 'This is a test',
    text: 'Hi there',
    html: '<p>This is the body</p> <a href="http://localhost:12345/">Link</a>'
  }

  transport.sendMail(mailOptions, function(err, info){
    if (err){
      console.log(err);
    }
    console.log('Message sent: ' + info.response);;
  });

  res.render('pages/thanks', {email: req.query.email});
});
