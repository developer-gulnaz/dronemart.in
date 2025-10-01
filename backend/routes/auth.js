const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');
const { registerUser, loginUserSession } = require('../controllers/userController');

// Admin login (can keep JWT or session, optional)
router.post('/login', loginAdmin);

// User registration
router.post('/register', registerUser);

// User login (session-based)
router.post('/userLogin', loginUserSession);

// User logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie('sessionId'); // cookie name from server.js
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;
