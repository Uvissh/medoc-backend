const Doctor = require('../models/Doctor');
const Slot = require('../models/Slot');
const { allocateToken, getPriority } = require('../services/allocation.service');

exports.createDoctor = async(req,res)=>{
  const doc = await Doctor.create(req.body);
  res.json(doc);
};

exports.createSlot = async(req,res)=>{
  const slot = await Slot.create(req.body);
  res.json(slot);
};

exports.bookToken = async(req,res)=>{
  const { patientName, type, doctorId, slotId } = req.body;

  const tokenData = {
    patientName,
    type,
    priority: getPriority(type),
    doctor: doctorId,
    slot: slotId
  };

  const result = await allocateToken(slotId, tokenData);
  res.json(result);
};
