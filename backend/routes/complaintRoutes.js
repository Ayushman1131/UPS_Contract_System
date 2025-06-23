const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');

router.post('/', async (req, res) => {
  const complaint = await Complaint.create(req.body);
  res.json(complaint);
});

router.get('/:id', async (req, res) => {
  const complaint = await Complaint.findby(req.params.id);
  res.json(complaint);
});

router.get('/', async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
});

router.put('/:id', async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.get('/byContract/:contractId', async (req, res) => {
  const complaints = await Complaint.find({ contractId: req.params.contractId });
  res.json(complaints);
});

module.exports = router;
