const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { complaintReport, complaintRaise } = require('../controllers/complaintController');

router.get('/records', complaintReport);

router.post('/form', complaintRaise);

module.exports = router;
