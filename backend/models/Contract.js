const mongoose = require('mongoose');
const contractSchema = new mongoose.Schema({
  contractNumber: String,
  startDate: Date,
  endDate: Date,
});
module.exports = mongoose.model('Contract', contractSchema);
