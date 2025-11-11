// routes/accessories.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Accessory = require('../models/Accessory');


// -----------------------------
// Middleware
// -----------------------------
const checkAdminSession = (req, res, next) => {
    if (!req.session.adminId) {
        return res.status(401).json({ success: false, message: "Unauthorized - Admin login required" });
    }
    next();
};


// GET /api/accessory
router.get('/', async (req, res) => {
    try {
        const { productId, productCategory, brand, type, q } = req.query;
        const query = {};

        // Optional filters
        if (productId) query.productId = productId;
        if (productCategory) query.productCategory = productCategory;
        if (type) query.type = new RegExp(`^${type}$`, 'i'); // Case-insensitive type match

        // ✅ Handle multiple brands (array or single string)
        if (brand) {
            if (Array.isArray(brand)) {
                query.brand = { $in: brand.map(b => new RegExp(`^${b}$`, 'i')) };
            } else {
                query.brand = new RegExp(`^${brand}$`, 'i');
            }
        }

        // ✅ Optional text search
        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { keywords: { $regex: q, $options: 'i' } }
            ];
        }

        const accessories = await Accessory.find(query).sort({ createdAt: -1 });

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


router.get('/all', async (req, res) => {
    try {
        const accessory = await Accessory.find().sort({ createdAt: -1 });
        res.json(accessory);
    } catch (err) {
        console.error("Error fetching accessories:", err);
        res.status(500).json({ message: "Server error while fetching accessories" });
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

router.patch('/:id/stock', checkAdminSession, async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;

        if (stock == null || isNaN(stock) || stock < 0) {
            return res.status(400).json({ success: false, message: 'Invalid stock value' });
        }

        const accessory = await Accessory.findById(id);
        if (!accessory) return res.status(404).json({ success: false, message: 'Accessory not found' });

        accessory.stock = stock;
        await accessory.save();

        res.status(200).json({ success: true, message: 'Stock updated successfully', accessory });
    } catch (err) {
        console.error('Update stock error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


// =============================
// Delete Product
// =============================
router.delete("/:id", checkAdminSession, async (req, res) => {
    try {
        await Accessory.findByIdAndDelete(req.params.id);
        res.json({ message: "Accessory deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete accessory" });
    }
});

const formatPublicPath = (filePath) => {
    if (!filePath) return "";

    // Normalize path
    const clean = filePath.replace(/\\/g, "/");

    // Remove "/public" part so URL is correct
    return clean.replace(/^.*\/public/, "");
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "../public/assets/img/product/specialized";

        // DJI products
        if (req.body.brand === "DJI") folder = "../public/assets/img/product/dji";

        // Specialized categories
        else if (req.body.productCategory === "FPV" || req.body.productCategory === "Agriculture") {
            folder = "../public/assets/img/product/specialized";
        }

        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// ✅ Field configuration — matches your form structure
const uploadFields = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "thumbnails", maxCount: 10 },
    { name: "inTheBoxImage[]", maxCount: 10 } // supports your in-the-box uploads
]);

// =============================
// POST /api/accessory
// =============================
router.post("/", checkAdminSession, uploadFields, async (req, res) => {
    try {
        const {
            title,
            slug,
            type,
            brand,
            category,
            productCategory,
            price,
            salePrice,
            stock,
            inStock,
            description,
            shortDescription,
            specs,
            metaTitle,
            metaDescription,
            keywords
        } = req.body;

        // ✅ Safe specs parsing
        let parsedSpecs = specs;

        if (specs?.trim()) {
            try {
                parsedSpecs = JSON.parse(specs);
            } catch (e) {
                try {
                    parsedSpecs = eval("(" + specs + ")");
                } catch {
                    console.warn("⚠️ Could not parse specs, storing raw text");
                }
            }
        }


        // ✅ Parse In-the-Box items
        const inTheBox = [];
        const titles = req.body["inTheBoxTitle[]"];
        const quantities = req.body["inTheBoxQuantity[]"];
        const images = req.files["inTheBoxImage[]"];

        if (titles && quantities) {
            const totalItems = Array.isArray(titles) ? titles.length : 1;

            for (let i = 0; i < totalItems; i++) {
                const titleItem = Array.isArray(titles) ? titles[i] : titles;
                const quantityItem = Array.isArray(quantities) ? quantities[i] : quantities;
                const imageItem = images && images[i] ? formatPublicPath(images[i].path) : "";


                inTheBox.push({
                    title: titleItem,
                    quantity: Number(quantityItem) || 1,
                    image: imageItem
                });
            }
        }

        // ✅ Create accessory
        const accessory = new Accessory({
            title,
            slug,
            type,
            brand,
            category,
            productCategory,
            price,
            salePrice,
            stock,
            inStock: inStock === "true" || inStock === true,
            description,
            shortDescription,
            specs: parsedSpecs,
            image: formatPublicPath(imageItem)

                ? formatPublicPath(req.files["image"][0].path)
                : "",

            thumbnails: req.files["thumbnails"]
                ? req.files["thumbnails"].map(f => formatPublicPath(f.path))
                : [],
            inTheBox,
            metaTitle,
            metaDescription,
            keywords: keywords
                ? keywords.split(",").map(k => k.trim())
                : []
        });

        await accessory.save();
        res.status(201).json({
            message: "Accessory added successfully",
            accessory
        });
    } catch (err) {
        console.error("❌ Error adding accessory:", err);
        res.status(500).json({ message: err.message });
    }
});


// GET accessory by slug
router.get("/:id", checkAdminSession, async (req, res) => {
    try {
        const accessory = await Accessory.findById(req.params.id);
        if (!accessory) return res.status(404).json({ message: "Accessory not found" });
        res.json(accessory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.put("/:id", checkAdminSession, uploadFields, async (req, res) => {
    try {
        const accessory = await Accessory.findById(req.params.id);
        if (!accessory) return res.status(404).json({ message: "Accessory not found" });

        const {
            title, slug, type, brand, category, productCategory,
            price, salePrice, stock, inStock, description, shortDescription,
            specs, metaTitle, metaDescription, keywords
        } = req.body;

        // Parse specs safely
        let parsedSpecs = {};
        if (specs) {
            try { parsedSpecs = JSON.parse(specs); }
            catch { parsedSpecs = {}; }
        }

        // Update in-the-box
        const inBoxTitles = req.body["inTheBoxTitle[]"];
        const inBoxQty = req.body["inTheBoxQuantity[]"];
        const inBoxImages = req.files["inTheBoxImages[]"];
        const inTheBox = [];

        if (inBoxTitles && inBoxQty) {
            const totalItems = Array.isArray(inBoxTitles) ? inBoxTitles.length : 1;
            for (let i = 0; i < totalItems; i++) {
                const titleItem = Array.isArray(inBoxTitles) ? inBoxTitles[i] : inBoxTitles;
                const qtyItem = Array.isArray(inBoxQty) ? inBoxQty[i] : inBoxQty;
                const imageItem = (inBoxImages && inBoxImages[i])
                    ? inBoxImages[i].path.replace(/\\/g, "/")
                    : (accessory.inTheBox[i] ? accessory.inTheBox[i].image : "");

                inTheBox.push({
                    title: titleItem,
                    quantity: Number(qtyItem) || 1,
                    image: imageItem
                });
            }
        }

        // Update main accessory fields
        accessory.title = title;
        accessory.slug = slug;
        accessory.type = type;
        accessory.brand = brand;
        accessory.category = category;
        accessory.productCategory = productCategory;
        accessory.price = price;
        accessory.salePrice = salePrice;
        accessory.stock = stock;
        accessory.inStock = inStock === "true" || inStock === true;
        accessory.description = description;
        accessory.shortDescription = shortDescription;
        accessory.specs = parsedSpecs;
        accessory.metaTitle = metaTitle;
        accessory.metaDescription = metaDescription;
        accessory.keywords = keywords ? keywords.split(",").map(k => k.trim()) : [];

        // Update images **only if uploaded**
        if (req.files["image"] && req.files["image"][0]) {
            accessory.image = req.files["image"][0].path.replace(/\\/g, "/");
        }
        if (req.files["thumbnails"] && req.files["thumbnails"].length) {
            accessory.thumbnails = req.files["thumbnails"].map(f => f.path.replace(/\\/g, "/"));
        }

        accessory.inTheBox = inTheBox;

        await accessory.save();
        res.json({ message: "Accessory updated successfully", accessory });

    } catch (err) {
        console.error("❌ Error updating accessory:", err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
