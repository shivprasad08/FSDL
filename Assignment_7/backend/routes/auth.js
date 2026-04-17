const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');


// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Login (no JWT, just return user info if credentials match)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
});


// Get current user (mock: always returns first user)
router.get('/me', async (req, res) => {
  const user = await User.findOne();
  res.json(user);
});

module.exports = router;
