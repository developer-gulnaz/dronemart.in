// routes/accessories.js
const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');

// GET /api/accessories?keyword=agriculture
router.get('/', async (req, res) => {
    try {
        const { productId, productCategory, brand } = req.query;
        const query = {};

        if (productId) {
            query.productId = productId;
        }

        if (productCategory) {
            query.productCategory = productCategory;
        }

        // ✅ Optional brand filter (used only when passed from frontend)
        if (brand) {
            query.brand = new RegExp(`^${brand}$`, 'i'); // Case-insensitive match
        }

        const accessories = await Accessory.find(query);

        res.status(200).json({
            success: true,
            count: accessories.length,
            data: accessories,
        });
    } catch (err) {
        console.error("Error fetching accessories:", err);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: err.message,
        });
    }
});


// GET accessory by slug
router.get('/slug/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const accessory = await Accessory.findOne({ slug });

        if (!accessory) {
            return res.status(404).json({ message: "Accessory not found" });
        }

        res.json({ accessory });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
