const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, default: "Waiter" },
});

module.exports = mongoose.model("Staff", staffSchema);
