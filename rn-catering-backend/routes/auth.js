const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmails");
const jwt = require("jsonwebtoken");
const router = express.Router();

// -----------------------------
// Check username availability
router.get("/check-username", async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ message: "Username required" });

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
      return res.status(400).json({ message: "Username or email already exists" });

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
       <p><a href="${verificationLink}" target="_blank" style="color: blue; text-decoration: underline;">
         Verify Email
       </a></p>`
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

module.exports = router;
