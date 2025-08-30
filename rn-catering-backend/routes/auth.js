const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmails");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/authMiddleware");
const router = express.Router();

// -----------------------------
// Check username availability
router.get("/check-username", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username)
      return res.status(400).json({ message: "Username required" });

    const user = await User.findOne({ username });
    res.json({ exists: !!user });
  } catch (err) {
    console.error("Username check error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Check email availability
router.get("/check-email", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    res.json({ exists: !!user });
  } catch (err) {
    console.error("Email check error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
// -----------------------------

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, fullName, email, password, confirmPassword } = req.body;

    if (!username || !fullName || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      verificationToken,
      isVerified: false,
    });

    await newUser.save();

    const verificationLink = `${process.env.SERVER_URL}/api/verify/${verificationToken}`;

    await sendEmail(
      email,
      "Verify Your RN Catering Account ✅",
      `<h2>Hello ${fullName},</h2>
       <p>Thank you for registering! Click the link below to verify your email:</p>
       <p><a href="${verificationLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #ffffff; 
               text-decoration: none; border-radius: 6px; font-weight: bold;">
         Verify Email
       </a></p>`,
    );

    res.status(201).json({
      message:
        "Registration successful! Check your email to verify your account. Check inbox/spam",
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(400).json({ message: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ user, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error. Try again later." });
  }
});

// VERIFY EMAIL
router.get("/verify/:token", async (req, res) => {
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

// ✅ PROFILE (Protected Route)
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password",
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/user/delete
router.delete("/user/delete", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    // Optionally, remove related bookings or other data here

    return res.status(200).json({ message: "Account deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error deleting account." });
  }
});

// PUT /api/user/edit
router.put("/user/edit", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, fullName, email } = req.body;

    // Optional: Validate incoming data here

    // Check if new email or username is already taken by another user
    const emailExists = await User.findOne({ email, _id: { $ne: userId } });
    if (emailExists) {
      return res.status(409).json({ message: "Email already in use." });
    }
    const usernameExists = await User.findOne({
      username,
      _id: { $ne: userId },
    });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already in use." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, fullName, email },
      { new: true, runValidators: true },
    ).select("-password");

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error updating profile." });
  }
});

// POST /api/user/change-password
router.post("/user/change-password", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match." });
    }

    const user = await User.findById(userId);
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password changed successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error changing password." });
  }
});

module.exports = router;
