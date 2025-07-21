const express = require("express");
const router = express.Router();
const ModifierGroup = require("../Models/ModifierGroupModel");

// Get all groups
router.get("/", async (req, res) => {
  try {
    const groups = await ModifierGroup.find();
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new group
router.post("/", async (req, res) => {
  try {
    const group = new ModifierGroup(req.body);
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update group
router.put("/:id", async (req, res) => {
  try {
    const updated = await ModifierGroup.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete group
router.delete("/:id", async (req, res) => {
  try {
    await ModifierGroup.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router; // ✅ End here
