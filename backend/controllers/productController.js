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
// =============================F

exports.addProduct = [checkAdminSession, async (req, res) => {
    try {
        const {
            title, slug, category, brand, price, salePrice = 0, badge = "",
            stock = 0, description, shortDescription, specs, inTheBox, features
        } = req.body;

        const inStock = Number(stock) > 0;

        // -----------------------
        // Handle images
        // -----------------------
        let mainImagePath = "";
        const thumbnailPaths = [];
        const boxImagesPaths = [];

        if (req.files['image'] && req.files['image'][0]) {
            mainImagePath = "/assets/img/product/" + req.files['image'][0].filename;
        }

        if (req.files['thumbnails']) {
            req.files['thumbnails'].forEach(f => {
                thumbnailPaths.push("/assets/img/product/" + f.filename);
            });
        }

        if (req.files['inTheBoxImage']) {
            req.files['inTheBoxImage'].forEach(f => {
                boxImagesPaths.push("/assets/img/product/in-the-box/" + f.filename);
            });
        }

        // -----------------------
        // Parse dynamic fields
        // -----------------------
        const specsJson = specs ? JSON.parse(specs) : {};
        const inTheBoxJson = inTheBox ? JSON.parse(inTheBox) : [];
        const featuresArray = features ? JSON.parse(features) : [];

        // -----------------------
        // Assign box images based on brand/category
        // -----------------------
        if (brand === "DJI") {
            inTheBoxJson.forEach((item, i) => {
                if (boxImagesPaths[i]) item.image = boxImagesPaths[i];
            });
        } else {
            inTheBoxJson.forEach(item => delete item.image);
        }

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
            features: featuresArray
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: savedProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to add product", error });
    }
}];


// =============================
// Update Product
// =============================
exports.updateProduct = [
    checkAdminSession,
    async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ message: "Product not found" });

            const {
                title,
                slug,
                category,
                brand,
                price,
                salePrice = 0,
                badge = "",
                stock = 0,
                description,
                shortDescription,
                specs,
                inTheBox,
                features
            } = req.body;

            const inStock = Number(stock) > 0;

            // -----------------------
            // 🖼️ Handle Main Image
            // -----------------------
            let mainImagePath = product.image;
            if (req.files?.image?.[0]) {
                mainImagePath = "/assets/img/product/" + req.files.image[0].filename;
            } else if (req.body.image_existing) {
                mainImagePath = Array.isArray(req.body.image_existing)
                    ? req.body.image_existing[0]
                    : req.body.image_existing;
            }

            // -----------------------
            // 🖼️ Handle Thumbnails
            // -----------------------
            let thumbnailPaths = [];

            // Existing thumbnail URLs from form
            if (req.body["thumbnails_existing[]"]) {
                const existingThumbs = Array.isArray(req.body["thumbnails_existing[]"])
                    ? req.body["thumbnails_existing[]"]
                    : [req.body["thumbnails_existing[]"]];
                thumbnailPaths.push(...existingThumbs);
            }

            // Newly uploaded thumbnails
            if (req.files?.thumbnails?.length) {
                const uploadedThumbs = req.files.thumbnails.map(
                    (file) => "/assets/img/product/" + file.filename
                );
                thumbnailPaths.push(...uploadedThumbs);
            }

            // If no thumbnails exist, fallback to previous ones
            if (thumbnailPaths.length === 0 && Array.isArray(product.thumbnails)) {
                thumbnailPaths = product.thumbnails;
            }

            // -----------------------
            // 📦 Handle In-The-Box Items
            // -----------------------
            let inTheBoxJson =
                inTheBox
                    ? typeof inTheBox === "string"
                        ? JSON.parse(inTheBox)
                        : inTheBox
                    : product.inTheBox || [];

            // Existing images
            if (req.body["inTheBoxImage_existing[]"]) {
                const existingBoxImages = Array.isArray(req.body["inTheBoxImage_existing[]"])
                    ? req.body["inTheBoxImage_existing[]"]
                    : [req.body["inTheBoxImage_existing[]"]];
                existingBoxImages.forEach((img, i) => {
                    if (inTheBoxJson[i]) inTheBoxJson[i].image = img;
                });
            }

            // New uploaded images
            if (req.files?.inTheBoxImage?.length) {
                req.files.inTheBoxImage.forEach((f, i) => {
                    if (inTheBoxJson[i])
                        inTheBoxJson[i].image = "/assets/img/product/in-the-box/" + f.filename;
                });
            }

            // -----------------------
            // ⚙️ Handle Specs
            // -----------------------
            const defaultSpecs = {
                aircraft: {
                    weight: "",
                    dimensions: { length: "", width: "", height: "" },
                    maxAccelerationSpeed: "",
                    maxFlightTime: "",
                    sensorType: ""
                },
                camera: {
                    sensor: "",
                    fov: "",
                    aperture: "",
                    focusRange: "",
                    maxImageSize: "",
                    stillModes: { singleShot: "", burst: "" },
                    videoResolution: "",
                    maxVideoBitrate: "",
                    digitalZoom: "",
                    imageFormat: ""
                },
                gimbal: {
                    stabilization: "",
                    mechanicalRange: "",
                    controllableRange: "",
                    angularVibrationRange: ""
                }
            };

            let specsJson =
                specs
                    ? typeof specs === "string"
                        ? JSON.parse(specs)
                        : specs
                    : product.specs || {};

            const mergedSpecs = { ...defaultSpecs, ...specsJson };

            // -----------------------
            // ✳️ Handle Features
            // -----------------------
            let featuresArray =
                features
                    ? typeof features === "string"
                        ? JSON.parse(features)
                        : features
                    : product.features || [];

            // -----------------------
            // 🧩 Ensure inTheBox fallback
            // -----------------------
            const defaultInTheBox =
                inTheBoxJson.length > 0
                    ? inTheBoxJson
                    : [{ title: "", quantity: "", image: "" }];

            // -----------------------
            // 📝 Update Product Fields
            // -----------------------
            Object.assign(product, {
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
                specs: mergedSpecs,
                inTheBox: defaultInTheBox,
                features: featuresArray
            });

            const updatedProduct = await product.save();
            res.json({
                message: "✅ Product updated successfully",
                product: updatedProduct
            });
        } catch (error) {
            console.error("❌ Error updating product:", error);
            res.status(500).json({ message: "Failed to update product", error: error.message });
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

