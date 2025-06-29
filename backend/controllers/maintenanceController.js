const Maintenance = require('../models/Maintenance');
const path = require('path');

exports.getMaintenanceRecords = async (req, res) => {
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

exports.raiseMaintenanceRequest = async (req, res) => {
	
	res.sendFile(path.join(__dirname, '../../frontend/preventive_maintenance.html'));
	
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