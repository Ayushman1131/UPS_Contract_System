const mongoose = require("mongoose");

const billSchema= new mongoose.Schema({
  Asset_No: {
    type: String,
    ref: "boq",
  },
  Contract_ID: 
  {
    type: String,
    ref: "Contract",
  },
  Department: String,
  Location: String,
  Rating: String,
  Serial_N: String,
});

module.exports = mongoose.model("Bill", billSchema);
