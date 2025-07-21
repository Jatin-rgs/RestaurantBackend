const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({ name: String });
module.exports = mongoose.model('Category', CategorySchema);

// Models/ModifierGroup.js
const mongoose = require('mongoose');
const ModifierGroupSchema = new mongoose.Schema({
  name: String,
  options: [{ name: String, price: Number }]
});
module.exports = mongoose.model('ModifierGroup', ModifierGroupSchema);