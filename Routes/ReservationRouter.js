const express = require("express");
const router = express.Router();
const Reservation = require("../models/Reservation");

router.get("/", async (req, res) => {
  try {
    const { start, end, search } = req.query;
    const query = {};

    if (start && end) {
      query.date = { $gte: new Date(start), $lte: new Date(end) };
    }

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { phone: new RegExp(search, "i") },
      ];
    }

    const reservations = await Reservation.find(query).sort({ date: 1 });
    res.status(200).json(reservations);
  } catch (err) {
    console.error("Error fetching reservations:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    console.error("Error creating reservation:", err);
    res.status(400).json({ message: "Creation failed" });
  }
});

module.exports = router;
