const Complaint = require('../models/Complaint');
const path = require('path');
const session = require('express-session');
const { generateNextComplaintId }= require('../utils/generationID');

exports.complaintRaise =  async (req, res) => {
  const emp_id = req.session?.user?.emp_id;
  const complaint = new Complaint({
    emp_id: emp_id,
    complaint_id: req.body.complaint_id,
    asset_number: req.body.asset_number,
    location: req.body.location,
    boq_item_id: req.body.boq_item_id,
    category: req.body.category,
    date: req.body.date,
    department: req.body.department,
    contact: req.body.contact,
    description: req.body.description,
    feedback: req.body.feedback,
    raised_by: req.body.raised_by,
    ratings: req.body.ratings,
    zone: req.body.zone
  });
  await complaint.save();
  res.json(complaint);
};

exports.complaintForm = async (req, res) => {
  res.sendFile(path.join(__dirname, '..','..','frontend','complaint.html'));
};

exports.complaintID = async (req, res) => {
  try {
    const complaint_id = await generateNextComplaintId();
    res.json({ complaint_id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.complaintReport = async (req, res) => {
	const complaints = await Complaint.find();
  res.json(complaints);
};