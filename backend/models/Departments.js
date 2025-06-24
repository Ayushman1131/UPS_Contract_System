const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
  dept_id: Number,
  name: String,
  total_assets: Number,
});

module.exports = mongoose.model("Departments", departmentSchema);