require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // Important to parse incoming JSON

// ✅ MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://rnadmin:rnadmin@rn-catering.wkfishd.mongodb.net/?retryWrites=true&w=majority&appName=rn-catering",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require("./routes/auth");     // Handles /register, /login, /profile
const contactRoutes = require("./routes/contact"); // Handles /contact form submission

app.use("/api", authRoutes);           // /api/register, /api/login, /api/profile
app.use("/api/contact", contactRoutes); // /api/contact/send or whatever you defined

// ✅ Server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
