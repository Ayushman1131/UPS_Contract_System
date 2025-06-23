const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
  complaint_id: String,
  asset_number: String,
  contractId: String,
  boq_item_id: Number,
  location: String,
  zone: String,
  raised_by: String,
  status: String,
  feedback: String
}, {collection: "complaints"});
module.exports = mongoose.model('Complaint', complaintSchema);
