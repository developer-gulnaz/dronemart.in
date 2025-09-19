// seedProducts.js
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure you have MONGO_URI in your .env
const Product = require('./models/Product'); // Adjust path if needed

// === Your products array ===
const products = [
    // Mini Series
    {
        title: "DJI Mini 2 SE",
        category: "Mini Series",
        price: 449,
        rating: 4.2,
        reviews: 75,
        image: "assets/img/product/mini 2se.png",
        badge: "Sale",
        stock: 20,
        description: "Entry-level mini drone with solid performance and long battery life.",
        specs: {},
        featured: false
    },
    {
        title: "DJI Mini 3 Pro Combo",
        category: "Mini Series",
        price: 499,
        rating: 4.5,
        reviews: 120,
        image: "assets/img/product/mini32.jpg",
        badge: "",
        stock: 15,
        description: `Discover the freedom of flight with the DJI Mini 3, a lightweight 135g drone that’s easy to take anywhere. Launch effortlessly with palm takeoff and landing, and capture cinematic moments with 4K ultra-stabilized video. Stay in control with multiple flight options and intelligent modes like Subject Tracking and QuickShots for stunning footage every time. Fly safely with full-coverage propeller guards, and enjoy peace of mind with up to 30-day returns—perfect for exploring your creativity worry-free.`,
        specs: {
            weight: "Under 249 g",
            dimensions: { foldedWithoutPropellers: "148×90×62 mm", unfoldedWithPropellers: "251×362×72 mm" },
            maxAccelerationSpeed: "5 m/s",
            maxFlightTime: "38 min (Intelligent Flight Battery) | 51 min (Battery Plus)",
            camera: {
                sensor: "1/1.3-inch CMOS, 48MP",
                fov: "82.1°",
                aperture: "f/1.7",
                focusRange: "1 m to ∞",
                maxImageSize: "8K",
                stillModes: { singleShot: "12 MP", burst: "48 MP", timed: "12 MP" },
                videoResolution: "4K HDR",
                maxVideoBitrate: "100 Mbps",
                digitalZoom: { "4K": "2x", "2.7K": "3x", "FHD": "4x" },
                imageFormat: "JPEG"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-135° to 80°", roll: "-135° to 45°", pan: "-30° to 30°" },
                controllableRange: { tilt: "-90° to 60°", roll: "-90° or 0°" },
                angularVibrationRange: "±0.01°"
            }
        },
        featured: true
    },
    {
        title: "DJI Mini 4 Pro Combo",
        category: "Mini Series",
        price: 599,
        rating: 4.6,
        reviews: 100,
        image: "assets/img/product/mini4pro.jpg",
        badge: "",
        stock: 10,
        description: "High-performance compact drone with intelligent flight modes and advanced 4K video for creative aerial photography.",
        specs: {
            weight: "Under 249 g",
            dimensions: { foldedWithoutPropellers: "148×94×64 mm", unfoldedWithPropellers: "298×373×101 mm" },
            maxAccelerationSpeed: "5 m/s (S/N Mode), 3 m/s (C Mode)",
            maxFlightTime: "34 min (Battery) | 45 min (Battery Plus)",
            camera: {
                sensor: "1/1.3-inch CMOS, 48MP",
                fov: "82.1°",
                aperture: "f/1.7",
                focusRange: "1 m to ∞",
                maxImageSize: "8064×6048",
                stillModes: {
                    singleShot: "12/48 MP",
                    burst: "12 MP: 3/5/7, 48 MP: 3/5 frames",
                    aeb: "12 MP: 3/5/7, 48 MP: 3/5",
                    timed: "12 MP: 2/3/5/7/10/15/20/30/60 s, 48 MP: 5/7/10/15/20/30/60 s"
                },
                videoResolution: "Up to 4K/100fps | 2K/200fps",
                maxVideoBitrate: "150 Mbps",
                digitalZoom: { "12 MP Photo": "1-3x", "4K": "1-3x", "FHD": "1-4x" },
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-135° to 80°", roll: "-135° to 45°", pan: "-30° to 30°" },
                controllableRange: { tilt: "-90° to 60°", roll: "-90° or 0°" },
                angularVibrationRange: "±0.01°"
            }
        },
        featured: true
    },
    {
        title: "DJI Mini 5 Pro",
        category: "Mini Series",
        price: 899,
        rating: 4.8,
        reviews: 120,
        image: "assets/img/product/mini 5pro.webp",
        badge: "New",
        stock: 12,
        description: "Ultra-light under 249 g drone with a powerful 1-inch CMOS sensor, 4K/120fps video, extended flight time, and advanced gimbal rotation for cinematic creativity.",
        specs: {
            weight: "Under 249 g",
            dimensions: { folded: "150×95×65 mm" },
            windResistance: "Level 5",
            flightPerformance: {
                maxSpeed: "57 km/h (Sport Mode)",
                maxAltitude: "4000 m",
                maxFlightTime: "36 min (Standard Battery) | 52 min (Plus Battery)"
            },
            camera: {
                sensor: "1-inch CMOS, 20MP",
                lens: "24 mm equivalent, f/1.7",
                videoResolution: "Up to 4K/120fps",
                isoRange: "100–6400 (expandable to 12800)",
                digitalZoom: "1–4x",
                verticalShooting: "225° gimbal rotation",
                telephotoMode: "48 mm in-camera zoom",
                imageFormat: "JPEG/DNG (RAW)",
                features: "HDR video, low-light optimization"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-90° to +60°", yaw: "-30° to +30°" },
                angularVibrationRange: "±0.01°"
            },
            battery: {
                standard: { flightTime: "36 min", weight: "~81 g" },
                plus: { flightTime: "52 min", weight: "~122 g" },
                charging: "65W fast charge (~1 hour)"
            },
            transmission: {
                system: "OcuSync O4+",
                maxRange: "Up to 25 km",
                controllers: ["RC-N3 (smartphone)", "RC2 (built-in display)"]
            }
        },
        featured: true
    },

    {
        title: "DJI Neo",
        category: "Neo Series",
        price: 299,
        rating: 4.3,
        reviews: 50,
        image: "assets/img/product/neo2.jpg",
        badge: "",
        stock: 20,
        description: "Super compact lightweight drone perfect for beginners and casual flyers. Capture 4K video and photos easily.",
        specs: {
            weight: "Approx. 135 g",
            dimensions: { folded: "130×157×48.5 mm" },
            maxAccelerationSpeed: "0.5 m/s (Cine), 2 m/s (Normal), 3 m/s (Sport)",
            maxFlightTime: "Approx. 18 min",
            camera: {
                sensor: "1/2-inch image sensor",
                fov: "117.6°",
                aperture: "f/2.8",
                focusRange: "0.6 m to ∞",
                maxImageSize: "12 MP | Photo: 4K (4:3) | 4K (16:9)",
                stillModes: "Single/Timed Shot",
                videoResolution: "EIS Off: 4K (4:3) @30fps, 1080p up to 60fps; EIS On: 4K (16:9) @30fps, 1080p up to 60fps; Vertical: 1080p (9:16) up to 60fps",
                maxVideoBitrate: "75 Mbps",
                imageFormat: "JPEG"
            },
            gimbal: {
                stabilization: "Single-axis mechanical gimbal (tilt)",
                mechanicalRange: { tilt: "-120° to 120°" },
                controllableRange: { tilt: "-90° to 60°" },
                angularVibrationRange: "±0.01°"
            }
        },
        featured: false
    },

    // Air Series
    {
        title: "DJI Air 3S Fly More Combo Lite",
        category: "Air Series",
        price: 1099,
        rating: 4.7,
        reviews: 130,
        image: "assets/img/product/air3s3.jpg",
        badge: "",
        stock: 12,
        description: "Dual-camera drone delivering 5.4K video, 20MP photos, omnidirectional obstacle sensing, and long flight times.",
        specs: {
            weight: "724 g",
            dimensions: { foldedWithoutPropellers: "214.19×100.63×89.17 mm", unfoldedWithoutPropellers: "266.11×325.47×106.00 mm" },
            maxFlightTime: "45 minutes",
            cameras: [
                { type: "Wide-Angle", sensor: "1-inch CMOS, 50MP", fov: "84°", aperture: "f/1.8", focusRange: "0.5 m to ∞", maxImageSize: "8192×6144" },
                { type: "Medium Tele", sensor: "1/1.3-inch CMOS, 48MP", fov: "35°", aperture: "f/2.8", focusRange: "3 m to ∞", maxImageSize: "8064×6048" }
            ],
            gimbal: { stabilization: "3-axis mechanical gimbal (tilt, roll, pan)" },
            maxVideoResolution: "4K",
            maxVideoBitrate: "130 Mbps",
            digitalZoom: { "Wide-Angle": "1-2.9x", "Medium Tele": "3-9x" },
            imageFormat: "JPEG/DNG (RAW)",
            angularVibrationRange: "±0.0037°"
        },
        featured: true
    },

    // Mavic Series
    {
        title: "DJI Mavic 3 Pro Combo",
        category: "Mavic Series",
        price: 2099,
        rating: 4.9,
        reviews: 310,
        image: "assets/img/product/mavic3pro6.jpg",
        badge: "Hot",
        stock: 5,
        description: "Professional drone with superior camera and flight capabilities.",
        specs: {
            weight: "958 g",
            dimensions: {
                foldedWithoutPropellers: "231.1×98×95.4 mm",
                unfoldedWithoutPropellers: "347.5×290.8×107.7 mm"
            },
            maxAccelerationSpeed: "8 m/s",
            maxFlightTime: "43 minutes",
            cameras: [
                {
                    type: "Hasselblad",
                    sensor: "4/3 CMOS, 20MP",
                    fov: "84°",
                    formatEquivalent: "24mm",
                    aperture: "f/2.8-f/11",
                    focusRange: "1 m to ∞",
                    maxImageSize: "5.3K",
                    stillModes: { singleShot: "20 MP", burst: "3/5/7 frames" },
                    videoResolution: "Up to 5.1K/50fps, DCI 4K/120fps, FHD/200fps",
                    maxVideoBitrate: "200 / 3772 / 2514 / 1750 Mbps",
                    digitalZoom: "1-3x",
                    imageFormat: "JPEG/DNG (RAW)"
                },
                {
                    type: "Medium Tele",
                    sensor: "1/1.3″ CMOS, 48MP",
                    fov: "35°",
                    formatEquivalent: "70mm",
                    aperture: "f/2.8",
                    focusRange: "3 m to ∞",
                    maxImageSize: "8K",
                    stillModes: { singleShot: "12 or 48 MP", burst: "3/5/7 frames" },
                    videoResolution: "4K/60fps, FHD/60fps",
                    maxVideoBitrate: "160 / 1768 / 1178 / 821 Mbps",
                    digitalZoom: "3-7x",
                    imageFormat: "JPEG/DNG (RAW)"
                },
                {
                    type: "Tele",
                    sensor: "1/2″ CMOS, 12MP",
                    fov: "15°",
                    formatEquivalent: "166mm",
                    aperture: "f/3.4",
                    focusRange: "3 m to ∞",
                    maxImageSize: "4K",
                    stillModes: { singleShot: "12 MP", burst: "3/5/7 frames" },
                    videoResolution: "4K/60fps, FHD/60fps",
                    maxVideoBitrate: "160 / 1768 / 1178 / 821 Mbps",
                    digitalZoom: "7-28x",
                    imageFormat: "JPEG/DNG (RAW)"
                }
            ],
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-140° to 50°", roll: "-50° to 50°", pan: "-23° to 23°" },
                controllableRange: { tilt: "-90° to 35°", pan: "-5° to 5°" },
                angularVibrationRange: "±0.003°"
            }
        }, featured: true
    },
    {
        title: "DJI Mavic 4 Pro Creator Combo",
        category: "Mavic Series",
        price: 3499,
        rating: 4.9,
        reviews: 50,
        image: "assets/img/product/mavic 4pro.png",
        badge: "",
        stock: 5,
        description: "Ultimate creative freedom with triple-camera Hasselblad system, 6K video, and full filmmaking package.",
        specs: {
            weight: "Approx. 1063 g",
            dimensions: {
                foldedWithPropellers: "257.6×124.8×106.6 mm",
                foldedWithoutPropellers: "257.6×124.8×103.4 mm",
                unfoldedWithoutPropellers: "328.7×390.5×135.2 mm"
            },
            maxAccelerationSpeed: "10 m/s (Sport Mode), 6 m/s (Normal Mode), 6 m/s (Cine Mode)",
            maxFlightTime: "51 minutes",
            camera: {
                hasselblad: {
                    sensor: "4/3 CMOS",
                    effectivePixels: "100 MP",
                    fov: "72°",
                    formatEquivalent: "28 mm",
                    aperture: "f/2.0 to f/11",
                    focusRange: "2 m to ∞",
                    maxImageSize: "12K",
                    stillModes: { singleShot: "25 MP, 100 MP" }
                },
                mediumTele: {
                    sensor: "1/1.3-inch CMOS",
                    effectivePixels: "48 MP",
                    fov: "35°",
                    formatEquivalent: "70 mm",
                    aperture: "f/2.8",
                    focusRange: "3 m to ∞",
                    maxImageSize: "N/A",
                    stillModes: { singleShot: "12 MP, 48 MP" }
                },
                tele: {
                    sensor: "1/1.5-inch CMOS",
                    effectivePixels: "50 MP",
                    fov: "15°",
                    formatEquivalent: "168 mm",
                    aperture: "f/2.8",
                    focusRange: "3 m to ∞",
                    maxImageSize: "N/A",
                    stillModes: { singleShot: "12.5 MP, 50 MP" }
                },
                videoResolution: {
                    "Hasselblad 6K": "6016×3384 up to 60fps",
                    "Hasselblad 4K": "4096×2160 & 3840×2160 up to 120fps",
                    "Medium Tele 4K": "3840×2160 up to 120fps",
                    "Tele 4K": "3840×2160 up to 100fps"
                },
                maxVideoBitrate: "90 Mbps (H.264), 180 Mbps (H.265), 1200 Mbps (ALL-I)",
                digitalZoom: {
                    hasselblad: "1x to 2.5x",
                    mediumTele: "2.5x to 6x",
                    tele: "6x to 24x"
                },
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-164° to 160°", roll: "-90° to 450°", pan: "-22° to 22°" },
                controllableRange: { tilt: "-90° to 70°", roll: "-40° to 400°" },
                angularVibrationRange: {
                    hoveringWithoutWind: "±0.001°",
                    normalMode: "±0.003°",
                    sportMode: "±0.005°"
                }
            }
        },
        featured: true
    },

    // Avata Series
    {
        title: "DJI Avata 2",
        category: "Avata Series",
        price: 1399,
        rating: 4.6,
        reviews: 100,
        image: "assets/img/product/avata 2 1.png",
        badge: "",
        stock: 10,
        description: "Immersive FPV drone capturing 4K HDR video with ultra-wide FOV and RockSteady stabilization.",
        specs: {
            weight: "Approx. 377 g",
            dimensions: { length: "185 mm", width: "212 mm", height: "64 mm" },
            maxAccelerationSpeed: "6 m/s (Normal mode), 9 m/s (Sport mode)",
            maxFlightTime: "Approx. 23 mins",
            camera: {
                sensor: "1/1.3-inch image sensor",
                effectivePixels: "12 MP",
                fov: "155°",
                formatEquivalent: "12 mm",
                aperture: "f/2.8",
                focusRange: "0.6 m to ∞",
                maxImageSize: "4K (16:9) | 4K (4:3)",
                videoResolution: {
                    "4K (4:3)": "up to 60fps",
                    "4K (16:9)": "up to 100fps",
                    "2.7K (4:3)": "up to 60fps",
                    "2.7K (16:9)": "up to 120fps"
                },
                maxVideoBitrate: "130 Mbps",
                digitalZoom: "Single shot",
                imageFormat: "JPEG"
            },
            gimbal: {
                stabilization: "Single-axis mechanical gimbal (tilt)",
                mechanicalRange: { tilt: "-95° to 90°" },
                controllableRange: { tilt: "-85° to 80°" },
                angularVibrationRange: "±0.01°"
            }
        },
        featured: true
    },

    // Inspire Series
    {
        title: "DJI Inspire 3",
        category: "Inspire Series",
        price: 15999,
        rating: 5.0,
        reviews: 40,
        image: "assets/img/product/inspire3.jpg",
        badge: "Premium",
        stock: 2,
        description: "Flagship professional drone for cinematic aerial filmmaking.",
        specs: {},
        featured: true
    },

    // Flip Series
    {
        title: "Flip RC2",
        category: "Flip Series",
        price: 399,
        rating: 4.3,
        reviews: 30,
        image: "assets/img/product/flip4.jpg",
        badge: "",
        stock: 15,
        description: "Beginner-friendly drone with stable flight and HD camera.",
        specs: {
            weight: "< 249 g",
            dimensions: { folded: "136×62×165 mm", unfolded: "233×280×79 mm" },
            maxAccelerationSpeed: "5 m/s (Sport mode), 5 m/s (Normal mode), 2 m/s (Cine mode)",
            maxFlightTime: "31 minutes",
            camera: {
                sensor: "1/1.3-inch image sensor",
                fov: "82.1°",
                formatEquivalent: "24 mm",
                aperture: "f/1.7",
                focusRange: "1 m to ∞",
                maxImageSize: "48MP Photo 8064×6048",
                stillModes: {
                    singleShot: "12 MP and 48 MP",
                    burst: "12 MP, 3/5/7 frames",
                    aeb: "12 MP, 3/5/7 frames at 2/3 EV step",
                    timed: "12 MP, 2/3/5/7/10/15/20/30/60 s"
                },
                videoResolution: {
                    "4K": "3840×2160 @ 24–60/100fps",
                    "FHD": "1920×1080 @ 24–60/100fps",
                    "2.7K Vertical": "1512×2688 @ 24–30fps",
                    "FHD Vertical": "1080×1920 @ 24–30fps"
                },
                maxVideoBitrate: "150 Mbps",
                digitalZoom: { "4K": "3x", "FHD": "4x", "2.7K Vertical": "3x", "FHD Vertical": "4x", "12 MP Photo": "3x" },
                imageFormat: "JPEG/DNG/RAW"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-130° to +63°", roll: "-47° to +47°", pan: "-30° to +30°" },
                controllableRange: { tilt: "-90° to +35°" },
                angularVibrationRange: "±0.01°"
            }
        },
        featured: false
    },

    // Air Series
    {
        title: "DJI Air 2S",
        category: "Air Series",
        price: 999,
        rating: 4.7,
        reviews: 180,
        image: "assets/img/product/air2s.jpg",
        badge: "Featured",
        stock: 10,
        description: "Advanced Air Series drone with 1-inch sensor, 4K video, and intelligent flight modes.",
        specs: {
            weight: "724 g",
            dimensions: { folded: "214.19×100.63×89.17 mm", unfolded: "266.11×325.47×106.00 mm" },
            maxFlightTime: "45 minutes",
            camera: {
                wideAngle: {
                    sensor: "1-inch CMOS",
                    effectivePixels: "50MP",
                    fov: "84°",
                    formatEquivalent: "24 mm",
                    aperture: "f/1.8",
                    focusRange: "0.5 m to ∞",
                    maxImageSize: "8192×6144",
                    stillModes: {
                        singleShot: "12 MP and 50 MP",
                        burst: "12 MP, 3/5/7 frames; 50 MP, 3/5 frames",
                        aeb: "12 MP, 3/5/7 frames; 50 MP, 3/5 frames at 0.7 EV step",
                        timed: "12 MP, 2/3/5/7/10/15/20/30/60 s; 50 MP, 5/7/10/15/20/30/60 s"
                    }
                },
                mediumTele: {
                    sensor: "1/1.3-inch CMOS",
                    effectivePixels: "48MP",
                    fov: "35°",
                    formatEquivalent: "70 mm",
                    aperture: "f/2.8",
                    focusRange: "3 m to ∞",
                    maxImageSize: "8064×6048",
                    stillModes: {
                        singleShot: "12 MP and 48 MP",
                        burst: "12 MP, 3/5/7 frames; 48 MP, 3/5 frames",
                        aeb: "12 MP, 3/5/7 frames; 48 MP, 3/5 frames at 0.7 EV step",
                        timed: "12 MP, 2/3/5/7/10/15/20/30/60 s; 48 MP, 5/7/10/15/20/30/60 s"
                    }
                },
                videoResolution: "4K",
                maxVideoBitrate: "H.264/H.265: 130 Mbps",
                digitalZoom: { wideAngle: "1-2.9x", mediumTele: "3-9x" },
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-135° to 70°", roll: "-50° to 50°", pan: "-27° to 27°" },
                controllableRange: { tilt: "-90° to 60°", pan: "-5° to 5°" },
                angularVibrationRange: "±0.0037°"
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
