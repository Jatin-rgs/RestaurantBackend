const express = require("express");
const router = express.Router();
const Table = require("../Models/Table");

// Get all tables
router.get("/", async (req, res) => {
  const tables = await Table.find();
  res.json(tables);
});

// Add a table
router.post("/", async (req, res) => {
  const table = new Table(req.body);
  await table.save();
  res.status(201).json(table);
});

// Update table
router.put("/:id", async (req, res) => {
  const updated = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete table
router.delete("/:id", async (req, res) => {
  await Table.findByIdAndDelete(req.params.id);
  res.json({ message: "Table deleted" });
});



module.exports = router;
