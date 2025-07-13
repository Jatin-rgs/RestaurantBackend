const express = require("express");
const router = express.Router();
const DeliveryExecutive = require("../models/DeliveryExecutive");

router.get("/", async (req, res) => {
  const executives = await DeliveryExecutive.find();
  res.json(executives);
});

router.post("/", async (req, res) => {
  const newExecutive = new DeliveryExecutive(req.body);
  await newExecutive.save();
  res.json(newExecutive);
});

router.delete("/:id", async (req, res) => {
  await DeliveryExecutive.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
