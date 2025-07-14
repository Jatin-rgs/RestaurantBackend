const express = require("express");
const router = express.Router();
const Area = require("../Models/Area");
const Table = require("../Models/Table");

// Get all areas with table count
router.get("/with-table-count", async (req, res) => {
  try {
    const areas = await Area.find();
    const areasWithTableCount = await Promise.all(
      areas.map(async (area) => {
        const count = await Table.countDocuments({ area: area.name });
        return { ...area.toObject(), tableCount: count };
      })
    );
    res.json(areasWithTableCount);
  } catch (err) {
    console.error("Error fetching areas with table count", err);
    res.status(500).json({ message: "Failed to fetch areas" });
  }
});

// Add a new area
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Area.findOne({ name });
    if (existing) return res.status(400).json({ message: "Area already exists" });

    const area = new Area({ name });
    await area.save();
    res.status(201).json(area);
  } catch (err) {
    res.status(500).json({ message: "Failed to create area" });
  }
});

// ✅ NEW: Update area
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Area.findOne({ name, _id: { $ne: req.params.id } });
    if (existing) return res.status(400).json({ message: "Area with this name already exists" });

    const updated = await Area.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!updated) return res.status(404).json({ message: "Area not found" });

    res.json(updated);
  } catch (err) {
    console.error("Error updating area", err);
    res.status(500).json({ message: "Failed to update area" });
  }
});

// Delete area
router.delete("/:id", async (req, res) => {
  try {
    await Area.findByIdAndDelete(req.params.id);
    res.json({ message: "Area deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete area" });
  }
});

module.exports = router;
