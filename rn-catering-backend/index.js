require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // Important to parse incoming JSON

// ✅ MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require("./routes/auth"); // Handles /register, /login, /profile
const contactRoutes = require("./routes/contact"); // Handles /contact form submission
const reviewRoutes = require("./routes/reviewRoutes");
const bookingRoutes = require("./routes/bookingRoutes");import adminRoutes from "./routes/adminRoutes.js";

app.use("/api/bookings", bookingRoutes);
app.use("/api", authRoutes); // /api/register, /api/login, /api/profile
app.use("/api/contact", contactRoutes); // /api/contact/send or whatever you defined
app.use("/api/reviews", reviewRoutes);app.use("/api/admin", adminRoutes);

// ✅ Server
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
