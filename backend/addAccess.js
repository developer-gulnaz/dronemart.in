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
                productCategory: "agriculture-hexacopter",
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
                productCategory: "agriculture-hexacopter",
                stock: 2,
                inStock: true,
                image: "assets/img/product/specialized/agroWingz_AW6_10L_Frame.jpg",
                thumbnails: [
                    "assets/img/product/specialized/agroWingz_AW6_10L_Frame.jpg",
                    "assets/img/product/specialized/agroWingz_AW6_10L_Frame1.jpg",
                    "assets/img/product/specialized/agroWingz_AW6_10L_Frame2.jpg"
                ],
                description: `The Agrowingz 6A10L 6-Axis Agricultural Drone Frame is a sturdy, ultra-lightweight, and highly precise frame, designed for heavy-duty agricultural use. 
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
                    { title: "Agrowingz 6A10L 6 Axis Drone Frame", quantity: 1 },
                    { title: "10L Capacitive Tank", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Agrowingz 6A10L 6-Axis Agricultural Drone Frame",
                metaDescription: "Buy Agrowingz 6A10L 6-Axis Agricultural Drone Frame. Durable, ultra-lightweight, easy-to-assemble hexacopter frame for agricultural drones.",
                keywords: ["EFT", "6A10L", "Drone Frame", "6-Axis", "Agriculture Drone", "10L Drone Frame"]
            },

            {
                title: "6A16L 16L 6 Axis Agricultural Drone Frame",
                slug: "6a16l-6axis-droneframe",
                category: "Drone Frames",
                brand: "EFT",
                price: 49449,
                salePrice: 44449,
                productCategory: "agriculture-hexacopter",
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
