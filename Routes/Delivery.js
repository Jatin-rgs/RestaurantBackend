const express = require("express");
const router = express.Router();
const DeliveryExecutive = require("../models/DeliveryExecutive");

// Get all
router.get("/", async (req, res) => {
  const execs = await DeliveryExecutive.find();
  res.json(execs);
});

// Create
router.post("/", async (req, res) => {
  const newExec = new DeliveryExecutive(req.body);
  await newExec.save();
  res.json(newExec);
});

// Update
router.put("/:id", async (req, res) => {
  const updated = await DeliveryExecutive.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete("/:id", async (req, res) => {
  await DeliveryExecutive.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
