const mongoose = require('mongoose');

const itemCategorySchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('ItemCategory', itemCategorySchema);
