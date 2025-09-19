const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs'); // assuming passwords are hashed

// -----------------------------
// ADMIN LOGIN (SESSION)
// -----------------------------
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Save admin ID and type in session
    req.session.adminId = admin._id;
    req.session.userType = admin.userType;

    res.status(200).json({
      message: "Admin login successful",
      email: admin.email,
      userType: admin.userType
    });

  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// -----------------------------
// ADMIN LOGOUT
// -----------------------------
exports.logoutAdmin = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie('sessionId'); // matches cookie name in server.js
    res.json({ message: "Admin logged out successfully" });
  });
};
