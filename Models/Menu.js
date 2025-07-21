const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  isAvailable: { type: Boolean, default: true },
  showOnCustomerSite: { type: Boolean, default: false },
});

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: [MenuItemSchema],
});

module.exports = mongoose.models.Menu || mongoose.model('Menu', MenuSchema);

