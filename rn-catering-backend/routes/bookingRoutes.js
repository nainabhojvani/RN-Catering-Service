const express = require("express");
const Booking = require("../models/Booking");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// POST /api/bookings
router.post("/", verifyToken, async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      user: req.user.id, // 👈 attach logged-in user
    });

    await booking.save();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/my", verifyToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user bookings" });
  }
});

module.exports = router;
