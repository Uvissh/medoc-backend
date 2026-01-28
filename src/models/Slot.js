const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  time: String, // "09-10"
  capacity: Number,
  tokens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }]
});

module.exports = mongoose.model('Slot', slotSchema);
