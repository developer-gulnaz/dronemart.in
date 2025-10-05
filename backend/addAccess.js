const mongoose = require('mongoose');
require('dotenv').config();
const Accessory = require('./models/Accessory'); // adjust path if needed

async function seedAccessories() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Array of accessories to seed
        const accessories = [
            {
                title: "Hobbywing XROTOR X9 CW/CCW 110KV Motor Combo",
                slug: "hobbywing-xrotor-x9-motor-combo",
                category: "Motors & Propulsion",
                brand: "Hobbywing",
                price: 29000,
                salePrice: 23000,
                productCategory: "agriculture",
                stock: 50,
                inStock: true,
                image: "assets/img/product/specialized/hobbywing-motor-X9.webp",
                thumbnails: [
                    "assets/img/product/specialized/hobbywing-motor-X9.webp",
                    "assets/img/product/specialized/hobbywing-motor-X92.webp",
                    "assets/img/product/specialized/hobbywing-motor-X93.webp",
                    "assets/img/product/specialized/hobbywing-motor-X94.webp"
                ],
                description: `The Hobbywing XROTOR X9 Motor Combo is a high-performance brushless motor set designed for heavy-lift drones.
                    It comes with a built-in 80A FOC ESC and an optimized propeller for smooth, efficient flight.
                    Available in both CW and CCW versions, it ensures stability and precise control.
                    Lightweight and compact, it integrates seamlessly with various drone frames.
                    Perfect for agricultural, industrial, or hobbyist drones requiring reliable power and long flight endurance.`,
                shortDescription: "High-performance motor combo with built-in ESC & propeller for heavy-lift drones.",
                specs: {
                    propulsion: {
                        motorType: "Brushless X9 110KV",
                        propellerSize: "34 inch",
                        esc: "80A FOC",
                        battery: "14S LiPo compatible",
                        operatingVoltage: "52V"
                    }
                },
                inTheBox: [
                    { title: "Motor CW", quantity: 1 },
                    { title: "Motor CCW", quantity: 1 },
                    { title: "Propeller", quantity: 2 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Hobbywing XROTOR X9 Motor Combo for Drones",
                metaDescription: "Buy Hobbywing XROTOR X9 CW/CCW 110KV motor combo with built-in ESC and propeller for drones. Perfect for heavy-lift applications.",
                keywords: ["Hobbywing", "XROTOR X9", "Drone Motor", "Brushless Motor"]
            },

            {
                title: "6A10L 10L 6 axis Agricultural Spraying Drone Frame",
                slug: "6a10l-6axis-droneframe",
                category: "Drone Frames",
                brand: "EFT",
                price: 37449,
                salePrice: 35349,
                productCategory: "agriculture",
                stock: 2,
                inStock: true,
                image: "assets/img/product/specialized/agroWingz_AW6_10L_Frame.jpg",
                thumbnails: [
                    "assets/img/product/specialized/agroWingz_AW6_10L_Frame.jpg",
                    "assets/img/product/specialized/agroWingz_AW6_10L_Frame1.jpg",
                    "assets/img/product/specialized/agroWingz_AW6_10L_Frame2.jpg"
                ],
                description: `The EFT 6A10L 6-Axis Agricultural Drone Frame is a sturdy, ultra-lightweight, and highly precise frame, designed for heavy-duty agricultural use. 
                Made from advanced engineering materials, it is super strong, smooth, and easy to assemble/disassemble. Foldable propellers and durable construction ensure resilience in harsh environments.`,
                shortDescription: "Durable, lightweight 6-axis agricultural drone frame with folding propellers.",
                specs: {
                    frame: {
                        modelType: "Drone Frame",
                        propellerDiameter: "23-24 inch",
                        supplyVoltage: "12S",
                        wheelbase: "1404mm",
                        tankCapacity: "10L",
                        frameWeight: "5kg",
                        shippingWeight: "9.678kg",
                        shippingDimensions: "71 × 47 × 45 cm",
                        foldingPropeller: true,
                        material: "Advanced Engineering Material",
                        durability: "High-duty, tough, and precise"
                    }
                },
                inTheBox: [
                    { title: "EFT 6A10L 6 Axis Drone Frame", quantity: 1 },
                    { title: "10L Capacitive Tank", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "EFT 6A10L 6-Axis Agricultural Drone Frame",
                metaDescription: "Buy EFT 6A10L 6-Axis Agricultural Drone Frame. Durable, ultra-lightweight, easy-to-assemble hexacopter frame for agricultural drones.",
                keywords: ["EFT", "6A10L", "Drone Frame", "6-Axis", "Agriculture Drone", "10L Drone Frame"]
            },

            {
                title: "6A16L 16L 6 Axis Agricultural Drone Frame",
                slug: "6a16l-6axis-droneframe",
                category: "Drone Frames",
                brand: "EFT",
                price: 49449,
                salePrice: 44449,
                productCategory: "agriculture",
                stock: 2,
                inStock: true,
                image: "assets/img/product/specialized/agroWingz_AW6_16L_Frame.jpg",
                thumbnails: [
                    "assets/img/product/specialized/agroWingz_AW6_16L_Frame.jpg",
                    "assets/img/product/specialized/agroWingz_AW6_16L_Frame2.jpg",
                ],
                description: `The 6A16L 16L 6-Axis Agricultural Drone Frame is a sturdy, ultra-lightweight, and highly precise frame designed for heavy-duty agricultural use. 
                    Made from advanced engineering materials, it is super strong, smooth, and easy to assemble/disassemble. Foldable propellers and durable construction ensure resilience in harsh environments. Ideal for spraying and other agricultural tasks with high efficiency.`,
                shortDescription: "Durable, lightweight 16L 6-axis agricultural drone frame with folding propellers.",
                specs: {
                    frame: {
                        modelType: "Drone Frame",
                        propellerDiameter: "28-32 inch",
                        supplyVoltage: "12S",
                        wheelbase: "1628mm",
                        openingSize: "1720 x 1500 x 556mm",
                        foldingSize: "1073 x 956 x 546mm",
                        tankCapacity: "16L",
                        frameWeight: "7kg",
                        shippingWeight: "10kg",
                        shippingDimensions: "80 × 50 × 50 cm",
                        foldingPropeller: true,
                        material: "Advanced Engineering Material",
                        durability: "High-duty, tough, and precise"
                    }
                },
                inTheBox: [
                    { title: "6A16L 16L 6 Axis Drone Frame", quantity: 1 },
                    { title: "16L Capacitive Tank", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "6A16L 16L 6-Axis Agricultural Drone Frame",
                metaDescription: "Buy 6A16L 16L 6-Axis Agricultural Drone Frame. Durable, ultra-lightweight, easy-to-assemble hexacopter frame for agricultural drones.",
                keywords: ["6A16L", "Drone Frame", "6-Axis", "Agriculture Drone", "16L Drone Frame"]
            },

            {
                title: "4A10L 10L 4 Axis Agricultural Drone Frame",
                slug: "4a10l-4axis-droneframe",
                category: "Drone Frames",
                brand: "EFT",
                price: 43449,
                salePrice: 39439,
                productCategory: "agriculture-quadcopter",
                stock: 5,
                inStock: true,
                image: "assets/img/product/specialized/agroWingz_AW4_10L_Frame1.jpg",
                thumbnails: [
                    "assets/img/product/specialized/agroWingz_AW4_10L_Frame1.jpg",
                    "assets/img/product/specialized/agroWingz_AW4_10L_Frame.jpg",
                    "assets/img/product/specialized/agroWingz_AW4_10L_Frame2.jpg"
                ],
                description: `The 4A10L 10L 4-Axis Agricultural Drone Frame is a sturdy, ultra-lightweight, and highly precise frame designed for heavy-duty agricultural use. 
Made from advanced engineering materials, it is super strong, smooth, and easy to assemble/disassemble. Foldable propellers and durable construction ensure resilience in harsh environments. Ideal for spraying and other agricultural tasks with high efficiency.`,
                shortDescription: "Durable, lightweight 10L 4-axis agricultural drone frame with folding propellers.",
                specs: {
                    frame: {
                        modelType: "Drone Frame",
                        propellerDiameter: "30 inch",
                        supplyVoltage: "12S",
                        wheelbase: "1416mm",
                        openingSize: "1075 x 1075 x 490mm",
                        foldingSize: "635 x 666 x 490mm",
                        tankCapacity: "10L",
                        frameWeight: "6kg",
                        shippingWeight: "8.793kg",
                        shippingDimensions: "71 × 46 × 43 cm",
                        foldingPropeller: true,
                        material: "Advanced Engineering Material",
                        durability: "High-duty, tough, and precise"
                    }
                },
                inTheBox: [
                    { title: "4A10L 10L 4 Axis Drone Frame", quantity: 1 },
                    { title: "10L Capacitive Tank", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "4A10L 10L 4 Axis Agricultural Drone Frame",
                metaDescription: "Buy 4A10L 10L 4 Axis Agricultural Drone Frame. Durable, ultra-lightweight, easy-to-assemble quadcopter frame for agricultural drones.",
                keywords: ["4A10L", "Drone Frame", "4-Axis", "Agriculture Drone", "10L Drone Frame"]
            },

            {
                title: "4A16L 16L 4 Axis Agricultural Drone Frame",
                slug: "4a16l-4axis-droneframe",
                category: "Drone Frames",
                brand: "EFT",
                price: 44237,
                salePrice: 44237,
                productCategory: "agriculture-quadcopter",
                stock: 2,
                inStock: true,
                image: "assets/img/product/specialized/agroWingz_AW4_16L_Frame2.jpg",
                thumbnails: [
                    "assets/img/product/specialized/agroWingz_AW4_16L_Frame1.jpg",
                    "assets/img/product/specialized/agroWingz_AW4_16L_Frame2.jpg",
                    "assets/img/product/specialized/agroWingz_AW4_16L_Frame3.jpg",
                    "assets/img/product/specialized/agroWingz_AW4_16L_Frame4.jpg"
                ],
                description: `The 4A16L 16L 4-Axis Agricultural Drone Frame is a sturdy, ultra-lightweight, and highly precise frame designed for heavy-duty agricultural use. 
Made from advanced engineering materials, it is super strong, smooth, and easy to assemble/disassemble. Comes with folding propellers and durable construction, ensuring resilience in harsh environments. Ideal for spraying and other agricultural tasks efficiently.`,
                shortDescription: "Durable, lightweight 16L 4-axis agricultural drone frame with folding propellers.",
                specs: {
                    frame: {
                        modelType: "Drone Frame",
                        propellerDiameter: "34 inch folding propeller",
                        supplyVoltage: "12S",
                        wheelbase: "1362mm",
                        expandedSize: "1844 x 1844 x 628mm",
                        foldingSize: "635 x 666 x 490mm",
                        tankCapacity: "16L",
                        frameWeight: "6.5kg",
                        shippingWeight: "9.169kg",
                        shippingDimensions: "72 × 52 × 43 cm",
                        wingArmDiameter: "40mm",
                        material: "Advanced Engineering Material",
                        durability: "High-duty, tough, and precise"
                    }
                },
                inTheBox: [
                    { title: "4A16L 16L 4 Axis Drone Frame", quantity: 1 },
                    { title: "16L Capacitive Tank", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "4A16L 16L 4 Axis Agricultural Drone Frame",
                metaDescription: "Buy 4A16L 16L 4 Axis Agricultural Drone Frame. Durable, ultra-lightweight, easy-to-assemble 4-axis frame for agricultural drones.",
                keywords: ["4A16L", "Drone Frame", "4-Axis", "Agriculture Drone", "16L Drone Frame"]
            },

            {
                title: "EFTE Series 10L Tank with Battery Plate",
                slug: "eft-e-series-10l-tank-with-battery-plate",
                category: "Tanks & Mounts",
                brand: "EFT",
                price: 7250.00,
                salePrice: 6890.00,
                productCategory: "agriculture",
                stock: 48,
                inStock: true,
                image: "assets/img/product/specialized/AW10Ltank1.png",
                thumbnails: [
                    "assets/img/product/specialized/AW10Ltank.png",
                    "assets/img/product/specialized/AW10Ltank1.png",
                    "assets/img/product/specialized/AW10Ltank2.png",
                ],
                shortDescription: "10L high-density plastic tank with integrated battery plate for agricultural drones — lightweight, durable, and easy to install.",
                description: `The EFT E Series 10L Tank with Battery Plate is engineered for agricultural drone applications, offering an optimal balance of capacity, durability, and ease of installation. Made from chemical-resistant HDPE plastic, this translucent tank allows easy liquid level checks. Designed to fit EFT G and E series frames, it ensures perfect weight balance and reliable mounting. Ideal for spraying, fertilizing, and custom UAV builds, it’s a trusted original EFT spare or upgrade part for professional use.`,
                features: [
                    "Large 10-liter capacity for extended missions",
                    "Integrated battery plate for perfect weight balance",
                    "Durable, chemical-resistant HDPE plastic construction",
                    "Quick installation compatible with EFT drone frames",
                    "Transparent body for easy liquid level visibility",
                    "Secure mounting prevents sloshing during flight",
                    "Simplifies drone building and maintenance",
                    "Ideal for fertilizers and pesticides",
                    "Original EFT spare or upgrade part",
                    "Includes all required mounting hardware"
                ],
                specs: {
                    model: "EFT 10L Standard Tank with Battery Plate Set",
                    tankCapacity: "10 Liters",
                    material: "High-density polyethylene (HDPE) / Plastic",
                    color: "White (translucent)",
                    batteryPlate: "Included (supports 6S / 12S LiPo)",
                    compatibility: "EFT G series, E series, or similar agriculture drones",
                    mountingType: "Integrated frame mount",
                    weight: "1–2 kg (empty)",
                    shippingWeight: "1.94 kg",
                    shippingDimensions: "50 × 35 × 25 cm"
                },
                inTheBox: [
                    { title: "EFT 10L Standard Tank", quantity: 1 },
                    { title: "Battery Mounting Plate", quantity: 1 },
                    { title: "Set of Mounting Hardware (screws, clips, etc.)", quantity: 1 },
                    { title: "Tank Lid with Vent", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "EFT E Series 10L Tank with Battery Plate for Agriculture Drones",
                metaDescription: "Buy EFT 10L Tank with integrated battery plate for agriculture drones. Chemical-resistant HDPE, easy install, perfect for fertilizers and spraying drones.",
                keywords: [
                    "EFT",
                    "10L Tank",
                    "Drone Tank",
                    "Battery Plate",
                    "Agriculture Drone",
                    "Sprayer Tank",
                    "UAV Tank",
                    "Drone Accessory"
                ]
            },

            {
                title: "EFT 16L Standard Tank With Battery Plate Set",
                slug: "eft-16l-standard-tank-with-battery-plate-set",
                category: "Tanks & Mounts",
                brand: "EFT",
                price: 12999.00,
                salePrice: 8999.00,
                discountPercent: 31,
                productCategory: "agriculture",
                stock: 52,
                inStock: true,
                image: "assets/img/product/specialized/AW16Ltank.png",
                thumbnails: [
                    "assets/img/product/specialized//AW16Ltank.png",
                    "assets/img/product/specialized//AW16Ltank1.png"
                ],
                shortDescription: "Durable 16L tank with integrated battery plate for agriculture drones — enhances spraying efficiency with balanced design and easy installation.",
                description: `The EFT 16L Standard Tank with Battery Plate Set is a complete payload solution for agricultural drones. Designed for high-volume spraying applications, it combines a robust HDPE tank and integrated battery plate for superior balance and easy setup. Ideal for fertilizer and pesticide applications, it ensures consistent spray performance, efficient installation, and long service life. Perfect for professional drone builders and operators looking to boost flight efficiency and stability.`,
                features: [
                    "Large 16-liter capacity for extended missions",
                    "Integrated battery plate for perfect weight balance",
                    "Durable, high-quality HDPE plastic for chemical resistance",
                    "Quick installation on EFT G and E series frames",
                    "Transparent tank wall for easy liquid level checks",
                    "Secure mounting to prevent sloshing in flight",
                    "Simplifies drone assembly and maintenance",
                    "Ideal for fertilizer and pesticide applications",
                    "Original EFT spare or upgrade component",
                    "Includes all necessary mounting hardware"
                ],
                specs: {
                    model: "EFT 16L Standard Tank with Battery Plate Set",
                    tankCapacity: "16 Liters",
                    material: "High-density polyethylene (HDPE) or similar chemical-resistant plastic",
                    color: "White (translucent)",
                    batteryPlate: "Included; designed for specific battery sizes (6S / 12S LiPo)",
                    compatibility: "EFT G series, E series, or similar agricultural drones",
                    mountingType: "Integrated frame mount",
                    weight: "1.5–2.5 kg (empty)"
                },
                inTheBox: [
                    { title: "EFT 16L Standard Tank", quantity: 1 },
                    { title: "Battery Mounting Plate", quantity: 1 },
                    { title: "Set of Mounting Hardware (screws, clips, etc.)", quantity: 1 },
                    { title: "Tank Lid with Vent", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "EFT 16L Standard Tank with Battery Plate Set for Agriculture Drones",
                metaDescription: "Buy EFT 16L Tank with integrated battery plate for agriculture drones. Durable HDPE, chemical-resistant, and perfect for spraying, fertilizers, and UAV builds.",
                keywords: [
                    "EFT",
                    "16L Tank",
                    "Drone Tank",
                    "Battery Plate",
                    "Agriculture Drone",
                    "Sprayer Tank",
                    "UAV Tank",
                    "Drone Accessory"
                ]
            },

            {
                title: "HOBBYWING 8L Brushless Water Pump",
                slug: "hobbywing-8l-brushless-water-pump",
                category: "Spraying Systems",
                brand: "HOBBYWING",
                price: 15999.00,
                salePrice: 8199.00,
                discountPercent: 49,
                productCategory: "agriculture",
                stock: 48,
                inStock: true,
                image: "assets/img/product/specialized/hobbywing-8l-brushless-water-pump.jpg",
                thumbnails: [
                    "assets/img/product/specialized/hobbywing-8l-brushless-water-pump.jpg",
                    "assets/img/product/specialized/hobbywing-8l-brushless-water-pump1.jpg",
                    "assets/img/product/specialized/hobbywing-8l-brushless-water-pump2.jpg"
                ],
                shortDescription: "High-performance 8L/min brushless water pump for agricultural drones — delivers stable, powerful liquid spraying with IP67 protection and 500+ hour lifespan.",
                description: `The HOBBYWING 8L Brushless Water Pump is engineered for high-efficiency agricultural and industrial drone spraying systems. With a robust brushless motor and IP67 waterproof protection, it delivers a powerful, consistent water flow while maintaining durability and stability in harsh conditions. Ideal for 20–30L drone applications, it ensures uniform liquid distribution for precision spraying, cleaning, and irrigation tasks.`,
                features: [
                    "Dual protection with over-temperature and over-current safety",
                    "Automatic restart after overheating or overload",
                    "500+ hour service life — 3–5× longer than conventional pumps",
                    "High water flow and spray pressure for efficient coverage",
                    "Supports up to 12 nozzles for 20–30L drones",
                    "IP67 waterproof rating for outdoor and agricultural use",
                    "Pluggable cable design for quick installation and maintenance"
                ],
                specs: {
                    workingVoltage: "12–14S (DC44.4–60.9V) / 18S (DC66.6–78.3V)",
                    ratedPower: "120W",
                    workingPressure: "0.8–1.0 MPa",
                    workingCurrent: "≤2.5A",
                    maximumFlow: "8 L/min",
                    protectionClass: "IP67",
                    weight: "698g",
                    size: "139 × 95 × 70 mm",
                    inletPipeDiameter: "Outer Diameter 14mm",
                    outletPipeDiameter: "Outer Diameter 14mm",
                    pwmSignal: "1050–1950 μS"
                },
                inTheBox: [
                    { title: "HOBBYWING 8L Brushless Water Pump", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "HOBBYWING 8L Brushless Water Pump | High-Efficiency Agricultural Drone Pump",
                metaDescription: "Buy HOBBYWING 8L Brushless Water Pump for agricultural and industrial drones. Durable brushless design, 8L/min flow, IP67 waterproof, 120W power, and long lifespan.",
                keywords: [
                    "HOBBYWING",
                    "8L Pump",
                    "Brushless Water Pump",
                    "Agricultural Drone Pump",
                    "Sprayer Pump",
                    "UAV Pump",
                    "Drone Accessory",
                    "HOBBYWING Water Pump"
                ]
            },

            {
                title: "EFT Agricultural Drone GPS RTK Mount",
                slug: "eft-agricultural-drone-gps-rtk-mount",
                category: "Drone Accessories",
                brand: "EFT",
                price: 875.00,
                salePrice: 875.00,
                discountPercent: 0,
                productCategory: "agriculture",
                stock: 32,
                inStock: true,
                image: "assets/img/product/specialized/rtk-mount.png",
                thumbnails: [
                    "assets/img/product/specialized/rtk-mount.png",
                    "assets/img/product/specialized/rtk-mount1.jpg"
                ],
                shortDescription: "Foldable aluminum alloy GPS RTK mount for EFT agricultural drones. Durable, lightweight, and easy to install for enhanced precision mapping and flight control.",
                description: `The EFT Agricultural Drone GPS RTK Mount is a compact, foldable bracket designed for precision agricultural drones. Crafted from high-strength aluminum alloy, this mount offers excellent durability and corrosion resistance. Its quick installation mechanism allows secure and firm attachment of GPS RTK modules, ensuring accurate navigation and data transmission for agricultural operations. The foldable design makes it easy to store, transport, and deploy in the field.`,
                features: [
                    "Foldable design for easy storage and portability",
                    "Strong aluminum alloy construction — durable and rust-resistant",
                    "Quick and simple installation and disassembly",
                    "Firm mounting for stable GPS RTK performance",
                    "Lightweight and compatible with most EFT drone frames"
                ],
                specs: {
                    material: "High-strength aluminum alloy",
                    color: "Silver / Black",
                    type: "Foldable GPS RTK Mount",
                    compatibility: "EFT agricultural drone frames",
                    installation: "Quick-release design",
                    weight: "Approx. 200–250g"
                },
                inTheBox: [
                    { title: "EFT Agricultural Drone GPS RTK Mount", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "EFT Agricultural Drone GPS RTK Mount | Foldable Aluminum UAV Mount",
                metaDescription: "Buy EFT Agricultural Drone GPS RTK Mount — foldable aluminum bracket for precision drone GPS setups. Durable, lightweight, and easy to install for EFT drones.",
                keywords: [
                    "EFT",
                    "GPS RTK Mount",
                    "Drone GPS Mount",
                    "Agricultural Drone Accessory",
                    "UAV RTK Mount",
                    "Drone Accessories",
                    "EFT Drone Parts",
                    "Foldable GPS Mount"
                ]
            },

            {
                title: "HOBBYWING 5L Brushless Water Pump",
                slug: "hobbywing-5l-brushless-water-pump",
                category: "Agriculture",
                brand: "HOBBYWING",
                price: 7000.00,
                salePrice: 7000.00,
                discountPercent: 0,
                productCategory: "agriculture",
                stock: 25,
                inStock: true,
                image: "assets/img/product/specialized/hobbywing-5l-brushless-water-pump.webp",
                thumbnails: [
                    "assets/img/product/specialized/hobbywing-5l-brushless-water-pump.webp"
                ],
                shortDescription: "High-efficiency 5L brushless water pump for agricultural drones, featuring temperature and current protection, long lifespan, and IP67 waterproof design.",
                description: `The HOBBYWING 5L Brushless Water Pump is a high-performance EFC (Electrical Flow Control) pump designed specifically for agricultural drones. 
                    It delivers consistent and efficient liquid flow for plant protection and spraying applications. 
                    With a brushless design and built-in protections, it offers superior reliability and durability—lasting up to 500 hours, 3–5 times longer than regular pumps. 
                    The pump supports up to 14S LiPo batteries, providing powerful flow performance in challenging field conditions. 
                    Its IP67 waterproof rating and compact design make it ideal for both agricultural and industrial drone operations.`,
                features: [
                    "Pump for plant protection and spraying drones",
                    "Brushless motor design with extended lifespan (500+ hours)",
                    "Integrated overcurrent and temperature protection",
                    "Supports up to 14S LiPo batteries for powerful performance",
                    "Consistent and efficient 5L/min water flow rate",
                    "IP67 waterproof rating for reliable use in wet conditions",
                    "Compact and lightweight design for easy drone integration",
                    "Fixed PWM throttle range (1050–1950μS)"
                ],
                specs: {
                    workingVoltage: "12–14S (DC44–60.9V)",
                    ratedPower: "150W",
                    workingPressure: "0.35Mpa",
                    workingCurrent: "≤2.5A",
                    flowRate: "5L/min",
                    protectionClass: "IP67",
                    weight: "388g (approx, without wire 338g)",
                    size: "123 × 76 × 52 mm",
                    pwmRange: "1050–1950μS"
                },
                inTheBox: [
                    { title: "HOBBYWING 5L Brushless Water Pump", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "HOBBYWING 5L Brushless Water Pump | Agricultural Drone EFC Pump",
                metaDescription: "Buy HOBBYWING 5L Brushless Water Pump for agricultural drones — high-efficiency, waterproof, brushless pump with overheat and current protection.",
                keywords: [
                    "HOBBYWING",
                    "5L Brushless Pump",
                    "Drone Water Pump",
                    "Agricultural Drone Pump",
                    "EFC Pump",
                    "UAV Spraying Pump",
                    "HOBBYWING XRotor Pump",
                    "Drone Accessories"
                ]
            },

            {
                title: "Agriculture Drone Dual Header Spray Nozzle",
                slug: "agriculture-drone-dual-header-spray-nozzle",
                category: "Drone Accessories",
                brand: "FlyRobo",
                price: 1059.00,
                salePrice: 1059.00,
                discountPercent: 0,
                productCategory: "agriculture",
                stock: 50,
                inStock: true,
                image: "assets/img/product/specialized/agriculture-drone-spray-nozzle.webp",
                thumbnails: [
                    "assets/img/product/specialized/agriculture-drone-spray-nozzle.webp",
                    "assets/img/product/specialized/agriculture-drone-spray-nozzle1.webp",
                    "assets/img/product/specialized/agriculture-drone-spray-nozzle2.webp",
                    "assets/img/product/specialized/agriculture-drone-spray-nozzle3.webp"
                ],
                shortDescription: "Dual spray heads for agricultural drones, ensuring even distribution, high durability, and easy installation.",
                description: `The Agriculture Drone Dual Header Spray Nozzle is designed to improve efficiency in drone-based crop spraying. 
                    It is ideal for applying pesticides, fertilizers, and herbicides with uniform coverage. 
                    Its lightweight, compact, and durable design fits most agricultural drones. 
                    The nozzle reduces chemical drift, optimizes usage, and enhances productivity in precision agriculture operations.`,
                features: [
                    "Dual Spray Heads for wide coverage",
                    "Even distribution for precise spraying",
                    "High durability and lightweight design",
                    "Adjustable flow rate for versatile applications",
                    "Anti-drip mechanism prevents wastage",
                    "Quick installation and removal",
                    "Efficient atomization for better crop absorption"
                ],
                specs: {
                    type: "Dual Nozzle",
                    material: "Durable Plastic & Metal Rod",
                    length: "290mm",
                    height: "55mm",
                    width: "80mm"
                },
                inTheBox: [
                    { title: "Agriculture Drone Dual Header Spray Nozzle", quantity: 1 }
                ],
                rating: 4.8,
                reviews: 4,
                metaTitle: "Agriculture Drone Dual Header Spray Nozzle | FlyRobo",
                metaDescription: "Buy the Agriculture Drone Dual Header Spray Nozzle by FlyRobo — lightweight, durable, dual-head nozzle for precise crop spraying with drones.",
                keywords: [
                    "FlyRobo",
                    "Dual Spray Nozzle",
                    "Drone Spray Nozzle",
                    "Agricultural Drone Accessories",
                    "Crop Spraying Drone Parts",
                    "Drone Pesticide Sprayer",
                    "Precision Agriculture Drone",
                    "UAV Nozzle"
                ]
            },


            {
                title: "EFT 5L Spraying System Set",
                slug: "eft-5l-spraying-system-set",
                category: "Drone Accessories",
                brand: "EFT",
                price: 11695.95,
                salePrice: 11139.00,
                discountPercent: 5,
                productCategory: "agriculture",
                stock: 40,
                inStock: true,
                image: "assets/img/product/specialized/eft5l-spraying-system-set.png",
                thumbnails: [
                    "assets/img/product/specialized/eft-5l-spraying-system-set",
                    "assets/img/product/specialized/eft-5l-spraying-system-set1",
                    "assets/img/product/specialized/eft-5l-spraying-system-set2",
                    "assets/img/product/specialized/eft-5l-spraying-system-set3",
                ],
                shortDescription: "Complete 5L spraying system with brushless pump and high-pressure nozzles for precise agricultural applications.",
                description: `The EFT 5L Spraying System Set combines a powerful 5L brushless water pump with precision pressure nozzles to deliver a reliable and efficient spraying solution. Ideal for agricultural drones, gardening, or surface cleaning, this system ensures consistent spray patterns and controlled liquid application. Designed for durability and long-lasting performance, it operates quietly while handling demanding conditions. The kit includes all necessary tubing and connectors, providing a ready-to-use setup for effective spraying over large areas.`,
                features: [
                    "Versatile system suitable for agricultural drones, gardening, and cleaning tasks",
                    "Precision pressure nozzles for even liquid distribution",
                    "Powerful 5L brushless water pump for continuous flow",
                    "Quiet operation for reduced noise disruption",
                    "Durable, high-quality construction for long-lasting use",
                    "Adjustable settings for customizable spraying",
                    "Includes complete set of extension rods, tubes, and connectors",
                    "Efficient coverage for large areas"
                ],
                specs: {
                    workingVoltage: "12-14S (DC44-60.9V)",
                    maxPower: "150W",
                    workingPressure: "0.35Mpa",
                    maxFlow: "5L/min",
                    workingCurrent: "≤2.5A",
                    protectionGrade: "IP67",
                    weight: "388g (approx. 338g without wire)",
                    size: "123 × 76 × 52mm",
                    pwmRange: "1050-1950μS",
                    shippingWeight: "1.525 kg",
                    shippingDimensions: "28 × 23 × 15 cm"
                },
                inTheBox: [
                    { title: "5L Brushless Water Pump", quantity: 1 },
                    { title: "EFT Extension Rod High-Pressure Nozzles", quantity: 4 },
                    { title: "4m Tube", quantity: 1 },
                    { title: "0.5m Tube (Different Diameter)", quantity: 2 },
                    { title: "Pneumatic Tube Connector", quantity: 6 },
                    { title: "Power Connector Accessories Set", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "EFT 5L Spraying System Set | Brushless Pump & High-Pressure Nozzles",
                metaDescription: "EFT 5L Spraying System Set with brushless water pump and precision pressure nozzles for agriculture drones. Efficient, durable, and easy to install.",
                keywords: [
                    "EFT",
                    "5L Spraying System",
                    "Brushless Water Pump",
                    "Drone Spray System",
                    "Agricultural Drone Accessories",
                    "Precision Agriculture Drone",
                    "High-Pressure Nozzles",
                    "UAV Spraying System"
                ]
            },

            {
                title: "Hobbywing X6 Plus 2480 Propellers with Hub – CW",
                slug: "hobbywing-x6-plus-2480-propellers-cw",
                category: "Drone Accessories",
                brand: "Hobbywing",
                price: 1839.00,
                salePrice: 1839.00,
                discountPercent: 0,
                productCategory: "propellers",
                stock: 100, // update actual stock if needed
                inStock: true,
                image: "assets/img/product/specializedEFT-Prop-X6-CW.jpg",
                thumbnails: [
                    "assets/img/product/specializedEFT-Prop-X6-CW.jpg",
                    "assets/img/product/specializedEFT-Prop-X6-CW1.jpg",
                    "assets/img/product/specializedEFT-Prop-X6-CW3.jpg",
                    "assets/img/product/specializedEFT-Prop-X6-CW4.jpg",
                ],
                shortDescription: "High-performance CW propellers with hub for smooth and stable drone flight.",
                description: `The Hobbywing X6 Plus 2480 Propellers with Hub – CW are precision-engineered for drones and multirotors. Clockwise (CW) rotation ensures stable flight, while high-quality materials provide durability and resistance to damage. The included hub guarantees secure and easy installation, making these propellers ideal for recreational, professional, or aerial photography drones. Optimized for thrust and lift, they enhance maneuverability and overall flight performance.`,
                features: [
                    "High-performance propellers for drones and multirotors",
                    "Clockwise (CW) rotation for stable and smooth flight",
                    "Durable construction for long-lasting use in various conditions",
                    "Crafted from high-quality materials for damage resistance",
                    "Easy and secure installation with included hub",
                    "Optimized thrust and lift for better maneuverability",
                    "Suitable for recreational, professional, and aerial photography drones",
                    "Compatible with a wide range of drone models",
                    "Reliable and efficient performance"
                ],
                specs: {
                    rotationDirection: "CW",
                    pitch: "8 inch",
                    numberOfBlades: 2,
                    weight: "115g",
                    shippingWeight: "0.14 kg",
                    shippingDimensions: "36 × 14 × 5 cm"
                },
                inTheBox: [
                    { title: "Hobbywing X6 Plus 2480 Propeller with Hub – CW", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Hobbywing X6 Plus 2480 Propellers – CW | Drone Accessories",
                metaDescription: "Buy Hobbywing X6 Plus 2480 Propellers with Hub – CW for drones. High-performance, durable, and easy to install, ideal for stable flight and aerial photography.",
                keywords: [
                    "Hobbywing",
                    "X6 Plus 2480",
                    "Drone Propeller",
                    "CW Propeller",
                    "Multirotor Accessories",
                    "High-Performance Propeller",
                    "Drone Parts",
                    "Aerial Photography Propeller"
                ]
            },


            // You can add more accessories here in the same format
        ];

        await Accessory.deleteMany();
        console.log("Exisitng accessories deleted");
        // Insert all accessories
        await Accessory.insertMany(accessories);
        console.log("Accessories seeded successfully!");
    } catch (error) {
        console.error("Error seeding accessories:", error);
    } finally {
        mongoose.disconnect();
    }
}

seedAccessories();
