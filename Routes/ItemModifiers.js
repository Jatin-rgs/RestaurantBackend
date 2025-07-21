// routes/ItemModifiers.js
const express = require("express");
const router = express.Router();
const ItemModifier = require("../models/ItemModifier");

// CREATE
router.post("/", async (req, res) => {
  try {
    const newModifier = new ItemModifier(req.body);
    const savedModifier = await newModifier.save();
    res.status(201).json(savedModifier);
  } catch (error) {
    res.status(500).json({ message: "Error creating modifier", error });
  }
});

// READ (ALL)
router.get("/", async (req, res) => {
  try {
    const modifiers = await ItemModifier.find();
    res.status(200).json(modifiers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching modifiers", error });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await ItemModifier.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Modifier not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating modifier", error });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ItemModifier.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Modifier not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting modifier", error });
  }
});

module.exports = router;
