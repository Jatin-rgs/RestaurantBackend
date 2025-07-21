const express = require("express");
const WaiterRequest = require("../Models/WaiterRequest.js");

const router = express.Router();

// GET all pending requests grouped by floor
router.get("/", async (req, res) => {
  try {
    const requests = await WaiterRequest.find({ status: "pending" });

    const grouped = {};
    for (const request of requests) {
      if (!grouped[request.floor]) {
        grouped[request.floor] = [];
      }
      grouped[request.floor].push(request);
    }

    res.status(200).json(grouped);
  } catch (error) {
    res.status(500).json({ message: "Error fetching waiter requests", error });
  }
});

// POST a new waiter request
router.post("/", async (req, res) => {
  try {
    const newRequest = await WaiterRequest.create(req.body);
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: "Failed to create waiter request", error });
  }
});

// PUT update request status (approve/reject)
router.put("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await WaiterRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status", error });
  }
});

// DELETE a request by ID (e.g. after completion)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await WaiterRequest.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({ message: "Request deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete request", error });
  }
});

module.exports = router;

