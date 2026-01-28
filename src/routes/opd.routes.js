const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/opd.controller');
const  Doctor = require('../models/Doctor');
const Slot = require("../models/Slot")
router.post('/doctor', ctrl.createDoctor);
router.post('/slot', ctrl.createSlot);
router.post('/token/book', ctrl.bookToken);
// Health check
router.get('/ping', (req, res) => {
    res.send('OPD OK');
});

// Simulate OPD day
router.post('/simulate/day', (req, res) => {
    const { doctors, slotsPerDoctor, patients } = req.body;

    // Just a basic example simulation
    const result = {};
    doctors.forEach((docId) => {
        result[docId] = {};
        for (let i = 0; i < slotsPerDoctor; i++) {
            const slotName = `slot${i+1}`;
            result[docId][slotName] = patients; // simple placeholder allocation
        }
    });

    res.json(result);
});



// Get Slot Status
router.get('/slot/status/:slotId', async (req, res) => {
    try {
        const slot = await Slot.findById(req.params.slotId).lean();
        if (!slot) return res.status(404).json({ error: "Slot not found" });
        res.json(slot);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Doctor Status
router.get('/doctor/status/:doctorId', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId)
            .populate('slots')
            .lean();
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });
        res.json({ doctorId: doctor._id, slots: doctor.slots });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




module.exports = router;   // 🔴 THIS LINE IS CRITICAL
