const express = require('express');
const router = express.Router();
const { loginAdmin } = require('../controllers/authController');
const { registerUser, loginUserSession } = require('../controllers/userController');
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");

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


// ----------------------------
// 1️⃣ Request OTP (Send Email)
// ----------------------------
router.post("/requestReset", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOTP = crypto.createHash("sha256").update(otp).digest("hex");
    user.resetOTPExpires = Date.now() + 5 * 60 * 1000; // 5 min expiry
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Dronemart Support" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error("Request Reset OTP Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------------------
// 2️⃣ Verify OTP
// ----------------------------
router.post("/verifyReset", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    if (!user.resetOTP || user.resetOTP !== hashedOTP || user.resetOTPExpires < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ----------------------------
// 3️⃣ Reset Password
// ----------------------------
router.post("/resetPassword", async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = undefined;
    user.resetOTPExpires = undefined;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset Password Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


module.exports = router;
