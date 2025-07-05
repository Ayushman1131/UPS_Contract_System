const Maintenance = require('../models/Maintenance');
const path = require('path');
const session = require('express-session');
const { generateNextMaintenanceId } = require('../utils/generationID');

exports.maintenanceRaise = async (req, res) => {
	try {
		const emp_id = req.session?.user?.emp_id;
		const record = await Maintenance.create({
			emp_id: emp_id,
			...req.body});
		
		res.status(201).json(`Maintenance request raised successfully with ID: ${req.body.maintenance_id}`);

	} catch (error) {
		res.status(500).send("Server error: " + error.message);
	}
};

exports.maintenanceForm = async (req, res) => {
	res.sendFile(path.join(__dirname, '../../', 'frontend', 'preventive_maintenance.html'));
};

exports.maintenanceID = async (req, res) => {
	try {
		const maintenance_id = await generateNextMaintenanceId();
		res.json({ maintenance_id });
	} catch (error) {
		res.status(500).json({ message: "Internal server error" });
	}
}


exports.maintenanceReports = async (req, res) => {
	const userZone = req.session?.user?.zone;
	const records = await Maintenance.find({zone: userZone});
	
	if (records.length === 0) {
  return res.status(404).json({ message: 'No maintenance records found for your zone.' });
		}
	res.json(records);
};

exports.maintenanceReportpage = async (req, res) => {
	res.sendFile(path.join(__dirname,'..','..', 'frontend', 'Maintenance_Report.html'));
}

exports.maintenanceApprovalpage = async (req, res) => {
	res.sendFile(path.join(__dirname,'..','..', 'frontend', 'PM_Approval.html'));
}

exports.maintenanceVerificationpage = async (req, res) => {
	res.sendFile(path.join(__dirname,'..','..', 'frontend', 'PM_Verification.html'));
}

exports.getVerifiedDetails = async (req, res) => {
  const userZone = req.session?.user?.zone;

  try {
    const records = await Maintenance.find({
      zone: userZone,
      verified: true,
      $or: [
        { approved: false },
        { approved: { $exists: false } }
      ]
    });

    if (records.length === 0) {
      return res.json('No verified maintenance records found for your zone.');
    }

    res.json(records);
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
};


exports.updateStatus = async (req, res) => {
	try {
		const pmId = req.body.pm_id;		
		const record = await Maintenance.findOneAndUpdate(
			{ pm_id: pmId },
			{ $set: req.body },
			{ new: true }
		);

		if (!record) {
			return res.json("Maintenance request not found");
		}

		res.json(`Maintenance request updated successfully`);
	} catch (error) {
		res.status(500).send("Server error: " + error.message);
	}
}