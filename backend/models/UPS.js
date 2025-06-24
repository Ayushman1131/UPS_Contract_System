const mongoose = require("mongoose");

const UPS = new mongoose.Schema({
  Asset_No: String,
  Contract_ID: String,
  Department: String,
  Location: String,
  Rating: String,
  Serial_N: String,
});

module.exports = mongoose.model("UPS", upsSchema);
