const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

// -----------------------------
// Middleware to check user session
// -----------------------------
const checkUserSession = (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Please login to continue" });
  }
  next();
};


// -----------------------------
// Get wishlist
// -----------------------------
router.get("/", checkUserSession, async (req, res) => {
  try {
    // ✅ Populate using refPath automatically
    let wishlist = await Wishlist.findOne({ user: req.session.userId })
      .populate({
        path: "items.product",
        // Mongoose will detect model (Product or Accessory) from refType
      });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.session.userId, items: [] });
      await wishlist.save();
    }

    // ✅ Map items safely to include product or accessory info for frontend
    const wishlistWithDetails = {
      ...wishlist.toObject(),
      items: wishlist.items
        .filter(item => item.product) // skip deleted references
        .map(item => ({
          _id: item._id,
          refType: item.refType, // Product or Accessory
          product: item.product._id,
          title: item.product.title,
          price: item.product.price,
          image: item.product.image,
          quantity: item.quantity || 1,
        })),
    };

    res.json(wishlistWithDetails);
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// -----------------------------
// Add to wishlist
// -----------------------------
router.post("/", checkUserSession, async (req, res) => {
  try {
    const { product, refType } = req.body;

    if (!product) return res.status(400).json({ message: "Product ID missing" });
    if (!refType || !["Product", "Accessory"].includes(refType))
      return res.status(400).json({ message: "Invalid or missing refType" });

    let wishlist = await Wishlist.findOne({ user: req.session.userId });
    if (!wishlist) wishlist = new Wishlist({ user: req.session.userId, items: [] });

    // ✅ Check duplicates based on product + refType
    const exists = wishlist.items.find(
      item =>
        item.product.toString() === product &&
        item.refType === refType
    );
    if (exists) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    // ✅ Add correct refType
    wishlist.items.push({ product, refType });

    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// -----------------------------
// Remove from wishlist
// -----------------------------
router.delete("/:productId", checkUserSession, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.session.userId },
      { $pull: { items: { product: req.params.productId } } }, // remove product from items array
      { new: true } // return updated document
    );

    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    res.json(wishlist);
  } catch (err) {
    console.error("Error removing wishlist item:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// -----------------------------
// Clear wishlist
// -----------------------------
router.delete("/", checkUserSession, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.session.userId });
    if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

    wishlist.items = [];
    await wishlist.save();
    res.json(wishlist);
  } catch (err) {
    console.error("Error clearing wishlist:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
