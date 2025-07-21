const express = require("express");
const router = express.Router();
const DeliveryExecutive = require("../Models/DeliveryExecutive");

// Get all executives
router.get("/", async (req, res) => {
  try {
    const executives = await DeliveryExecutive.find();
    res.json(executives);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new executive
router.post("/", async (req, res) => {
  try {
    const exec = new DeliveryExecutive(req.body);
    await exec.save();
    res.status(201).json(exec);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update executive
router.put("/:id", async (req, res) => {
  try {
    const updated = await DeliveryExecutive.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete executive
router.delete("/:id", async (req, res) => {
  try {
    await DeliveryExecutive.findByIdAndDelete(req.params.id);
    res.json({ message: "Executive deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
