// routes/accessories.js
const express = require('express');
const router = express.Router();
const Accessory = require('../models/Accessory');

// GET /api/accessories?keyword=agriculture
router.get('/', async (req, res) => {
    try {
        const { productId, productCategory } = req.query;
        let accessories = [];

        if (productId) {
            accessories = await Accessory.find({ productId });
        } else if (productCategory) {
            accessories = await Accessory.find({ productCategory });
        }

        res.json(accessories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
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
