const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  tableNumber: String,
  area: String, // Lounge, Roof Top, Garden
  seats: Number,
  kotCount: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Available", "Running", "Reserved"],
    default: "Available"
  }
});

module.exports = mongoose.model("Table", tableSchema);
