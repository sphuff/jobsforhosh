var express = require('express');
var app = express();
var expressLayouts = require('express-ejs-layouts');
var port = 12345;
var router = require('./app/routes.js');

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use('/', router);

app.use(express.static(__dirname + '/public'));

app.listen(port, function(){
  console.log('listening on 12345');
});