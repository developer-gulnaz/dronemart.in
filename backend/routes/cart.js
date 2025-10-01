const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const mongoose = require("mongoose");

// -----------------------------
// Middleware to check user session
// -----------------------------
const checkUserSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Please login to continue" });
  }
  next();
};

// Get cart with product details
router.get("/", checkUserSession, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.session.userId }).populate("items.product");

    if (!cart) {
      cart = new Cart({ user: req.session.userId, items: [] });
      await cart.save();
    }

    // Map items safely to include product info for frontend
    const cartWithDetails = {
      ...cart.toObject(),
      items: cart.items
        .filter(item => item.product) // Skip null/deleted products
        .map(item => ({
          _id: item._id,
          product: item.product._id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity || 1
        }))
    };

    res.json(cartWithDetails);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// Add to cart
// -----------------------------
router.post("/", checkUserSession, async (req, res) => {
  try {
    const { product } = req.body;
    if (!product) return res.status(400).json({ message: "Product ID missing" });

    let cart = await Cart.findOne({ user: req.session.userId });
    if (!cart) cart = new Cart({ user: req.session.userId, items: [] });

    const exists = cart.items.find(item => item.product.toString() === product);
    if (exists) {
      return res.status(400).json({ message: "Item already in cart" });
    }
    cart.items.push({ product });

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Update cart item quantity
router.put("/:productId", checkUserSession, async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.session.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // Update quantity
    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    // Populate product details
    cart = await cart.populate("items.product");

    // Map items for frontend
    const cartWithDetails = {
      ...cart.toObject(),
      items: cart.items
        .filter(item => item.product)
        .map(item => ({
          _id: item._id,
          product: item.product._id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity
        }))
    };

    res.json(cartWithDetails);
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from cart
router.delete("/:productId", checkUserSession, async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.session.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    // Populate product details
    cart = await cart.populate("items.product");

    const cartWithDetails = {
      ...cart.toObject(),
      items: cart.items
        .filter(item => item.product)
        .map(item => ({
          _id: item._id,
          product: item.product._id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity
        }))
    };

    res.json(cartWithDetails);
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
