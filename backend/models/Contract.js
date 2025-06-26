const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  Contract_ID: String,
  StartDate: Date,
  EndDate: Date,
  Vendor: Sting,
  Equipment_Category: String,
  Quantity: String,
  Duration_Months: Number,
  Maintenance_Type: String,
  Remarks: String 
},{collection: "contracts"});

module.exports = mongoose.model('Contract', contractSchema);
  