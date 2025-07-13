const mongoose = require("mongoose");

const DeliveryExecutiveSchema = new mongoose.Schema({
  name: String,
  phone: String,
  orders: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "AVAILABLE",
  },
});

module.exports = mongoose.model("DeliveryExecutive", DeliveryExecutiveSchema);
