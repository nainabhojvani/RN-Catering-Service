const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET /api/inquiries/contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
