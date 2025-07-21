// models/ItemModifier.js
const mongoose = require("mongoose");

const ItemModifierSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  modifierGroup: { type: String, required: true },
  isRequired: { type: Boolean, default: false },
  allowMultiple: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("ItemModifier", ItemModifierSchema);
