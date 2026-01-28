const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  patientName: String,
  type: String, // ONLINE, WALKIN, PAID, FOLLOWUP, EMERGENCY
  priority: Number,
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot' },
  status: { type: String, default: 'ACTIVE' } // ACTIVE, CANCELLED, NO_SHOW
});

module.exports = mongoose.model('Token', tokenSchema);
