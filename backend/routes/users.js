const express = require('express');
const router = express.Router();

const {
  getRecentUsers,
  getDashboardStatus,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  updateAddress
} = require('../controllers/userController');


// -----------------------------
// Middleware to check admin session
// -----------------------------
const checkAdminSession = (req, res, next) => {
  if (!req.session?.adminId) {
    return res.status(401).json({ message: 'Unauthorized - Admin login required' });
  }
  next();
};

// Get recent users
router.get('/recent', checkAdminSession, getRecentUsers);

// Dashboard status
router.get('/dashboard/status', checkAdminSession, getDashboardStatus);

// -----------------------------
// Middleware to check user session
// -----------------------------
const checkUserSession = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ message: 'Unauthorized - Please login' });
  }
  next();
};

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Logout failed' });

    // IMPORTANT: Must match express-session "name" in server.js
    res.clearCookie('sessionId');
    res.json({ message: 'Logged out successfully' });
  });
});

// GET user profile
router.get('/profile', checkUserSession, getUserProfile);

// UPDATE user profile
router.put('/me', checkUserSession, updateUserProfile);

// DELETE user profile
router.delete('/me', checkUserSession, deleteUserProfile);

// Add / Update shipping address
router.post("/update-address", checkUserSession, updateAddress);

module.exports = router;
