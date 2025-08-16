const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    event: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String },
    mealPlan: { type: Object, required: true }, // save full meal plan object
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
