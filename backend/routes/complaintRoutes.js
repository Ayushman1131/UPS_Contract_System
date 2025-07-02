const express = require('express');
const router = express.Router();
const { complaintReport, complaintRaise,complaintForm ,complaintID} = require('../controllers/complaintController');
const Complaint = require('../models/Complaint');

router.get('/records', complaintReport);

router.get('/form', complaintForm)

router.post('/form', complaintRaise);

router.get('/complaint-id',complaintID);

module.exports = router;
