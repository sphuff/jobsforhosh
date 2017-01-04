var mongoose = require('mongoose');
var Job = require('../models/jobs');

module.exports = {
  showJob : (req, res) => {
    
    res.send('here\'s your job');
    
    // render page
  },
  
  saveJob : (req, res) => {
    const job = {
      title: "Sous Chef", 
      company: "Choice Hotels", 
      date: new Date(),
      description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    
    var newJob = new Job(job);
    newJob.save();
    
    res.send('saved the new job');
    // render page
  }
}