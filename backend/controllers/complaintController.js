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
    max_no: req.body.max_no,
    mobile_no: req.body.mobile_no,
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

exports.complaintReportpage = async (req, res) => {
  res.sendFile(path.join(__dirname, '..','..','frontend','Complaint_Report.html'));
}

exports.complaintID = async (req, res) => {
  try {
    const complaint_id = await generateNextComplaintId();
    res.json({ complaint_id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.complaintReport = async (req, res) => {
	
  const userZone = req.session?.user?.zone;
  const complaints = await Complaint.find({ zone: userZone });  
  if (complaints.length === 0) {
    return res.status(404).json({ message: 'No complaint records found' });
}
  res.json(complaints);
};

exports.updateStatus = async (req, res) => {
  try {
    const cmpId = req.body.cmp_id;		
    const record = await Maintenance.findOneAndUpdate(
      {complaint_id:cmpId},
      req.body.Status,
      { new: true }
    );

    if (!record) {
      return res.status(404).send("Maintenance request not found");
    }
    
    res.json("Maintenance request updated successfully: " + record);
  } catch (error) {
    res.status(500).send("Server error: " + error.message);
  }
}

exports.complaintInbox = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    if (complaints.length === 0) {
      return res.status(404).json({ message: 'No complaint records found.' });
      }
    res.json(complaints);
  } catch (error) {
    console.error("Error fetching complaint inbox:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}