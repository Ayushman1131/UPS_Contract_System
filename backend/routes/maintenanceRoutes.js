const express = require('express');
const router = express.Router();
const { maintenanceReports,maintenanceRaise,maintenanceForm, maintenanceID }= require('../controllers/maintenanceController');
const Maintenance = require('../models/Maintenance');

router.get('/records', maintenanceReports);

router.get('/form', maintenanceForm);

router.post('/form', maintenanceRaise);

router.get('/maintenance-id', maintenanceID);

module.exports = router;
