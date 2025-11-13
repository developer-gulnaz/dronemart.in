const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

const {
  getRecentLeads,
  getAllUsers,
  getDashboardStatus,
  getUserProfile,
  updateUserProfile,
  deleteUser,
  updateAddress,
  updateUserStatus,
  changePassword
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
router.get('/recent', checkAdminSession, getRecentLeads);

router.get('/all', checkAdminSession, getAllUsers);

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
router.delete('/me', checkUserSession, deleteUser);

// Add / Update shipping address
router.post("/update-address", checkUserSession, updateAddress);

router.put("/change-password", checkUserSession, changePassword);

router.patch("/:id/status", checkAdminSession, updateUserStatus);

module.exports = router;
