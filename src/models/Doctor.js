const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  department: String,
  slots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Slot' }]
});

module.exports = mongoose.model('Doctor', doctorSchema);
