const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// -----------------------------
// Middleware
// -----------------------------
const checkUserSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Unauthorized - Please login" });
  }
  next();
};

const checkAdminSession = (req, res, next) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: "Unauthorized - Admin login required" });
  }
  next();
};


// -----------------------------
// USER ROUTES
// -----------------------------

// Get logged-in user's orders
router.get("/my", checkUserSession, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.session.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new order
router.post("/", checkUserSession, async (req, res) => {
  try {
    const { products, total, shippingAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    const order = new Order({
      user: req.session.userId,
      products: products.map(p => ({
        product: p.product,
        title: p.title,
        image: p.image,
        price: p.price,
        quantity: p.quantity || 1,
      })),
      total,
      shippingAddress,
      paymentMethod,
      status: "Pending",
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get order by ID
router.get("/:id", checkUserSession, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order && order.user.toString() === req.session.userId.toString()) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (err) {
    console.error("Error fetching order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Cancel order
router.delete("/:id", checkUserSession, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.session.userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await order.deleteOne();
    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// ADMIN ROUTES
// -----------------------------

// Get all orders
router.get("/", checkAdminSession, async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "firstName lastName email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update order status
router.put("/:id/status", checkAdminSession, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete order (admin override)
router.delete("/:id/admin", checkAdminSession, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.deleteOne();
    res.json({ message: "Order deleted by admin" });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
