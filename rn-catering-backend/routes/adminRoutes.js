const express = require("express");
const Booking = require("../models/Booking"); // CommonJS require

const router = express.Router();

// GET all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find(); // fetch all bookings
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err });
  }
});

module.exports = router;
