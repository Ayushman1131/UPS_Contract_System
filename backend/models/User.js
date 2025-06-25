const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    login: {
      emp_id: Number,
      name: String,
      password: String,
    },
    role: String,
    zone: String,
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
