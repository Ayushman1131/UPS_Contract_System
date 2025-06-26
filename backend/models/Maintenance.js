const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  pm_id: String,
  boq_item_id: String,
  location: String,
  emp_id: Number,
  pm_date: String,
  pm_done_by: String,
  checklist: {
    functional_checking: Boolean,
    redundancy_healthiness: Boolean,
    battery_takeover: Boolean,
    static_bypass_changeover: Boolean,
    protection_checking: Boolean,
    cleaning_done: Boolean,
    physical_damage: Boolean,
    panel_locked: Boolean,
    all_igbts_checked: Boolean,
    cooling_fans_ok: Boolean,
    safety_gear_used: Boolean
  },
  readings: { 
    ac_input_voltage: Array, 
    ac_input_current: Array,
    output_voltage: Number,
    output_current: Number,
    battery_voltage: Number,
    charging_current: Number,
    backup_minutes: Number,
  },
  spares_replaced: Boolean,
  remarks: String
},{collection:"preventive_maintenance"});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
