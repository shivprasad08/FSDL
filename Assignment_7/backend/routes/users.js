const express = require('express');
const router = express.Router();
const User = require('../models/User');



// All users (no auth, allow all)
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});


// Update role (no auth, allow all)
router.patch('/:id/role', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.role = req.body.role;
  await user.save();
  res.json(user);
});

module.exports = router;
