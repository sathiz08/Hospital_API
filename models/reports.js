const mongoose = require('mongoose');

//report schema
const reportSchema = new mongoose.Schema({
  doctors:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctors'
  },
  patients:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient'
  },
  status:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  }
},{
  timestamps: true
});


//export reports
const Report = mongoose.model('Report', reportSchema);
module.exports = Report;