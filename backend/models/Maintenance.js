const mongoose = require("mongoose");
const maintenanceSchema = new mongoose.Schema({
  asset_id: String,
  type: { type: String, enum: ["Preventive", "Breakdown"] },
  date: Date,
});
module.exports = mongoose.model("Maintenance", maintenanceSchema);
 