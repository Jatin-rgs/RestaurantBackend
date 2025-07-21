const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");
const Customer = require("../Models/Customer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// 🔹 Get all customers
router.get("/", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

// 🔹 Add a customer
router.post("/", async (req, res) => {
  const { name, email, phone, address } = req.body;
  const customer = new Customer({ name, email, phone, address });
  await customer.save();
  res.json(customer);
});

// 🔹 Update customer
router.put("/:id", async (req, res) => {
  const { name, email, phone, address } = req.body;
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    { name, email, phone, address },
    { new: true }
  );
  res.json(updated);
});

// 🔹 Delete customer
router.delete("/:id", async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer deleted" });
});

// 🔹 Export Customers
router.get("/export", async (req, res) => {
  try {
    const customers = await Customer.find().select("-__v");
    const json2csv = new Parser();
    const csvData = json2csv.parse(customers);
    res.header("Content-Type", "text/csv");
    res.attachment("customers.csv");
    res.send(csvData);
  } catch (err) {
    res.status(500).json({ error: "Failed to export data" });
  }
});

// 🔹 Import Customers
router.post("/import", upload.single("file"), async (req, res) => {
  const filePath = req.file.path;
  const customers = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => customers.push(row))
    .on("end", async () => {
      try {
        await Customer.insertMany(customers);
        fs.unlinkSync(filePath);
        res.status(200).json({ message: "Imported successfully" });
      } catch (err) {
        res.status(500).json({ error: "Failed to import" });
      }
    });
});

module.exports = router;
