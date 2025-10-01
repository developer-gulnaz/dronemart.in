// seedProducts.js
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure you have MONGO_URI in your .env
const Product = require('./models/Product'); // Adjust path if needed

// === Your products array ===
const products = [
    // Mini Series
    {
        title: "DJI Mini 2 SE",
        slug: "dji-mini-2-se",
        brand: "DJI",
        category: "Mini Series",
        price: 65000,
        salePrice: 58000,
        image: "assets/img/product/mini 2se.png",
        thumbnails: [
            "assets/img/product/mini-2se-1.png",
            "assets/img/product/mini-2se-2.png",
            "assets/img/product/mini-2se-3.png"
        ],
        badge: "Sale",
        stock: 0,
        inStock: false,
        description: "Entry-level mini drone with solid performance and long battery life.",
        shortDescription: "Lightweight beginner drone with solid performance.",
        specs: {},
        featured: false,
        metaTitle: "DJI Mini 2 SE – Compact Beginner Drone",
        metaDescription:
            "Buy DJI Mini 2 SE drone with 4K video, long flight time, and ultra-lightweight design. Perfect for beginners.",
        keywords: ["DJI", "Mini 2 SE", "Beginner Drone", "4K Video"],
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "DJI Mini 3 pro  Combo",
        slug: "dji-mini-3-pro",
        brand: "DJI",
        category: "Mini Series",
        price: 105000,
        salePrice: 99000,
        image: "assets/img/product/mini32.jpg",
        thumbnails: [
            "assets/img/product/mini 3 flymorejpg",
            "assets/img/product/mini31.jpg",
            "assets/img/product/mini32.jpg",
            "assets/img/product/mini33.jpg",
            "assets/img/product/mini34.jpg",
            "assets/img/product/mini35.jpg",
            "assets/img/product/mini36.jpg"
        ],
        inTheBox: [
            {
                title: "DJI Mini 3",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 1.webp"
            },
            {
                title: "DJI RC",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 2.webp"
            },
            {
                title: "Intelligent Flight Battery Mini 3 Pro",
                quantity: 3,
                image: "assets/img/product/in-the-box/mini 3 pro 3.webp"
            },
            {
                title: "Spare Propellers (Pair) Mini 3 Pro",
                quantity: 3,
                image: "assets/img/product/in-the-box/mini 3 pro 4.webp"
            },
            {
                title: "Shoulder Bag",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 5.webp"
            },
            {
                title: "Two-Way Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 6.webp"
            },
            {
                title: "Spare Screws",
                quantity: 18,
                image: "assets/img/product/in-the-box/mini 3 pro 7.webp"
            },
            {
                title: "Screwdriver Mini 3 Pro",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 9.webp"
            },
            {
                title: "Type-C to Type-C PD Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 10.webp"
            },
            {
                title: "USB-C Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 11.webp"
            },
            {
                title: "Mini 3 Pro Gimbal Protector",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 3 pro 8.webp"
            }
        ],
        badge: "",
        stock: 2,
        inStock: true,
        shortDescription: "Discover the freedom of flight with the DJI Mini 3, a lightweight 135g drone that’s easy to take anywhere.",
        metaTitle: "DJI Mini 3 Pro Combo – Mini Series Drone",
        metaDescription: "Discover the freedom of flight with the DJI Mini 3, a lightweight 135g drone that’s easy to take anywhere.",
        keywords: ["DJI Mini 3 Pro Combo", "Mini Series", "Drone", "Quadcopter", "Aerial Photography", "Camera Drone"],
        description: `Discover the freedom of flight with the DJI Mini 3, a lightweight 135g drone that’s easy to take anywhere. Launch effortlessly with palm takeoff and landing, and capture cinematic moments with 4K ultra-stabilized video. Stay in control with multiple flight options and intelligent modes like Subject Tracking and QuickShots for stunning footage every time. Fly safely with full-coverage propeller guards, and enjoy peace of mind with up to 30-day returns—perfect for exploring your creativity worry-free.`,
        specs: {
            aircraft: {
                weight: "Under 249 g",
                dimensions: {
                    foldedWithoutPropellers: "148×90×62 mm",
                    unfoldedWithPropellers: "251×362×72 mm"
                },
                maxAccelerationSpeed: "5 m/s",
                maxFlightTime: "38 min (Intelligent Flight Battery) | 51 min (Battery Plus)"
            },
            camera: {
                sensor: "1/1.3-inch CMOS, 48MP",
                fov: "82.1°",
                aperture: "f/1.7",
                focusRange: "1 m to ∞",
                maxImageSize: "8K",
                stillModes: {
                    singleShot: "12 MP",
                    burst: "48 MP",
                    timed: "12 MP"
                },
                videoResolution: "4K HDR",
                maxVideoBitrate: "100 Mbps",
                digitalZoom: { "4K": "2x", "2.7K": "3x", "FHD": "4x" },
                imageFormat: "JPEG"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: {
                    tilt: "-135° to 80°",
                    roll: "-135° to 45°",
                    pan: "-30° to 30°"
                },
                controllableRange: {
                    tilt: "-90° to 60°",
                    roll: "-90° or 0°"
                },
                angularVibrationRange: "±0.01°"
            }
        }
        ,
        featured: true
    },

    {
        title: "DJI Mini 4 Pro Combo",
        slug: "dji-mini-4-pro",
        brand: "DJI",
        category: "Mini Series",
        price: 115000,
        salePrice: 102000,
        image: "assets/img/product/mini4pro.jpg",
        thumbnails: [
            "assets/img/product/mini 4 pro.jpg",
            "assets/img/product/mini1.jpg",
            "assets/img/product/mini2.jpg",
            "assets/img/product/mini3.jpg",
            "assets/img/product/mini4.jpg",
            "assets/img/product/mini5.jpg",
            "assets/img/product/mini6.jpg"
        ],
        inTheBox: [
            {
                title: "DJI Mini 4 Pro",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 1.webp"
            },
            {
                title: "DJI RC 2 Remote Controller",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 2.webp"
            },
            {
                title: "Intelligent Flight Battery Mini 4Pro",
                quantity: 3,
                image: "assets/img/product/in-the-box/mini 4 pro 3.webp"
            },
            {
                title: "Two-Way Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 4.webp"
            },
            {
                title: "USB-C Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 5.webp"
            },
            {
                title: "Spare Propellers (Pair) Mini 4 Pro",
                quantity: 3,
                image: "assets/img/product/in-the-box/mini 4 pro 6.webp"
            },
            {
                title: "Screws",
                quantity: 18,
                image: "assets/img/product/in-the-box/mini 4 pro 7.webp"
            },
            {
                title: "Type-C to Type-C PD Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 8.webp"
            },
            {
                title: "Gimbal Protector Mini 4 Pro",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 9.webp"
            },
            {
                title: "Propeller Holder",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 3.webp"
            },
            {
                title: "Shoulder Bag",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini 4 pro 2.webp"
            }
        ],
        badge: "",
        stock: 10,
        inStock: true,
        title: "DJI Mini 4 Pro Combo",
        shortDescription: "High-performance compact drone with advanced 4K video.",
        metaTitle: "DJI Mini 4 Pro Combo - Advanced 4K Camera Drone",
        metaDescription: "DJI Mini 4 Pro Combo delivers advanced 4K video, intelligent flight modes, and compact portability for creative aerial photography.",
        keywords: ["DJI Mini 4 Pro, 4K drone, compact drone, aerial photography"],
        description: "High-performance compact drone with intelligent flight modes and advanced 4K video for creative aerial photography.",
        specs: {
            aircraft: {
                weight: "Under 249 g",
                dimensions: {
                    foldedWithoutPropellers: "148×94×64 mm",
                    unfoldedWithPropellers: "298×373×101 mm"
                },
                maxAccelerationSpeed: "5 m/s (S/N Mode), 3 m/s (C Mode)",
                maxFlightTime: "34 min (Battery) | 45 min (Battery Plus)"
            },
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
                mechanicalRange: {
                    tilt: "-135° to 80°",
                    roll: "-135° to 45°",
                    pan: "-30° to 30°"
                },
                controllableRange: {
                    tilt: "-90° to 60°",
                    roll: "-90° or 0°"
                },
                angularVibrationRange: "±0.01°"
            }
        }
        ,
        featured: true
    },
    {
        title: "DJI Mini 5 Pro",
        slug: "dji-mini-5-pro",
        brand: "DJI",
        price: 135000,
        salePrice: 124000,
        category: "Mini Series",
        image: "assets/img/product/mini5pro-1.jpg",
        thumbnails: [
            "assets/img/product/mini 5 pro 2.jpg",
            "assets/img/product/mini 5 pro 5.jpg",
            "assets/img/product/mini 5 pro 3.jpg",
            "assets/img/product/mini 5 pro 4.jpg",
            "assets/img/product/mini 5 pro 1.file",

        ],
        inTheBox: [
            {
                title: "DJI Mini 5 Pro",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro1.jpg"
            },
            {
                title: "DJI RC Remote Controller",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro2.jpg"
            },
            {
                title: "Intelligent Flight Battery",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro3.jpg"
            },
            {
                title: "Two-Way Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro4.jpg"
            },
            {
                title: "USB-C Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro5.jpg"
            },
            {
                title: "ND Filter Set",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro6.jpg"
            },
            {
                title: "Shoulder Bag",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro7.jpg"
            },
            {
                title: "Gimbal Protector",
                quantity: 1,
                image: "assets/img/product/in-the-box/mini5pro8.jpg"
            }
        ],
        badge: "New",
        stock: 2,
        inStock: true,
        shortDescription: "Ultra-light drone under 249g with 1-inch sensor and 4K/120fps video.",
        metaTitle: "DJI Mini 5 Pro - Ultra-Light 4K Camera Drone",
        metaDescription: "Experience DJI Mini 5 Pro, a lightweight drone with 1-inch sensor, 4K/120fps video, extended flight time, and advanced gimbal rotation.",
        keywords: "DJI Mini 5 Pro, mini drone, 4K drone, 1-inch sensor drone",
        description: "Ultra-light under 249 g drone with a powerful 1-inch CMOS sensor, 4K/120fps video, extended flight time, and advanced gimbal rotation for cinematic creativity.",
        specs: {
            aircraft: {
                weight: "249.9 g ± 4 g",
                dimensions: {
                    foldedWithoutPropellers: "157×95×68 mm",
                    unfoldedWithPropellers: "304×380×91 mm"
                },
                maxAccelerationSpeed: "Max Ascent: 10 m/s (S), 5 m/s (N/C) | Max Descent: 8 m/s (S+Battery Plus), 6 m/s (S), 5 m/s (N/C)",
                maxFlightTime: "36 min (Intelligent Flight Battery) | 52 min (Battery Plus)"
            },
            camera: {
                sensor: "1-inch CMOS, 50MP",
                fov: "84°",
                aperture: "f/1.8",
                focusRange: "0.5 m to ∞",
                maxImageSize: "8192×6144",
                stillModes: {
                    singleShot: "12 MP and 50 MP",
                    burst: "12 MP: 3/5/7 frames, 50 MP: 3/5 frames",
                    timed: "12 MP: 2/3/5/7/10/15/20/30/60 s, 50 MP: 5/7/10/15/20/30/60 s"
                },
                videoResolution: "4K: 3840×2160@24/25/30/48/50/60/120 fps, FHD: 1920×1080@24/25/30/48/50/60/120/240 fps",
                maxVideoBitrate: "H.264/H.265: 130 Mbps",
                digitalZoom: { "12MP Photo": "1-3x", "4K": "1-3x", "FHD": "1-4x" },
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: {
                    tilt: "-135° to 80°",
                    roll: "-230° to 95°",
                    pan: "-25° to 25°"
                },
                controllableRange: {
                    tilt: "-90° to 55°",
                    roll: "-180° to 45°"
                },
                angularVibrationRange: "±0.005°"
            }
        },
        featured: true
    },

    {
        title: "DJI Neo",
        category: "Neo Series",
        slug: "dji-neo",
        brand: "DJI",
        price: 48000,
        salePrice: 42000,
        image: "assets/img/product/neo2.jpg",
        thumbnails: [
            "assets/img/product/Neo combo.jpg",
            "assets/img/product/neo1.jpg",
            "assets/img/product/neo2.jpg",
            "assets/img/product/neo3.jpg",
            "assets/img/product/neo5.jpg",
            "assets/img/product/neo5.jpg",
        ],
        inTheBox: [
            {
                title: "DJI Neo",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 1.webp"
            },
            {
                title: "DJI RC-N3 Remote Controller",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 2.webp"
            },
            {
                title: "Intelligent Flight Battery",
                quantity: 3,
                image: "assets/img/product/in-the-box/neo 3.webp"
            },
            {
                title: "RC Cable (USB-C Connector)",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 4.webp"
            },
            {
                title: "DJI Neo Two-Way Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 5.webp"
            },
            {
                title: "DJI Neo Spare Propellers (Pair)",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 6.webp"
            },
            {
                title: "Propeller Guard (Pair)",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 7.webp"
            },
            {
                title: "DJI Neo Gimbal Protector",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 8.webp"
            },
            {
                title: "Type-C to Type-C PD Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 9.webp"
            },
            {
                title: "DJI Neo Screwdriver",
                quantity: 1,
                image: "assets/img/product/in-the-box/neo 10.webp"
            },
            {
                title: "Spare Propeller Screw",
                quantity: 4,
                image: "assets/img/product/in-the-box/neo 11.webp"
            }
        ]
        ,
        badge: "Trending",
        stock: 3,
        inStock: true,
        shortDescription: "Super compact lightweight drone perfect for beginners and casual flyers.",
        metaTitle: "DJI Neo Drone - Compact 4K Camera Drone",
        metaDescription: "DJI Neo offers a lightweight design, 4K video, and easy photography for beginners and casual flyers.",
        keywords: "DJI Neo, compact drone, beginner drone, 4K camera drone",
        description: "Super compact lightweight drone perfect for beginners and casual flyers. Capture 4K video and photos easily.",
        specs: {
            aircraft: {
                weight: "Approx. 135 g",
                dimensions: {
                    foldedWithoutPropellers: "130×157×48.5 mm",
                    unfoldedWithPropellers: ""
                },
                maxAccelerationSpeed: "0.5 m/s (Cine), 2 m/s (Normal), 3 m/s (Sport)",
                maxFlightTime: "Approx. 18 min"
            },
            camera: {
                sensor: "1/2-inch image sensor",
                fov: "117.6°",
                aperture: "f/2.8",
                focusRange: "0.6 m to ∞",
                maxImageSize: "12 MP | Photo: 4K (4:3) | 4K (16:9)",
                stillModes: {
                    singleShot: "Single/Timed Shot"
                },
                videoResolution: "EIS Off: 4K (4:3) @30fps, 1080p up to 60fps; EIS On: 4K (16:9) @30fps, 1080p up to 60fps; Vertical: 1080p (9:16) up to 60fps",
                maxVideoBitrate: "75 Mbps",
                digitalZoom: {},
                imageFormat: "JPEG"
            },
            gimbal: {
                stabilization: "Single-axis mechanical gimbal (tilt)",
                mechanicalRange: { tilt: "-120° to 120°" },
                controllableRange: { tilt: "-90° to 60°" },
                angularVibrationRange: "±0.01°"
            }
        }
        ,
        featured: false
    },

    // Air Series
    {
        title: "DJI Air 3S Fly More Combo Lite",
        category: "Air Series",
        slug: "dji-air-3s",
        brand: "DJI",
        price: 143000,
        salePrice: 136000,
        image: "assets/img/product/air3s3.jpg",
        thumbnails: [
            "assets/img/product/air3s2.jpg",
            "assets/img/product/air3s3.jpg",
            "assets/img/product/air3s4.jpg",
            "assets/img/product/air3s5.jpg",
            "assets/img/product/air3s6.jpg",
            "assets/img/product/air3s7.jpg",
        ],
        inTheBox: [
            {
                title: "DJI Air 3S",
                quantity: 1,
                image: "assets/img/product/in-the-box/air 3s 1.webp"
            },
            {
                title: "DJI RC 2 Remote Controller",
                quantity: 1,
                image: "assets/img/product/in-the-box/air 3s 2.webp"
            },
            {
                title: "Battery Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/air 3s 3.webp"
            },
            {
                title: "Intelligent Flight Battery",
                quantity: 3,
                image: "assets/img/product/in-the-box/air 3s 4.webp"
            },
            {
                title: "ND Filter Set (ND8/32/128)",
                quantity: 1,
                image: "assets/img/product/in-the-box/air 3s 5.webp"
            },
            {
                title: "Spare Propellers (Pair)",
                quantity: 1,
                image: "assets/img/product/in-the-box/air 3s 6.webp"
            },
            {
                title: "Type-C to Type-C PD Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/air 3s 7.webp"
            },
            {
                title: "Gimbal Protector",
                quantity: 1,
                image: "assets/img/product/in-the-box/air 3s 8.webp"
            }
        ],
        badge: "Best Seller",
        stock: 1,
        inStock: true,
        shortDescription: "Dual-camera drone delivering 5.4K video and 20MP photos.",
        metaTitle: "DJI Air 3S - Dual-Camera Drone with 5.4K Video",
        metaDescription: "Capture stunning 5.4K video and 20MP photos with DJI Air 3S, featuring omnidirectional obstacle sensing and long flight times.",
        keywords: "DJI Air 3S, dual-camera drone, 5.4K video drone, aerial photography",
        description: "Dual-camera drone delivering 5.4K video, 20MP photos, omnidirectional obstacle sensing, and long flight times.",
        specs: {
            aircraft: {
                weight: "724 g",
                dimensions: { foldedWithoutPropellers: "214.19×100.63×89.17 mm", unfoldedWithPropellers: "266.11×325.47×106.00 mm" },
                maxAccelerationSpeed: "",
                maxFlightTime: "45 minutes"
            },
            camera: {
                sensor: "1-inch CMOS, 50MP",
                fov: "84°",
                aperture: "f/1.8",
                focusRange: "0.5 m to ∞",
                maxImageSize: "8192×6144",
                stillModes: { singleShot: "", burst: "" },
                videoResolution: "4K",
                maxVideoBitrate: "130 Mbps",
                digitalZoom: "1-2.9x",
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: "",
                controllableRange: "",
                angularVibrationRange: "±0.0037°"
            }
        }
        ,
        featured: true
    },

    // Mavic Series
    {
        title: "DJI Mavic 3 Pro Combo",
        category: "Mavic Series",
        slug: "dji-mavic-3-pro",
        brand: "DJI",
        price: 230000,
        salePrice: 241000,
        image: "assets/img/product/mavic3pro6.jpg",
        badge: "",
        stock: 2,
        inStock: true,
        thumbnails: [
            "assets/img/product/mavic3pro1.jpg",
            "assets/img/product/mavic3pro2.jpg",
            "assets/img/product/mavic3pro3.jpg",
            "assets/img/product/mavic3pro4.jpg",
            "assets/img/product/mavic3pro5.jpg",
            "assets/img/product/mavic3pro6.jpg",
            "assets/img/product/mavic3pro7.jpg"
        ],
        inTheBox: [
            {
                title: "DJI Mavic 3 Pro",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 1.png"
            },
            {
                title: "DJI RC Pro",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 2.png"
            },
            {
                title: "DJI RC Pro Control Sticks (Pair)",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 3.png"
            },
            {
                title: "DJI Mavic 3 Series Intelligent Flight Battery",
                quantity: 3,
                image: "assets/img/product/in-the-box/mavic 3 pro 4.png"
            },
            {
                title: "DJI Mavic 3 Series Low-Noise Propellers (Pair)",
                quantity: 6,
                image: "assets/img/product/in-the-box/mavic 3 pro 5.png"
            },
            {
                title: "DJI 100W USB-C Power Adapter AC Power Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 6.png"
            },
            {
                title: "DJI 100W USB-C Power Adapter",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 7.png"
            },
            {
                title: "USB-C to USB-C Cable",
                quantity: 2,
                image: "assets/img/product/in-the-box/mavic 3 pro 8.png"
            },
            {
                title: "DJI Mavic 3 Battery Charging Hub (100W)",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 9.png"
            },
            {
                title: "DJI Mavic 3 Pro Storage Cover",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 10.png"
            },
            {
                title: "DJI Mavic 3 Pro ND Filters Set (ND8/16/32/64)",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 11.png"
            },
            {
                title: "DJI Shoulder Bag",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 3 pro 12.png"
            }
        ],

        description: "Professional drone with superior camera and flight capabilities.",
        shortDescription: "Professional drone with superior camera and flight capabilities.",
        metaTitle: "DJI Mavic 3 Pro - Professional Camera Drone",
        metaDescription: "DJI Mavic 3 Pro offers professional-grade cameras, advanced flight modes, and long-range capabilities for cinematic photography.",
        keywords: "DJI Mavic 3 Pro, professional drone, cinematic drone, high-end drone",
        specs: {
            aircraft: {
                weight: "958 g",
                dimensions: { foldedWithoutPropellers: "231.1×98×95.4 mm", unfoldedWithPropellers: "347.5×290.8×107.7 mm" },
                maxAccelerationSpeed: "8 m/s",
                maxFlightTime: "43 minutes"
            },
            camera: {
                sensor: "4/3 CMOS, 20MP",
                fov: "84°",
                aperture: "f/2.8-f/11",
                focusRange: "1 m to ∞",
                maxImageSize: "5.3K",
                stillModes: { singleShot: "20 MP", burst: "3/5/7 frames" },
                videoResolution: "Up to 5.1K/50fps, DCI 4K/120fps, FHD/200fps",
                maxVideoBitrate: "200 / 3772 / 2514 / 1750 Mbps",
                digitalZoom: "1-3x",
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: { tilt: "-140° to 50°", roll: "-50° to 50°", pan: "-23° to 23°" },
                controllableRange: { tilt: "-90° to 35°", roll: "", pan: "-5° to 5°" },
                angularVibrationRange: "±0.003°"
            }
        }
        , featured: true
    },
    {
        title: "DJI Mavic 4 Pro Creator Combo",
        category: "Mavic Series",
        slug: "dji-mavic-4-pro",
        brand: "DJI",
        price: 372000,
        salePrice: 360000,
        image: "assets/img/product/mavic 4pro.png",
        thumbnails: [
            "assets/img/product/mavic 4 pro 1.png",
            "assets/img/product/mavic 4 pro flymore.webp"
        ],
        inTheBox: [
            {
                title: "DJI Mavic 4 Pro",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 4 pro 1.webp"
            },
            {
                title: "DJI RC Pro 2",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 4 pro 2.png"
            },
            {
                title: "DJI Mavic 4 Pro Intelligent Flight Battery",
                quantity: 3,
                image: "assets/img/product/in-the-box/mavic 4 pro 3.webp"
            },
            {
                title: "DJI Mavic 4 Pro Spare Propellers (Pair)",
                quantity: 4,
                image: "assets/img/product/in-the-box/mavic 4 pro 4.webp"
            },
            {
                title: "DJI Mavic 4 Pro Storage Cover",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 4 pro 5.webp"
            },
            {
                title: "240W USB-C Power Adapter",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 4 pro 6.webp"
            },
            {
                title: "USB-C to USB-C High-Speed Data Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 4 pro 7.webp"
            },
            {
                title: "DJI Mavic 4 Pro Parallel Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 4 pro 8.webp"
            },
            {
                title: "DJI Mavic Shoulder Bag",
                quantity: 1,
                image: "assets/img/product/in-the-box/mavic 4 pro 9.webp"
            }
        ],
        badge: "Featured",
        stock: 2,
        inStock: true,
        shortDescription: "Ultimate creative freedom with triple-camera Hasselblad system.",
        metaTitle: "DJI Mavic 4 Pro Creator - Triple Camera Drone",
        metaDescription: "DJI Mavic 4 Pro Creator Combo provides triple-camera Hasselblad system, 6K video, and complete filmmaking package.",
        keywords: "DJI Mavic 4 Pro, Hasselblad drone, filmmaking drone, 6K video drone",
        description: "Ultimate creative freedom with triple-camera Hasselblad system, 6K video, and full filmmaking package.",
        specs: {
            aircraft: {
                weight: "Approx. 1063 g",
                dimensions: {
                    foldedWithoutPropellers: "257.6×124.8×103.4 mm",
                    unfoldedWithPropellers: "328.7×390.5×135.2 mm"
                },
                maxAccelerationSpeed: "10 m/s (Sport Mode), 6 m/s (Normal Mode), 6 m/s (Cine Mode)",
                maxFlightTime: "51 minutes"
            },
            camera: {
                sensor: "4/3 CMOS",
                fov: "72°",
                aperture: "f/2.0 to f/11",
                focusRange: "2 m to ∞",
                maxImageSize: "12K",
                stillModes: { singleShot: "25 MP, 100 MP", burst: "" },
                videoResolution: "6016×3384 up to 60fps",
                maxVideoBitrate: "90 Mbps (H.264), 180 Mbps (H.265), 1200 Mbps (ALL-I)",
                digitalZoom: "1x to 2.5x",
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: "",
                controllableRange: "",
                angularVibrationRange: "±0.001° to ±0.005°"
            }
        }
        ,
        featured: true
    },

    // Avata Series
    {
        title: "DJI Avata 2",
        category: "Avata Series",
        slug: "dji-avata-2",
        brand: "DJI",
        price: 120000,
        salePrice: 111000,
        image: "assets/img/product/avata 21.png",
        thumbnails: [
            "assets/img/product/Dji Avata2.AVIF",
            "assets/img/product/avata 2 2.webp",
            "assets/img/product/AVATA_2.webp",
            "assets/img/product/avata 2 3.webp",
            "assets/img/product/avata 21.png",
            "assets/img/product/avata 2 4.webp"
        ],
        inTheBox: [
            {
                title: "DJI Avata 2",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 1.png"
            },
            {
                title: "DJI Goggles 3",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 2.png"
            },
            {
                title: "DJI RC Motion 3",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 3.png"
            },
            {
                title: "DJI Avata 2 Propellers (Pair)",
                quantity: 4,
                image: "assets/img/product/in-the-box/avata 2 4.png"
            },
            {
                title: "DJI Sling Bag",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 5.png"
            },
            {
                title: "DJI Avata 2 Two-Way Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 6.png"
            },
            {
                title: "DJI Avata 2 Intelligent Flight Battery",
                quantity: 2,
                image: "assets/img/product/in-the-box/avata 2 7.png"
            },
            {
                title: "DJI Goggles 3 -2.0D Corrective Lenses (Pair)",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 8.png"
            },
            {
                title: "Type-C to Type-C PD Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 9.png"
            },
            {
                title: "USB-C OTG Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 10.png"
            },
            {
                title: "DJI RC Motion 3 Lanyard",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 11.png"
            },
            {
                title: "Screwdriver",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 12.png"
            },
            {
                title: "DJI Avata 2 Gimbal Protector",
                quantity: 1,
                image: "assets/img/product/in-the-box/avata 2 13.png"
            },
            {
                title: "DJI Avata 2 Propeller Screw",
                quantity: 16,
                image: "assets/img/product/in-the-box/avata 2 14.png"
            }
        ],
        badge: "Trending",
        stock: 2,
        inStock: true,
        description: "Immersive FPV drone capturing 4K HDR video with ultra-wide FOV and RockSteady stabilization.",
        shortDescription: "Immersive FPV drone capturing 4K HDR video with ultra-wide FOV.",
        metaTitle: "DJI Avata 2 - FPV 4K HDR Drone",
        metaDescription: "Fly DJI Avata 2, an immersive FPV drone capturing stunning 4K HDR video with ultra-wide FOV and RockSteady stabilization.",
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
                maxFlightTime: "Approx. 23 mins"
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

    // Inspire Series
    // {
    //     title: "DJI Inspire 3",
    //     category: "Inspire Series",
    //     slug: "dji-inspire-3",
    //     brand: "DJI",
    //     price: 250000,
    //     salePrice: 239000,
    //     image: "assets/img/product/inspire3.jpg",
    //     badge: "Premium",
    //     stock: 1,
    //     description: "Flagship professional drone for cinematic aerial filmmaking.",
    //     specs: {},
    //     featured: true
    // },

    // Flip Series
    {
        title: "Flip RC2",
        category: "Flip Series",
        slug: "dji-flip-rc2",
        brand: "DJI",
        price: 81000,
        salePrice: 72000,
        image: "assets/img/product/flip4.jpg",
        thumbnails: [
            "assets/img/product/flip1.jpg",
            "assets/img/product/flip2.jpg",
            "assets/img/product/flip3.jpg",
            "assets/img/product/flip4.jpg",
            "assets/img/product/flip5.jpg",
            "assets/img/product/flip6.jpg"
        ],
        inTheBox: [
            {
                title: "DJI Flip",
                quantity: 1,
                image: "assets/img/product/in-the-box/flip 1.webp"
            },
            {
                title: "DJI RC",
                quantity: 1,
                image: "assets/img/product/in-the-box/flip 2.webp"
            },
            {
                title: "DJI Flip Intelligent Flight Battery",
                quantity: 3,
                image: "assets/img/product/in-the-box/flip 3.webp"
            },
            {
                title: "Parallel Charging Hub",
                quantity: 1,
                image: "assets/img/product/in-the-box/flip 4.webp"
            },
            {
                title: "Spare Propellers (Pair) (Screws Included)",
                quantity: 3,
                image: "assets/img/product/in-the-box/flip 5.webp"
            },
            {
                title: "DJI Flip Screwdriver",
                quantity: 1,
                image: "assets/img/product/in-the-box/flip 6.webp"
            },
            {
                title: "DJI Flip Gimbal Protector",
                quantity: 1,
                image: "assets/img/product/in-the-box/flip 7.webp"
            },
            {
                title: "Type-C to Type-C PD Cable",
                quantity: 1,
                image: "assets/img/product/in-the-box/flip 8.webp"
            },
            {
                title: "DJI Flip Shoulder Bag",
                quantity: 1,
                image: "assets/img/product/in-the-box/flip 9.webp"
            }
        ],
        badge: "Trending",
        stock: 2,
        inStock: true,
        description: "Beginner-friendly drone with stable flight and HD camera.",
        shortDescription: "Beginner-friendly drone with stable flight and HD camera.",
        metaTitle: "Flip RC2 Drone - Beginner Friendly HD Drone",
        metaDescription: "Flip RC2 offers stable flight, easy controls, and HD camera, perfect for beginners.",
        keywords: "Flip RC2, beginner drone, HD camera drone, easy-to-fly drone",
        specs: {
            aircraft: {
                weight: "< 249 g",
                dimensions: { folded: "136×62×165 mm", unfolded: "233×280×79 mm" },
                maxAccelerationSpeed: "5 m/s (Sport mode), 5 m/s (Normal mode), 2 m/s (Cine mode)",
                maxFlightTime: "31 minutes"
            },
            camera: {
                sensor: "1/1.3-inch image sensor",
                fov: "82.1°",
                formatEquivalent: "24 mm",
                aperture: "f/1.7",
                focusRange: "1 m to ∞",
                maxImageSize: "48MP Photo 8064×6048",
                stillModes: { singleShot: "12 MP and 48 MP", burst: "12 MP, 3/5/7 frames", aeb: "12 MP, 3/5/7 frames at 2/3 EV step", timed: "12 MP, 2/3/5/7/10/15/20/30/60 s" },
                videoResolution: "4K 3840×2160 @ 24–60/100fps, FHD 1920×1080 @ 24–60/100fps, 2.7K Vertical 1512×2688 @ 24–30fps, FHD Vertical 1080×1920 @ 24–30fps",
                maxVideoBitrate: "150 Mbps",
                digitalZoom: "4K: 3x, FHD: 4x, 2.7K Vertical: 3x, FHD Vertical: 4x, 12 MP Photo: 3x",
                imageFormat: "JPEG/DNG/RAW"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: "tilt: -130° to +63°, roll: -47° to +47°, pan: -30° to +30°",
                controllableRange: "tilt: -90° to +35°",
                angularVibrationRange: "±0.01°"
            }
        },
        featured: false
    },

    // Air Series
    {
        title: "DJI Air 2S",
        category: "Air Series",
        slug: "dji-air-2s",
        brand: "DJI",
        price: 128000,
        salePrice: 120000,
        image: "assets/img/product/air2s.jpg",
        badge: "",
        stock: 0,
        inStock: false,
        description: "Advanced Air Series drone with 1-inch sensor, 4K video, and intelligent flight modes.",
        shortDescription: "Advanced Air Series drone with 1-inch sensor and 4K video.",
        metaTitle: "DJI Air 2S - Advanced 4K Camera Drone",
        metaDescription: "DJI Air 2S delivers 4K video, 1-inch sensor, and intelligent flight modes for professional aerial photography.",
        keywords: "DJI Air 2S, 4K drone, 1-inch sensor drone, Air Series drone",
        specs: {
            aircraft: {
                weight: "724 g",
                dimensions: { folded: "214.19×100.63×89.17 mm", unfolded: "266.11×325.47×106.00 mm" },
                maxFlightTime: "45 minutes"
            },
            camera: {
                sensor: "Wide-Angle: 1-inch CMOS, 50MP; Medium Tele: 1/1.3-inch CMOS, 48MP",
                fov: "Wide-Angle: 84°, Medium Tele: 35°",
                formatEquivalent: "Wide-Angle: 24 mm, Medium Tele: 70 mm",
                aperture: "Wide-Angle: f/1.8, Medium Tele: f/2.8",
                focusRange: "Wide-Angle: 0.5 m to ∞, Medium Tele: 3 m to ∞",
                maxImageSize: "Wide-Angle: 8192×6144, Medium Tele: 8064×6048",
                stillModes: "Wide-Angle: Single 12/50 MP, Burst 12/50 MP frames, AEB 12/50 MP, Timed 12/50 MP; Medium Tele: Single 12/48 MP, Burst 12/48 MP frames, AEB 12/48 MP, Timed 12/48 MP",
                videoResolution: "4K",
                maxVideoBitrate: "H.264/H.265: 130 Mbps",
                digitalZoom: "Wide-Angle: 1-2.9x, Medium Tele: 3-9x",
                imageFormat: "JPEG/DNG (RAW)"
            },
            gimbal: {
                stabilization: "3-axis mechanical gimbal (tilt, roll, pan)",
                mechanicalRange: "tilt: -135° to 70°, roll: -50° to 50°, pan: -27° to 27°",
                controllableRange: "tilt: -90° to 60°, pan: -5° to 5°",
                angularVibrationRange: "±0.0037°"
            }
        },
        featured: false
    },
    {
        title: "AgroWingz AW20C 20L Hexacopter Spraying Drone",
        slug: "agrowingz-20l",
        category: "Agriculture",
        brand: "EFT",
        price: 215000,
        salePrice: 195000,
        badge: "Professional",
        stock: 5,
        inStock: true,
        image: "assets/img/product/specialized/agroWingz 20L.png",
        thumbnails: [
            "assets/img/product/specialized/agroWingz 20L.png",
            "assets/img/product/specialized/agroWingz 20L_1.png",
            "assets/img/product/specialized/agroWingz 20L_2.png",
            "assets/img/product/specialized/agroWingz 20L_3.png",
            "assets/img/product/specialized/agroWingz 20L_4.png",
            "assets/img/product/specialized/agroWingz 20L_5.png",
            "assets/img/product/specialized/agroWingz 20L_6.png",
            "assets/img/product/specialized/agroWingz 20L_7.jpeg"
        ],
        description: `The **AgroWingz AW20C 20L Hexacopter** is a **professional agricultural drone** built for precision crop spraying. Its **20L tank** enables accurate application of fertilizers, pesticides, and nutrients, reducing waste. With **GPS positioning** and **waypoint navigation**, it covers large fields efficiently. The **foldable frame** ensures easy transport, while the **high payload capacity** and **advanced flight control system** guarantee stability and reliability. Perfect for farms of all sizes, it improves **productivity and efficiency** in modern agriculture.`,
        shortDescription: "20L agricultural spraying drone with GPS navigation and robust foldable design.",
        specs: {
            aircraft: {
                weight: "23.5 kg",
                dimensions: {
                    folded: "1224 x 1203 x 660 mm",
                    unfolded: "2717 x 2717 x 660 mm"
                },
                maxFlightTime: "Depends on payload",
                payloadCapacity: "46.5 kg",
                propellerType: "34 inch",
                batteryCells: "14S LiPo",
                ESCRequired: "80A FOC",
                wheelbase: "1854 mm"
            },
            tank: {
                capacity: "20 Liters",
                type: "Brushless Pump with 8L/min output"
            },
            features: [
                "Efficient Agricultural Spraying",
                "Classic Folding Body for Easy Transport",
                "High Payload Capacity",
                "GPS Positioning & Waypoint Navigation",
                "Robust Build for Harsh Environments",
                "Integrated Power Supply Wiring",
                "Precision and Accuracy",
                "Scalable and Customizable"
            ]
        },
        inTheBox: [
            { title: "E620P Drone Frame", quantity: 1 },
            { title: "20L Tank", quantity: 1 },
            { title: "Hobbywing X9 Motor CW", quantity: 3 },
            { title: "Hobbywing X9 Motor CCW", quantity: 3 },
            { title: "Drone Propeller CW", quantity: 3 },
            { title: "Drone Propeller CCW", quantity: 3 },
            { title: "Brushless Pump 8L", quantity: 1 },
            { title: "Extended Spray Bar", quantity: 4 },
            { title: "Universal Spray Pneumatic Bracket", quantity: 1 },
            { title: "RTK Mount", quantity: 1 },
            { title: "Front Radar Mount", quantity: 1 },
            { title: "Height Radar Mount", quantity: 1 }
        ],

        rating: 0,
        reviews: 0,
        featured: true,
        metaTitle: "AgroWingz AW20C 20L Hexacopter Agricultural Spraying Drone",
        metaDescription: "EFT E620P 20L Hexacopter Drone Kit for precision crop spraying with GPS navigation, high payload capacity, and robust build.",
        keywords: ["EFT E620P", "20L spraying drone", "agricultural drone", "hexacopter drone"],
        createdAt: new Date(),
        updatedAt: new Date()
    }
];


async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Existing products removed");

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
