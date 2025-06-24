const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
    asset_number : String,
    boq_item_id : Number,
    category : String,
    complaint_id : String,
    date : Date,
    department : String,
    description : String,
    feedback : String,
    location : String,
    raised_by : String,
    status : String,
    zone : String,
}, {collection: "complaints"});

module.exports = mongoose.model('Complaint', complaintSchema);
