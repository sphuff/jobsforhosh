require('dotenv').config();
var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var mainRouter = require('./app/main_routes.js');
var apiRouter = require('./app/api_routes.js');
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', mainRouter);
app.use('/api', apiRouter);

app.use(express.static(__dirname + '/public'));

mongoose.connect(process.env.DB_URI);

app.listen(process.env.port, function(){
  console.log('listening on ' + process.env.port);
});

module.exports = app; // for testing
