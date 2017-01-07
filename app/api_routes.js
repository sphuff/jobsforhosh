require('dotenv').config();
var express = require('express');
var path = require('path');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('./models/user_model');
const jobsController = require('./controllers/jobs.controller');
const usersController = require('./controllers/users.controller');

module.exports = router;

// put user POST before middleware to allow for signup
router.post('/users', usersController.saveUser);

// router.post('/authenticate', function(req, res){
//   // see if redirect works
//   console.log('made to authenticate');
//   console.log(req);
//   console.log('email: '+ req.body.email);
//   console.log('pass: '+ req.body.password);
//
//   User.findOne({email: req.body.email}, function(err, user){
//     if(err) {
//       throw err;
//     }
//
//     if(!user) {
//       res.send({success: false, message: "Authentication failed. User not found"});
//     } else if (user) {
//       if (user.password != req.body.password) {
//         res.send({success: false, message: 'Authentication failed. Wrong password.'});
//       } else {
//         var token = jwt.sign(user, process.env.secret, {
//           expiresIn: 60*60*24
//         });
//
//         res.send({
//           success: true,
//           message: 'Here\'s your token!',
//           token: token
//         });
//       }
//     }
//   });
// });
//
// router.use(function(req, res, next){
//   var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//   if (token) {
//     jwt.verify(token, process.env.secret, function(err, decoded){
//       if (err) {
//         return res.send({success: false, message: 'Failed to authenticate token.'});
//       } else {
//         req.decoded = decoded;
//         next();
//       }
//     });
//   } else {
//     return res.status(403).send({
//       success: false,
//       message: 'No token provided.'
//     });
//   }
// });

router.get('/jobs', jobsController.showJob);
router.post('/jobs', jobsController.saveJob);

router.get('/users', usersController.showUser);
