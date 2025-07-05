const express = require('express');
const router = express.Router();
const { complaintReport, complaintRaise,complaintForm ,complaintID,complaintInbox,complaintReportpage} = require('../controllers/complaintController');

router.get('/records', complaintReport);

router.get('/form', complaintForm);

router.get('/reports', complaintReportpage);

router.post('/form', complaintRaise);

router.get('/complaint-id',complaintID);

router.get('/inbox',complaintInbox);

module.exports = router;
