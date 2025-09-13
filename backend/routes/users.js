const express = require('express');
const router = express.Router();
const { protectAdmin } = require('../middleware/authMiddleware');

const {
  getRecentUsers,
  getDashboardStatus
} = require('../controllers/userController');

// Get recent users
// GET /api/users/recent
router.get('/recent', protectAdmin, getRecentUsers);

// Dashboard status
// GET /api/users/dashboard/status
router.get('/dashboard/status', protectAdmin, getDashboardStatus);

module.exports = router;
