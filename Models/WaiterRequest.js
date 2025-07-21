// backend/Models/WaiterRequest.js

const mongoose = require("mongoose");

const WaiterRequestSchema = new mongoose.Schema({
  tableNumber: String,
  floor: String,
  status: { type: String, enum: ["pending", "resolved"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("WaiterRequest", WaiterRequestSchema);
