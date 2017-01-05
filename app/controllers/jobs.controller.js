var mongoose = require('mongoose');
var Job = require('../models/job_model');

// helper methods
function isValidId(id){
  if (id != null && id.match(/^[0-9a-fA-F]{24}$/)){
    return true;
  }
    
  return false;
}

function isValidJobObject(jobObject){
  if (jobObject.company && jobObject.title)
    return true;
  else 
    return false;
}

function constructJobObjectFromRequest(req) {
  
  var job = {};
  job.title = req.body.title;
  job.company = req.body.company;
  job.description = req.body.description || "lorem";
  job.date = new Date();
  
  return job;
}

// exported controller methods
module.exports = {
  showJob : (req, res) => {
    
    if (!isValidId(req.query.id)) {
      res.status(400).send({error:
      {
        code: 400,
        title: "Bad Request",
        description: "Must pass valid job id"
      }});
      return;
    }
    
    Job.findById(req.query.id, function(err, job){
      if (err) {
        res.send(err);
      }
      else {
        res.send(job);
      }
    });
    // render page
  },
  
  saveJob : (req, res) => {
    
    if (!isValidJobObject(req.body)) {
      res.status(400).send({error: 
        {
          code: 400, 
          title: "Bad Request", 
          description: "Must pass both job title and company name"
        }});
      return;
    }
    
    const jobObject = constructJobObjectFromRequest(req);
    var newJob = new Job(jobObject);
    newJob.save();
    
    res.send(newJob);
    // render page
  }
}
