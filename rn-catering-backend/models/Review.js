// models/Review.js
const mongoose = require("mongoose");
const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // e.g., Wedding, Birthday
    text: { type: String, required: true },
  },
  { timestamps: true }, // createdAt, updatedAt
);

module.exports = mongoose.model("Review", reviewSchema);
