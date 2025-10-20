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
                title: "Herewin 22.2V 22000mAh 25C 6S Lithium Polymer Battery Pack",
                slug: "herewin-22-2v-22000mah-25c-6s-lipo-battery-pack",
                category: "Battery",
                type: "Battery",
                brand: "Herewin",
                price: 20342,
                productCategory: "Battery",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/accessory/herewin-22kmAh.jpg",
                thumbnails: [
                    "/assets/img/product/accessory/herewin-22kmAh.jpg",
                    "/assets/img/product/accessory/herewin-22kmAh1.jpg"
                ],
                shortDescription: "High-capacity 22.2V 22000mAh 25C 6S Lithium Polymer battery for UAVs, RC cars, boats, and planes.",
                description: `Herewin 22.2V 22000mAh 25C 6S Lithium Polymer Battery Pack delivers reliable, long-lasting power for UAVs and other high-demand applications. With high energy density, fast discharge, and wide temperature range operation, this battery ensures stable performance and extended runtime.`,
                specs: {
                    nominalVoltage: "22.2 V",
                    inputVoltage: "22.2 V",
                    capacity: "22000 mAh",
                    powerRating: "488.4 Wh",
                    batteryCellConfiguration: "6S",
                    dischargeRate: "25C",
                    limitWorkingTemperature: "0° to 40° C",
                    shippingWeight: "3.014 kg",
                    shippingDimensions: "25 × 25 × 8 cm"
                },
                inTheBox: [
                    { title: "Herewin 6S 22000mAh 25C Lithium Polymer Battery", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Herewin 22.2V 22000mAh 25C 6S LiPo Battery Pack | High-Capacity UAV Battery",
                keywords: [
                    "Herewin 22000mAh battery",
                    "6S LiPo battery pack",
                    "UAV LiPo battery",
                    "High-capacity RC battery"
                ],
                compatibility: [
                    "UAV drones",
                    "RC cars",
                    "RC boats",
                    "RC planes"
                ]
            },

            {
                title: "Herewin 22.2V 16000mAh 25C 6S Lithium Polymer Battery Pack",
                slug: "herewin-22-2v-16000mah-25c-6s-lipo-battery-pack",
                category: "Battery",
                type: "Battery",
                brand: "Herewin",
                price: 15999,
                productCategory: "Battery",
                stock: 2,
                inStock: true,
                image: "/assets/img/product/accessory/herewin-16kmAh1.jpg",
                thumbnails: [
                    "/assets/img/product/accessory/herewin-16kmAh1.jpg",
                    "/assets/img/product/accessory/herewin-16kmAh.jpg",
                    "/assets/img/product/accessory/herewin-16kmAh2.jpg"
                ],
                shortDescription: "High-capacity 22.2V 16000mAh 25C 6S Lithium Polymer battery for UAVs, FPV drones, and high-power systems.",
                description: `Herewin 22.2V 16000mAh 25C 6S Lithium Polymer Battery Pack delivers reliable, long-lasting power for drones and other high-demand applications. With high energy density, durable construction, and a 25C discharge rate, this battery ensures stable and efficient performance for extended flight times.`,
                specs: {
                    nominalVoltage: "22.2 V",
                    voltageRating: "22.2 V",
                    nominalCapacity: "16000 mAh",
                    ratedCapacity: "25C",
                    batteryCellConfiguration: "6S",
                    material: "Metal",
                    batteryType: "Lithium Polymer",
                    chargeConnector: "AS150 Connector, XT90 Connector",
                    bms: "No",
                    batterySize: "250mm x 10mm",
                    shippingWeight: "2.441 kg",
                    shippingDimensions: "26 × 23 × 15 cm"
                },
                inTheBox: [
                    { title: "Herewin 6S 16000mAh 25C Lithium Polymer Battery", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Herewin 22.2V 16000mAh 25C 6S LiPo Battery Pack | High-Capacity UAV Battery",
                keywords: [
                    "Herewin 16000mAh battery",
                    "6S LiPo battery pack",
                    "UAV LiPo battery",
                    "FPV drone battery"
                ],
                compatibility: [
                    "UAV drones",
                    "FPV drones",
                    "High-power electronic systems"
                ]
            },

            {
                title: "6S1P 25000mAh 22.8V LiPo Battery Pack",
                slug: "6s1p-25000mah-22-8v-lipo-battery-pack",
                category: "Battery",
                type: "Battery",
                brand: "Generic",
                price: 37999,
                productCategory: "Battery",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/lipo/6s1p-25000mah.jpg",
                thumbnails: [
                    "/assets/img/product/lipo/6s1p-25000mah.jpg",
                    "/assets/img/product/lipo/6s1p-25000mah-1.jpg",
                    "/assets/img/product/lipo/6s1p-25000mah-2.jpg"
                ],
                shortDescription: "High-capacity 22.8V 25000mAh 6S1P LiPo battery for UAVs, drones, and high-power applications.",
                description: `6S1P 25000mAh 22.8V LiPo Battery Pack delivers stable, long-lasting power for UAVs, industrial drones, and other high-demand applications. With a 25C discharge rate and high energy density, it ensures reliable performance and extended operational time.`,
                specs: {
                    nominalVoltage: "22.8 V",
                    capacity: "25000 mAh",
                    batteryCellConfiguration: "6S1P",
                    maxChargingRate: "3-5C",
                    maxDischargeRate: "25C",
                    cycleLife: "≥ 650 cycles",
                    weight: "2.98 kg",
                    dimensions: "210 × 90 × 65 mm"
                },
                inTheBox: [
                    { title: "6S1P 25000mAh 22.8V LiPo Battery Pack", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "6S1P 25000mAh 22.8V LiPo Battery Pack | High-Capacity UAV Battery",
                keywords: [
                    "6S1P 25000mAh battery",
                    "22.8V LiPo battery",
                    "UAV LiPo battery",
                    "High-capacity drone battery"
                ],
                compatibility: [
                    "UAV drones",
                    "Industrial drones",
                    "High-power electronic systems"
                ]
            },
            {
                title: "Tattu Plus 16000mAh 6S 25C 22.2V LiPo Battery Pack with XT90S",
                slug: "tattu-plus-16000mah-6s-25c-22-2v-lipo-battery-pack-xt90s",
                category: "Battery",
                type: "Battery",
                brand: "Tattu",
                price: 19599,
                productCategory: "Battery",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/accessory/tattu-16kmAh.jpg",
                thumbnails: [
                    "/assets/img/product/accessory/tattu-16kmAh.jpg",
                    "/assets/img/product/accessory/tattu-16kmAh1.jpg",
                    "/assets/img/product/accessory/tattu-16kmAh2.jpg",
                ],
                shortDescription: "High-capacity 22.2V 16000mAh 6S25C LiPo battery with XT90S connector for UAVs, RC cars, and drones.",
                description: `Tattu Plus 16000mAh 6S 25C 22.2V LiPo Battery Pack delivers stable, high-power output for UAVs, quadcopters, RC airplanes, cars, and boats. Equipped with a high-precision BMS, battery status indicator, and cell abnormal alert, it ensures safety, long cycle life, and reliable performance.`,
                specs: {
                    nominalVoltage: "22.2 V",
                    voltage: "6S (22.2 V)",
                    nominalCapacity: "16000 mAh",
                    batteryCellConfiguration: "6S",
                    connector: "XT90 or equivalent",
                    dischargeRate: "25C",
                    length: "170 mm",
                    width: "76 mm",
                    height: "63 mm",
                    weight: "1700 g",
                    shippingWeight: "2.015 kg",
                    shippingDimensions: "28 × 15 × 12 cm"
                },
                inTheBox: [
                    { title: "Tattu Plus 16000mAh 6S 25C 22.2V LiPo Battery Pack with XT90S", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Tattu Plus 16000mAh 6S 25C 22.2V LiPo Battery Pack | High-Capacity UAV Battery",
                keywords: [
                    "Tattu 16000mAh battery",
                    "6S LiPo battery pack",
                    "UAV LiPo battery",
                    "High-power RC battery"
                ],
                compatibility: [
                    "UAV drones",
                    "Quadcopters",
                    "RC airplanes",
                    "RC cars",
                    "RC boats"
                ]
            },
            {
                title: "Tattu 22.8V 10C 6S 25000mAh LiPo HV Battery Pack with XT90-S Anti Spark Plug",
                slug: "tattu-22-8v-10c-6s-25000mah-lipo-hv-battery-xt90s",
                category: "Battery",
                type: "Battery",
                brand: "Tattu",
                price: 42537,
                salePrice: 42537,
                productCategory: "Battery",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/accessory/tattu-25kmAh.jpg",
                thumbnails: [
                    "/assets/img/product/accessory/tattu-25kmAh.jpg",
                    "/assets/img/product/accessory/tattu-25kmAh1.jpg",
                    "/assets/img/product/accessory/tattu-25kmAh2.jpg",
                ],
                shortDescription: "High-capacity 22.8V 25000mAh 6S 10C LiPo HV battery with XT90-S connector and anti-spark for UAVs and drones.",
                description: `Tattu 22.8V 10C 6S 25000mAh LiPo HV Battery Pack with XT90-S Anti Spark Plug is designed for professional UAVs and aerial photography drones. Features include anti-spark protection, superior LiPo materials, high energy density (~200Wh/kg), and long cycle life (≥150 cycles). Perfect for aerial video, mapping, inspections, and agriculture.`,
                specs: {
                    nominalVoltage: "22.8 V",
                    voltage: "22.8 V",
                    nominalCapacity: "25000 mAh",
                    batteryCellConfiguration: "6S",
                    connector: "XT90-S",
                    dischargeRate: "10C",
                    length: "207 mm",
                    width: "91 mm",
                    height: "65 mm",
                    weight: "2577 g",
                    shippingWeight: "2.735 kg",
                    shippingDimensions: "30 × 17 × 12 cm"
                },
                inTheBox: [
                    { title: "Tattu 22.8V 10C 6S 25000mAh LiPo HV Battery Pack with XT90-S Anti Spark Plug", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Tattu 22.8V 10C 6S 25000mAh LiPo HV Battery Pack | High-Capacity UAV Battery",
                keywords: [
                    "Tattu 25000mAh battery",
                    "6S LiPo HV battery pack",
                    "UAV LiPo battery",
                    "High-capacity drone battery"
                ],
                compatibility: [
                    "UAV drones",
                    "Aerial photography drones",
                    "Industrial drones"
                ]
            },
            {
                title: "Tattu 22.2V 25C 6S 22000mAh LiPo Battery Pack with XT90-S Anti Spark Plug",
                slug: "tattu-22-2v-25c-6s-22000mah-lipo-battery-xt90s",
                category: "Battery",
                type: "Battery",
                brand: "Tattu",
                price: 18559,
                salePrice: 18559,
                productCategory: "Battery",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/accessory/tattu-22kmAh.jpg",
                thumbnails: [
                    "/assets/img/product/accessory/tattu-22kmAh.jpg",
                    "/assets/img/product/accessory/tattu-22kmAh1.jpg",
                    "/assets/img/product/accessory/tattu-22kmAh2.jpg",
                ],
                shortDescription: "High-capacity 22.2V 22000mAh 6S 25C LiPo battery with XT90-S connector for UAVs, drones, and multirotor aircraft.",
                description: `Tattu 22.2V 25C 6S 22000mAh LiPo Battery Pack with XT90-S Anti Spark Plug provides reliable, high-capacity power for UAVs, multirotor aircraft, and RC applications. Equipped with a smart BMS, it ensures safe operation, stable discharge, and extended flight times.`,
                specs: {
                    nominalVoltage: "22.2 V",
                    nominalCapacity: "22000 mAh",
                    batteryCellConfiguration: "6S",
                    connector: "XT90-S",
                    dischargeRate: "25C",
                    maxBurstDischargeRate: "50C",
                    shippingWeight: "2.5 kg",
                    shippingDimensions: "30 × 17 × 12 cm"
                },
                inTheBox: [
                    { title: "Tattu 22.2V 25C 6S 22000mAh LiPo Battery Pack with XT90-S Anti Spark Plug", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "Tattu 22.2V 25C 6S 22000mAh LiPo Battery Pack | High-Capacity UAV Battery",
                keywords: [
                    "Tattu 22000mAh battery",
                    "6S LiPo battery pack",
                    "UAV LiPo battery",
                    "High-capacity drone battery"
                ],
                compatibility: [
                    "UAV drones",
                    "Multirotor aircraft",
                    "RC airplanes",
                    "RC helicopters"
                ]
            },


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
