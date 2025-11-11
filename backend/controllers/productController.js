const Product = require("../models/Product");


// -----------------------------
// Middleware
// -----------------------------

const checkAdminSession = (req, res, next) => {
    if (!req.session.adminId) {
        return res.redirect('/admin?error=Login+required');
        // return res.status(401).json({ message: "Unauthorized - Admin login required" });
    }
    next();
};

// =============================
// Add Product
// =============================
exports.addProduct = [checkAdminSession, async (req, res) => {
    try {

        console.log("Uploaded fields:", Object.keys(req.files || {}));

        const {
            title, slug, category, brand,
            price, salePrice = 0, badge = "",
            stock = 0, description, shortDescription,
            specs, inTheBox, features,
            metaTitle, metaDescription, keywords,
            featured
        } = req.body;

        const inStock = Number(stock) > 0;

        console.log("✅ Inside product controller");

        // -----------------------
        // Handle images
        // -----------------------
        let mainImagePath = "";
        const thumbnailPaths = [];
        const boxImagesPaths = [];

        if (req.files?.image?.[0]) {
            mainImagePath = "/assets/img/product/" + req.files.image[0].filename;
        }

        if (req.files?.thumbnails) {
            req.files.thumbnails.forEach(f => {
                thumbnailPaths.push("/assets/img/product/" + f.filename);
            });
        }

        if (req.files?.inTheBoxImage) {
            req.files.inTheBoxImage.forEach(f => {
                boxImagesPaths.push("/assets/img/product/in-the-box/" + f.filename);
            });
        }

        // -----------------------
        // Parse JSON fields
        // -----------------------
        let inTheBoxJson = [];
        try { inTheBoxJson = JSON.parse(inTheBox || "[]"); } catch (e) { }

        let specsJson = {};
        try { specsJson = JSON.parse(specs || "{}"); } catch (e) { }

        let featuresArray = [];
        try { featuresArray = JSON.parse(features || "[]"); } catch (e) { }

        // -----------------------
        // Assign box images
        // -----------------------
        inTheBoxJson.forEach((item, i) => {
            if (brand === "DJI") {
                if (boxImagesPaths[i]) item.image = boxImagesPaths[i];
            } else {
                delete item.image;
            }
        });

        // -----------------------
        // Save Product
        // -----------------------
        const newProduct = new Product({
            title,
            slug,
            category,
            brand,
            price: Number(price),
            salePrice: Number(salePrice),
            badge,
            stock: Number(stock),
            inStock,
            image: mainImagePath,
            thumbnails: thumbnailPaths,
            description,
            shortDescription,
            specs: specsJson,
            inTheBox: inTheBoxJson,
            features: featuresArray,

            // ✅ Added missing SEO fields
            metaTitle,
            metaDescription,
            keywords: keywords ? keywords.split(",").map(x => x.trim()) : [],

            // ✅ Featured checkbox handling
            featured: featured === "true" || featured === true
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "✅ Product added successfully", product: savedProduct });

    } catch (error) {
        console.error("❌ Add Product Error:", error);
        res.status(500).json({ message: "Failed to add product", error });
    }
}];



exports.updateProduct = [
    checkAdminSession,
    async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) return res.status(404).json({ message: "Product not found" });

            const {
                title, slug, category, brand,
                price, salePrice = 0, badge = "",
                stock = 0, description, shortDescription,
                specs, inTheBox, features,
                metaTitle, metaDescription, keywords,
                featured
            } = req.body;

            const inStock = Number(stock) > 0;

            // -----------------------
            // Main Image
            // -----------------------
            let mainImage = product.image;
            if (req.files?.image?.[0]) mainImage = "/assets/img/product/" + req.files.image[0].filename;
            else if (req.body.image_existing) mainImage = req.body.image_existing;

            // -----------------------
            // Thumbnails
            // -----------------------
            let thumbnails = [];
            if (req.body["thumbnails_existing[]"]) {
                thumbnails = Array.isArray(req.body["thumbnails_existing[]"]) ? req.body["thumbnails_existing[]"] : [req.body["thumbnails_existing[]"]];
            }
            if (req.files?.thumbnails?.length) thumbnails.push(...req.files.thumbnails.map(f => "/assets/img/product/" + f.filename));
            if (!thumbnails.length && Array.isArray(product.thumbnails)) thumbnails = product.thumbnails;

            // -----------------------
            // In-The-Box
            // -----------------------
            let inTheBoxArr = [];
            try { inTheBoxArr = JSON.parse(inTheBox || "[]"); } catch (e) { inTheBoxArr = []; }

            // Assign images
            const existingImages = req.body["inTheBoxImage_existing[]"] ? (Array.isArray(req.body["inTheBoxImage_existing[]"]) ? req.body["inTheBoxImage_existing[]"] : [req.body["inTheBoxImage_existing[]"]]) : [];
            const uploadedFiles = req.files?.inTheBoxImage || [];

            // inTheBoxArr.forEach((item, index) => {
            //     if (uploadedFiles[index]) item.image = "/assets/img/product/in-the-box/" + uploadedFiles[index].filename;
            //     else if (existingImages[index]) item.image = existingImages[index];
            // });

            // -----------------------
            // Specs & Features
            // -----------------------
            let specsJson = {};
            try { specsJson = JSON.parse(specs || "{}"); } catch (e) { specsJson = {}; }

            let featuresArr = [];
            try { featuresArr = JSON.parse(features || "[]"); } catch (e) { featuresArr = []; }

            // -----------------------
            // Keywords
            // -----------------------
            const keywordsArr = keywords ? keywords.split(",").map(k => k.trim()) : product.keywords || [];

            // -----------------------
            // Update Product
            // -----------------------
            Object.assign(product, {
                title, slug, category, brand,
                price: Number(price), salePrice: Number(salePrice), badge,
                stock: Number(stock), inStock,
                image: mainImage,
                thumbnails,
                description, shortDescription,
                specs: specsJson,
                // inTheBox: inTheBoxArr,
                features: featuresArr,
                metaTitle, metaDescription,
                keywords: keywordsArr,
                featured: featured === "true" || featured === true
            });

            const updated = await product.save();
            res.json({ message: "✅ Product updated successfully", product: updated });

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Failed to update product", error: err.message });
        }
    }
];


// =============================
// Delete Product
// =============================
exports.deleteProduct = [checkAdminSession, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to delete product" });
    }
}];

// =============================
// Get all products
// =============================
exports.getAllProducts = async (req, res) => {
    try {
        const { category, q } = req.query;

        let filter = {};

        // Filter by category if provided and not "all"
        if (category && category.toLowerCase() !== "all") {
            filter.category = category;
        }

        // Filter by search query in name or description
        if (q) {
            filter.$or = [
                { name: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
            ];
        }

        const products = await Product.find(filter).sort({ createdAt: -1 }); // latest first
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error fetching products" });
    }
};


// get product by id
exports.getProductbySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const product = await Product.findOne({ slug });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Optionally: fetch related products (same category, exclude self)
        const related = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        })
            .lean();

        res.json({ product, related });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ message: "Server error" });
    }
};



// Buy Now Controller
exports.buyNow = async (req, res) => {
    try {
        const userId = req.user._id; // assuming you have auth middleware
        const { product: productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Check product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Add to cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Check if product already exists in cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity || 1;
        } else {
            cart.items.push({ product: productId, quantity: quantity || 1 });
        }

        await cart.save();

        // Return success and redirect URL
        return res.status(200).json({
            message: `${product.title} added to cart`,
            redirect: "/checkout.html" // frontend should use this to redirect
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

