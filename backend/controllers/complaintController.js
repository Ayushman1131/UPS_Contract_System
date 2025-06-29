const Complaint = require('../models/Complaint');
const path = require('path');
const session = require('express-session');
// const User = require('../models/User');

exports.complaintRaise =  async (req, res) => {
  const emp_id = req.session?.user?.emp_id;
  
  res.sendFile(path.join(__dirname, '../../frontend/complaint.html'));
  const complaint = await Complaint.create(req.body);
  res.json(complaint);
};

exports.complaintReport = async (req, res) => {
	const complaints = await Complaint.find();
  res.json(complaints);
};