const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema({
  pm_id: String,
  boq_item_id: String,
  location: String,
  zone: String,
  pm_date: String,
  pm_done_by: String,
  quarter: Number,
  verified_by: {
    type: Number,
    default: 0,
  },
  approved_by:{
    type: Number,
    default: 0
  },
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
    ac_input_voltage: String,
    ac_input_current: String,
    input_frequency: Number,
    dc_rectifier_output_current: Number,
    dc_smps_voltages: Number,
    ac_smps_voltages: Number,
    ac_output_voltage: Number,
    ac_output_current: Number,
    output_frequency: Number,
    battery_voltage_current: Number,
    aux_input_current: String,
    aux_input_voltage: String,
    aux_output_voltage: Number,
    aux_output_current: Number,
    aux_input_frequency: Number,
    battery_backup_time: Number,
    battery_data: String
  },
  spares_replaced: Boolean,
  remarks: String,
  approved: {
    type: Boolean,
    default: false
  },
  verified: {
    type: Boolean,
    default: false
  },
},{collection: "preventive_maintenance"});

module.exports = mongoose.model("Maintenance", maintenanceSchema);
