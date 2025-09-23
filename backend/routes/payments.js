// routes/payments.js
const express = require("express");
const Payment = require("../models/Payment");
const router = express.Router();

// GET payment details by orderId
router.get("/:orderId", async (req, res) => {
  try {
    const payment = await Payment.findOne({ order: req.params.orderId });
    if (!payment) return res.status(404).json({ message: "Payment not found" });
    res.json(payment);
  } catch (err) {
    console.error("Payment fetch error:", err);
    res.status(500).json({ message: "Failed to fetch payment" });
  }
});

module.exports = router;
