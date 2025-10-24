// seedProducts.js
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure you have MONGO_URI in your .env
const Product = require('./models/Product'); // Adjust path if needed

// === Your products array ===
const products = [
    {
        title: "DJI Matrice 4T",
        slug: "dji-matrice-4t",
        brand: "DJI",
        category: "enterprise",
        type: "industrial-drone",
        price: 689999,
        salePrice: 565999,
        image: "/assets/img/product/matrice-4t.wepp",
        thumbnails: [
            "/assets/img/product/matrice4t-1.wepp",
        ],
        inTheBox: [
            { title: "DJI Matrice 4T Drone", quantity: 1, image: "/assets/img/product/in-the-box/matrice4t-drone.webp" },
            { title: "DJI RC Plus 2 Enterprise", quantity: 1, image: "/assets/img/product/in-the-box/rcplus2.webp" },
            { title: "DJI Matrice 4 Series Battery", quantity: 1, image: "/assets/img/product/in-the-box/battery.webp" },
            { title: "DJI 100W USB-C Power Adapter", quantity: 1, image: "/assets/img/product/in-the-box/adapter.webp" },
            { title: "DJI Matrice 4T Gimbal Protector", quantity: 1, image: "/assets/img/product/in-the-box/gimbal-protector.webp" },
            { title: "DJI Matrice 4 Series Propellers", quantity: 3, image: "/assets/img/product/in-the-box/propeller.webp" },
            { title: "USB-A to USB-C Data Cable", quantity: 1, image: "/assets/img/product/in-the-box/usb-cable.webp" },
            { title: "100W Power Adapter AC Cable", quantity: 1, image: "/assets/img/product/in-the-box/ac-cable.webp" },
            { title: "USB-C to USB-C Data Cable", quantity: 1, image: "/assets/img/product/in-the-box/type-c-cable.webp" },
            { title: "DJI Matrice 4 Series Storage Case", quantity: 1, image: "/assets/img/product/in-the-box/storage-case.webp" },
            { title: "DJI Matrice 4 Series Shoulder Strap", quantity: 1, image: "/assets/img/product/in-the-box/shoulder-strap.webp" }
        ],
        badge: "Sale",
        stock: 15,
        inStock: true,
        shortDescription: "The DJI Matrice 4T is a high-end enterprise drone with integrated thermal, zoom, and laser rangefinder sensors for inspection, mapping, and emergency operations.",
        metaTitle: "DJI Matrice 4T - Industrial Thermal Drone for Inspection & Emergency Response",
        keywords: [
            "DJI Matrice 4T",
            "enterprise drone",
            "thermal drone",
            "industrial inspection drone",
            "DJI enterprise series"
        ],
        description: "The DJI Matrice 4T is a rugged, foldable enterprise drone built for precision industrial operations, featuring a dual-camera system with thermal imaging, a laser rangefinder, and advanced obstacle avoidance. Designed for inspections, search-and-rescue, and emergency response, it offers 49-min flight endurance, 15 km transmission range, and enterprise-grade reliability.",
        specs: {
            general: {
                takeoffWeight: "Approx. 3580 g (with single payload)",
                dimensionsFolded: "430 × 420 × 430 mm",
                dimensionsUnfolded: "810 × 670 × 430 mm",
                maxTakeoffAltitude: "7000 m",
                ingressProtection: "IP55"
            },
            flight: {
                maxAscentSpeed: "6 m/s",
                maxDescentSpeed: "5 m/s",
                maxSpeed: "23 m/s",
                maxFlightTime: "Up to 55 mins (without payload)",
                maxWindResistance: "15 m/s",
                transmissionRange: "15 km (FCC)"
            },
            camera: {
                wideCamera: "1/2″ CMOS, 48 MP, DFOV: 85°",
                zoomCamera: "1/2″ CMOS, 48 MP, 56× hybrid zoom",
                thermalCamera: "640×512 @ 30fps, 13mm lens, DFOV: 61°",
                laserRangefinder: "3–1200 m range"
            },
            connectivity: {
                system: "OcuSync 3 Enterprise",
                controller: "DJI RC Plus (7″ screen, IP54-rated)"
            },
            battery: {
                type: "TB30 Intelligent Flight Battery",
                capacity: "5880 mAh, 131.6 Wh",
                chargingStation: "BS30 Intelligent Battery Station",
                chargeTime: "~30 mins (to 90%)"
            }
        },
        featured: true
    }

];


async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Clear existing products
        // await Product.deleteMany({});
        // console.log("Existing products removed");

        // Insert  products
        if (products.length > 0) {
            await Product.insertMany(products);
            console.log(`${products.length} products added to DB`);
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
