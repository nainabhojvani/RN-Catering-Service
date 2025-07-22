// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

router.post('/', async (req, res) => {
  try {
    const { name, email, eventName, phone, message } = req.body;

    const newContact = new Contact({ name, email, eventName, phone, message });
    await newContact.save();

    res.status(201).json({ message: 'Contact message saved successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
