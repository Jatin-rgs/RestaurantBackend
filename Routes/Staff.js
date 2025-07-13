const express = require("express");
const router = express.Router();
const Staff = require("../models/Staff");

// ✅ Get all staff
router.get("/", async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch staff" });
  }
});

// ✅ Add new staff
router.post("/", async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const newStaff = new Staff({ name, email, role });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(500).json({ message: "Failed to add staff" });
  }
});

// ✅ Update staff (name, email, role)
router.put("/:id", async (req, res) => {
  const { name, email, role } = req.body;
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    );
    res.status(200).json(updatedStaff);
  } catch (err) {
    res.status(500).json({ message: "Failed to update staff" });
  }
});

// ✅ Delete staff
router.delete("/:id", async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete staff" });
  }
});

module.exports = router;
