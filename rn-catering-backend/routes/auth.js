const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const verifyToken = require("../middleware/authMiddleware");

const JWT_SECRET = process.env.JWT_SECRET;

// ✅ SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { username, fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ LOGIN with email or username
router.post("/login", async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);

    res.json({
      token,
      user: {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
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
