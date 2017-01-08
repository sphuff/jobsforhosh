var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: String,
  company: String,
  forUser: {type: String, required: true},
  date: Date,
  description: String
});

const jobModel = mongoose.model('Job', jobSchema);

module.exports = jobModel;
