require('dotenv').config();
var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var router = require('./app/routes.js');

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(bodyParser.urlencoded());

app.use('/', router);

app.use(express.static(__dirname + '/public'));

app.listen(process.env.port, function(){
  console.log('listening on ' + process.env.port);
});
