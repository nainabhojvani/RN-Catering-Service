require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sendEmail = require("./utils/sendEmails.js");
const User = require("./models/User"); // Add this import

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");
const reviewRoutes = require("./routes/reviewRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes.js");
const inquiriesRoutes = require("./routes/inquiryRoutes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Test email
app.get("/test-mail", async (req, res) => {
  try {
    await sendEmail(
      "rutvajadav1415@gmail.com",
      "SMTP Test ✅",
      "<h2>If you see this, SMTP works!</h2>"
    );
    res.send("Mail sent successfully ✅");
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).send("Mail send failed ❌: " + err.message);
  }
});

// Verification route
app.get("/api/verify/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).send("Invalid or expired token.");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    return res.redirect(`${process.env.CLIENT_URL}/verified-success`);
  } catch (err) {
    console.error("Email verification error:", err);
    return res.status(500).send("Something went wrong.");
  }
});

// API routes
app.use("/api/bookings", bookingRoutes);
app.use("/api", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inquiries", inquiriesRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});