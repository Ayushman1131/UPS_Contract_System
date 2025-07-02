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
		
		res.status(201).json("Maintenance request raised successfully: " + record);

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
  try {
    const emp_id = req.session?.user?.emp_id;
    if (!emp_id) {
      return res.status(403).send("Unauthorized access");
    }

    const records = await Maintenance.find();
    res.json(records);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
};



exports.updateMaintenanceRequest = async (req, res) => {
	try {
		const emp_id = req.session?.user?.emp_id;

		if (!emp_id) {
			return res.status(403).send("Unauthorized access");
		}

		const { id } = req.params;
		const record = await Maintenance.findByIdAndUpdate(id, req.body, { new: true });

		if (!record) {
			return res.status(404).send("Maintenance request not found");
		}

		res.json("Maintenance request updated successfully: " + record);
	} catch (error) {
		res.status(500).send("Server error: " + error.message);
	}
}