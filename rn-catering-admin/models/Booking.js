const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    event: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String },
    mealPlan: { type: Object, required: true },

    // Admin editable fields
    noOfGuests: { type: Number, default: 0 },
    finalPrice: { type: Number, default: 0 },
    paymentStatus: { type: String, default: "Pending" }, // Pending / Completed / Paid
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
