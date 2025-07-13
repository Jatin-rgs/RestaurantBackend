const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  menu: { type: String, required: true }, // e.g., "North Indian Delights"
  image: { type: String }, // URL to image
  available: { type: Boolean, default: true },
  showOnCustomerSite: { type: Boolean, default: true }
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
