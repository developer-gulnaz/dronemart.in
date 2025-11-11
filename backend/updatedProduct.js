// seedProducts.js
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure you have MONGO_URI in your .env
const Product = require('./models/Product'); // Adjust path if needed

// === Your products array ===
const products = [
    {
        title: "DJI Avata 2",
        category: "avata-series",
        slug: "dji-avata-2",
        brand: "DJI",
        price: 120000,
        salePrice: 111000,
        image: "/assets/img/product/dji-avata2.png",
        thumbnails: [
            "/assets/img/product/dji-avata2.png",
            "/assets/img/product/dji-avata2-1.png",
            "/assets/img/product/dji-avata2-2.png",
            "/assets/img/product/dji-avata2-3.webp",
            "/assets/img/product/dji-avata2-4.webp",
            "/assets/img/product/dji-avata2-5.webp",
        ],
        inTheBox: [
            {
                title: "DJI Avata 2",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 1.png"
            },
            {
                title: "DJI Goggles 3",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 2.png"
            },
            {
                title: "DJI RC Motion 3",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 3.png"
            },
            {
                title: "DJI Avata 2 Propellers (Pair)",
                quantity: 4,
                image: "/assets/img/product/in-the-box/avata 2 7.png"
            },
            {
                title: "DJI Sling Bag",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 6.png"
            },
            {
                title: "DJI Avata 2 Two-Way Charging Hub",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 5.png"
            },
            {
                title: "DJI Avata 2 Intelligent Flight Battery",
                quantity: 2,
                image: "/assets/img/product/in-the-box/avata 2 4.png"
            },
            {
                title: "DJI Goggles 3 -2.0D Corrective Lenses (Pair)",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 10.png"
            },
            {
                title: "Type-C to Type-C PD Cable",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 12.png"
            },
            {
                title: "USB-C OTG Cable",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 11.png"
            },
            {
                title: "DJI RC Motion 3 Lanyard",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 14.png"
            },
            {
                title: "Screwdriver",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 13.png"
            },
            {
                title: "DJI Avata 2 Gimbal Protector",
                quantity: 1,
                image: "/assets/img/product/in-the-box/avata 2 9.png"
            },
            {
                title: "DJI Avata 2 Propeller Screw",
                quantity: 16,
                image: "/assets/img/product/in-the-box/avata 2 8.png"
            }
        ],
        badge: "Trending",
        stock: 2,
        inStock: true,
        description: "Take flight like never before with the DJI Avata 2, a compact FPV drone built for immersive aerial adventures. Experience high-speed agility and precise control for thrilling cinematic shots. Its advanced camera captures smooth, ultra-clear footage in every environment. Fly longer with reliable battery performance and effortless charging options. The intuitive design ensures both beginners and pros can navigate confidently. With enhanced safety features and intelligent flight modes, every adventure feels secure and exhilarating. Explore creative perspectives and bring your stories to life from the sky. Perfect for action enthusiasts, content creators, and FPV explorers.",
        shortDescription: "Immersive FPV drone capturing 4K HDR video with ultra-wide FOV and RockSteady stabilization.Fly DJI Avata 2, an immersive FPV drone capturing stunning 4K HDR video with ultra-wide FOV and RockSteady stabilization.",
        metaTitle: "DJI Avata 2 - FPV 4K HDR Drone",
        keywords: "DJI Avata 2, FPV drone, 4K HDR drone, immersive drone",
        specs: {
            aircraft: {
                weight: "Approx. 377 g",
                dimensions: {
                    length: "185 mm",
                    width: "212 mm",
                    height: "64 mm"
                },
                maxAccelerationSpeed: "6 m/s (Normal mode), 9 m/s (Sport mode)",
                maxFlightTime: "Approx. 23 mins",
                sensorType: "Downward and backward visual positioning"
            },
            camera: {
                sensor: "1/1.3-inch image sensor",
                fov: "155°",
                aperture: "f/2.8",
                focusRange: "0.6 m to ∞",
                maxImageSize: "4K (16:9) | 4K (4:3)",
                stillModes: { singleShot: "12 MP", burst: "" },
                videoResolution: "4K (4:3) up to 60fps, 4K (16:9) up to 100fps, 2.7K (4:3) up to 60fps, 2.7K (16:9) up to 120fps",
                maxVideoBitrate: "130 Mbps",
                digitalZoom: "Single shot",
                imageFormat: "JPEG"
            },
            gimbal: {
                stabilization: "Single-axis mechanical gimbal (tilt)",
                mechanicalRange: "-95° to 90°",
                controllableRange: "-85° to 80°",
                angularVibrationRange: "±0.01°"
            }
        }
        ,
        featured: true
    },
];


async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Clear existing products
        // await Product.deleteMany({});
        // console.log("Existing products removed");

        // Delete single product before inserting new version

        await Product.deleteOne({ slug: "dji-avata-2" });
        console.log("Old product removed");


        // Insert  products
        if (products.length > 0) {
            await Product.insertMany(products);
            console.log(`${products.length} DJI Drones added to DB`);
        } else {
            console.log("Products array is empty. Fill it before running the script.");
        }

        process.exit(0);
    } catch (err) {
        console.error("DB Seed Error:", err);
        process.exit(1);
    }
}

seedDB();
