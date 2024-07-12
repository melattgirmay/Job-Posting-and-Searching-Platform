// Job-Posting-and-Searching-Platform\server\routes\signup.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/signup
router.post('/', async (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber, location, password, gender } = req.body;

  try {
    // Example query to insert user into MySQL database
    const [results, fields] = await db.execute('INSERT INTO users (firstName, middleName, lastName, email, phoneNumber, location, password, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstName, middleName, lastName, email, phoneNumber, location, password, gender]);

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Failed to register user' });
  }
});

module.exports = router;
