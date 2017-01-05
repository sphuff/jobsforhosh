require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var chai = require('chai');
var mocha = require('mocha');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;

var Job = require('../app/models/job_model');

chai.use(chaiHttp);


describe('Jobs', function(){
  before(function() {
    mongoose.Promise = global.Promise;
    mongoose.createConnection(process.env.DB_URI, function(err) {
        if(err){
          console.log(err);
        }
    });
  });
  
  after(function(){
    mongoose.disconnect();
  });
  
  var job_id = null;
  it('should POST a new job', function(done){
    chai.request(server)
      .post('/jobs')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({title: "Sous Chef", company: "Choice Hotels", description: "Make food"})
      .end(function (err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('company', 'Choice Hotels');
        job_id = res.body._id;
        done();
      });
  });
  
  it('should GET the job', function(done){
    chai.request(server)
      .get('/jobs')
      .query({id: job_id})
      .end(function (err, res){
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('company', 'Choice Hotels');
        done();
      });
  });
  it('shouldn\'t POST an invalid job', function(done){
    chai.request(server)
      .post('/jobs')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({title: "Pilot", description: "Fly stuff"})
      .end(function (err, res){
        expect(res).to.have.status(400);
        done();
      });
  });
  it('shouldn\'t GET an a job if no id is passed', function(done){
    chai.request(server)
      .get('/jobs')
      .end(function (err, res){
        expect(res).to.have.status(400);
        done();
      });
  });
  it('shouldn\'t GET an a job if invalid id is passed', function(done){
    chai.request(server)
      .get('/jobs')
      .query({id: "1"})
      .end(function (err, res){
        expect(res).to.have.status(400);
        done();
      });
  });
});