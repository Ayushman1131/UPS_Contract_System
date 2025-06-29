const express = require('express');
const router = express.Router();
const { getMaintenanceRecords,raiseMaintenanceRequest }= require('../controllers/maintenanceController');

router.post('/form', raiseMaintenanceRequest);

router.get('/records', getMaintenanceRecords);

module.exports = router;
