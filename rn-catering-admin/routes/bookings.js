const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// GET all bookings (for admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error("Failed to fetch bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// PATCH / update booking (admin can edit noOfGuests, finalPrice, paymentStatus)
router.patch("/:id", async (req, res) => {
  const { noOfGuests, finalPrice, paymentStatus } = req.body;
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });

    if (noOfGuests !== undefined) booking.noOfGuests = noOfGuests;
    if (finalPrice !== undefined) booking.finalPrice = finalPrice;
    if (paymentStatus !== undefined) booking.paymentStatus = paymentStatus;

    await booking.save();
    res.json({ success: true, booking });
  } catch (err) {
    console.error("Failed to update booking:", err);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

module.exports = router;
