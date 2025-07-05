const express = require('express');
const router = express.Router();
const { maintenanceReports,maintenanceRaise,maintenanceForm, maintenanceID,updateStatus,maintenanceVerificationpage,
	maintenanceApprovalpage,getVerifiedDetails, maintenanceReportpage}= require('../controllers/maintenanceController');

router.get('/records', maintenanceReports);  // Report based on zone

router.get('/reports', maintenanceReportpage);  // Page for maintenance report

router.get('/form', maintenanceForm);		// Form to raise maintenance request

router.post('/form', maintenanceRaise);  // Raise maintenance request	

router.get('/maintenance-id', maintenanceID);		// Get next maintenance ID

router.get('/approval', maintenanceApprovalpage);	// Page for PM Approval

router.get('/verified', getVerifiedDetails);		// Get verified maintenance records

// router.post('/approval', maintenanceApproval)  	// Approve or reject PM request

router.get('/verification', maintenanceVerificationpage); 	// Page for PM Verification

router.put('/update-status', updateStatus);  	// Update status of PM request

module.exports = router;
