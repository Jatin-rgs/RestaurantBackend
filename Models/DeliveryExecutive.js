const mongoose = require("mongoose");

const DeliveryExecutiveSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  totalOrders: { type: Number, default: 0 },
  status: { type: String, enum: ["AVAILABLE", "BUSY"], default: "AVAILABLE" },
});

module.exports = mongoose.model("DeliveryExecutive", DeliveryExecutiveSchema);
