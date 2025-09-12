const express = require('express');
const router = express.Router();
const User = require('../models/User'); // your user model
const { protectAdmin } = require('../middleware/authMiddleware'); 

router.get('/recent', protectAdmin, async (req, res) => {
  try {
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .select('name email mobile createdAt');

   // console.log('Fetched users:', users); // <-- debug
    res.json(users);
  } catch (err) {
    console.error('Error fetching recent users:', err); // <-- debug
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
