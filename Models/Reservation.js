const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  date: { type: Date, required: true },
  guests: { type: Number, default: 1 },
  notes: String,
});

module.exports = mongoose.model("Reservation", reservationSchema);
