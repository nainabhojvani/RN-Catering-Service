const express = require("express");
const Review = require("../models/Review");
const router = express.Router();

// GET /api/reviews -> list all reviews (newest first)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// POST /api/reviews -> create a review
router.post("/", async (req, res) => {
  try {
    const { name, type, text } = req.body;
    if (!name || !type || !text) {
      return res.status(400).json({ error: "All fields required" });
    }
    const doc = await Review.create({ name, type, text });
    res.status(201).json(doc);
  } catch (err) {
    console.error("POST /api/reviews error:", err);
    res.status(500).json({ error: "Failed to submit review" });
  }
});

module.exports = router;
