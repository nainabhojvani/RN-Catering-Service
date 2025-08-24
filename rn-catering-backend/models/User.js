const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },  // ✅ email verified flag
  verificationToken: { type: String }             // ✅ store token
});

module.exports = mongoose.model("User", userSchema);
