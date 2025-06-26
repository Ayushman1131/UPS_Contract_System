const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { complaintReport, complaintRaise } = require('../controllers/complaintController');

// router.post('/', 

// router.get('/:id', complainReport);

// router.get('/', async (req, res) => {
//   const complaints = await Complaint.find();
//   res.json(complaints);
// });
router.get('/', complaintReport);
router.post('/complaintraise', complaintRaise);

router.put('/:id', async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.get('/byContract/:contractId', async (req, res) => {
  const complaints = await Complaint.find({ contractId: req.params.contractId });
  res.json(complaints);
});

module.exports = router;
