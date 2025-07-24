const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json()); // Important to parse incoming JSON

// ✅ MongoDB Connection
mongoose.connect(
  "mongodb+srv://rnadmin:rnadmin@rn-catering.wkfishd.mongodb.net/?retryWrites=true&w=majority&appName=rn-catering",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => console.log("MongoDB connected"))
 .catch(err => console.log("MongoDB connection error:", err));

// ✅ Routes
const authRoutes = require("./routes/auth"); // Make sure this path exists
const contactRoutes = require('./routes/contact'); 
app.use('/api/contact', contactRoutes);
app.use("/api", authRoutes); // Your route should be like /api/register etc.

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
