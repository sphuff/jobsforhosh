require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var chai = require('chai');
var mocha = require('mocha');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;

var User = require('../app/models/user_model');

chai.use(chaiHttp);

describe('User', function(){
  before(function() {
    mongoose.Promise = global.Promise;
    mongoose.createConnection(process.env.TEST_DB_URI, function(err) {
        if(err){
          console.log(err);
        }
    });
  });

  after(function(){
    User.remove({});
    mongoose.disconnect();
  });
  it('should create test user', function(done){
    chai.request(server)
      .post('/users')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({email: "testuser123@test.com", password: "1234"})
      .end(function (err, res){
        expect(res).to.have.status(200);
        done();
      });
  });
});

// get jobs for user
