const Product = require("../models/Product.js");
const Accessory = require("../models/Accessory.js");
const express = require("express");
const router = express.Router();

// -----------------------------
// Middleware to check user session
// -----------------------------
const checkUserSession = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: "Please login to continue" });
    }
    next();
};

router.post("/", async (req, res) => {
    try {
        const { itemId, refType, quantity } = req.body;
        const userId = req.session.userId;

        if (!itemId || !refType)
            return res.status(400).json({ error: "Invalid checkout data" });

        // Determine the correct collection
        let itemData;
        if (refType === "Product") {
            itemData = await Product.findById(itemId);
        } else if (refType === "Accessory") {
            itemData = await Accessory.findById(itemId);
        } else {
            return res.status(400).json({ error: "Invalid refType" });
        }

        if (!itemData)
            return res.status(404).json({ error: "Item not found" });

        // Save session for checkout
        req.session.buyNow = {
            userId,
            items: [
                {
                    refType: refType,
                    product: itemData._id,
                    title: itemData.title,
                    image: itemData.image,
                    price: itemData.price,
                    quantity: quantity,
                },
            ],
        };

        res.json({ success: true });
    } catch (err) {
        console.error("Checkout session error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/", (req, res) => {
    if (!req.session.buyNow)
        return res.status(404).json({ error: "No active checkout session" });

    res.json(req.session.buyNow);
});

router.delete("/", (req, res) => {
    delete req.session.buyNow;
    res.json({ success: true });
});

module.exports = router;
