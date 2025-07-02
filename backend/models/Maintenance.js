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
    tightness: Boolean,
    physical_damage: Boolean,
    working_of_contractors: Boolean,
    all_thyristors: Boolean,
    all_igbts : Boolean,
    diodes_and_capacitors: Boolean,
    indication_lamps: Boolean,
    cooling_fans: Boolean,
    panel_locking: Boolean,
    switches_checking: Boolean,
    maintenance_of_distibution_boards: Boolean,
    connecting_cables: Boolean,
    panel_meters: Boolean,
    PPE: Boolean,
    tools: Boolean,
    surroundings: Boolean,
    work_prermit: Boolean,
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
