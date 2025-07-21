const mongoose = require("mongoose");

const modifierOptionSchema = new mongoose.Schema({
  name: String,
  price: Number,
});

const modifierGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  options: [modifierOptionSchema],
});

module.exports = mongoose.model("ModifierGroup", modifierGroupSchema);
