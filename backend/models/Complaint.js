const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    emp_id : Number,
    complaint_id : String,
    asset_number : String, //
    boq_item_id : Number, //
    date : Date, //
    max_no: Number,  //
    mobile_no: Number, //
    category : String, //
    department : String, //
    description : String, //
    location : String,  //
    ratings : String, //
    zone : String,  //
    status: { type: String, default: 'Open' } // Default status set to 'Pending'
}, {collection: "complaints"});

module.exports = mongoose.model('Complaint', complaintSchema);
