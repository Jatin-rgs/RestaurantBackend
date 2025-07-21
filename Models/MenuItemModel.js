// Models/MenuItemModel.js
const mongoose = require('mongoose');

const variationSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  menuName: String,
  category: String,
  isAvailable: Boolean,
  showOnCustomerSite: Boolean,
  imageUrl: String,
  variations: [variationSchema],
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
