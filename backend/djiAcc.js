const mongoose = require('mongoose');
require('dotenv').config();
const Accessory = require('./models/Accessory'); // adjust path if needed

async function seedAccessories() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const accessories = [

            //DJI Mavic 
            {
                title: "DJI Power 500 + DJI Power SDC to Mavic 3 Fast Charge Cable",
                slug: "dji-power-500-sdc-fast-charge-mavic-3",
                category: "Accessories",
                type: "Charge Cable",
                brand: "DJI",
                price: 35849,
                salePrice: 33999,
                productCategory: "mavic",
                sku: "DJI-PWR500-M3",
                stock: 4,
                inStock: true,
                image: "/assets/img/product/dji/dji-power-500.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-power-500.jpg",
                    "/assets/img/product/dji/dji-power-500-1.jpg",
                    "/assets/img/product/dji/dji-power-500-2.jpg",
                    "/assets/img/product/dji/dji-power-500-3.jpg",
                    "/assets/img/product/dji/dji-power-500-4.jpg",
                ],
                shortDescription:
                    "Portable 512 Wh power station capable of delivering up to 1000 W output, designed to fast-charge DJI Mavic 3 series batteries using the included 150 W SDC cable.",
                description: `The DJI Power 500 is a compact and versatile power station offering 512 Wh of capacity and a 1000 W output for powering DJI drones and household devices. When paired with the DJI Power SDC to Mavic 3 Series Fast Charge Cable, it can recharge a Mavic 3 Intelligent Flight Battery from 0–100% in about 58 minutes. Lightweight and travel-friendly, it's ideal for field operations and drone professionals who need reliable charging power.`,
                specs: {
                    capacity: "512 Wh",
                    weight: "Approx. 7.3 kg",
                    dimensions: "305×207×177 mm",
                    acOutput: "220–240 V, 50/60 Hz, rated 800 W, max continuous 1000 W",
                    cableLength: "40 cm"
                },
                inTheBox: [
                    { title: "DJI Power 500", quantity: 1 },
                    { title: "DJI Power AC Power Cable", quantity: 1 },
                    { title: "DJI Power SDC to Mavic 3 Fast Charge Cable", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle:
                    "DJI Power 500 with Mavic 3 Fast Charge Cable | Portable 512 Wh Power Station",
                metaDescription:
                    "Shop DJI Power 500 with 150 W Fast Charge Cable for Mavic 3. Compact 512 Wh station with 1000 W output for fast and reliable drone charging.",
                keywords: [
                    "DJI Power 500",
                    "Mavic 3 fast charge",
                    "DJI portable power station",
                    "DJI SDC cable",
                    "DJI drone charging"
                ],
                compatibility: [
                    "DJI Mavic 3 Series",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3 Pro Series",
                    "DJI Mavic 3 Enterprise Series",
                    "DJI Mavic 3 Multispectral Edition"
                ]
            },

            {
                title: "DJI Power 1000 + DJI Power SDC to Mavic 3 Fast Charge Cable",
                slug: "dji-power-1000-sdc-fast-charge-mavic-3",
                category: "Accessories",
                type: "Charge Cable",
                brand: "DJI",
                salePrice: 63759,
                price: 69999,
                productCategory: "mavic",
                sku: "DJI-PWR1000-M3",
                stock: 3,
                inStock: true,
                image: "/assets/img/product/dji/dji-power-1000.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-power-1000.jpg",
                    "/assets/img/product/dji/dji-power-1000-1.jpg",
                    "/assets/img/product/dji/dji-power-1000-2.jpg",
                    "/assets/img/product/dji/dji-power-1000-3.jpg",
                    "/assets/img/product/dji/dji-power-1000-4.jpg"
                ],
                shortDescription:
                    "High-capacity 1024 Wh power station delivering up to 2600 W of output, capable of fast-charging DJI Mavic 3 series batteries with the 150 W SDC cable.",
                description: `The DJI Power 1000 is a robust 1024 Wh portable station that powers over 99% of common electronics and drone batteries. It supports a max output of 2600 W and can recharge Mavic 3 Intelligent Flight Batteries in under an hour using the 150 W SDC Fast Charge Cable. Designed for professionals who need powerful, stable, and mobile energy on set or in the field.`,
                specs: {
                    capacity: "1024 Wh",
                    weight: "Approx. 13 kg",
                    dimensions: "448×225×230 mm",
                    acOutput: "100–240 V, 50/60 Hz, max continuous 2200 W, peak 4400 W",
                    cableLength: "40 cm"
                },
                inTheBox: [
                    { title: "DJI Power 1000", quantity: 1 },
                    { title: "DJI Power AC Power Cable", quantity: 1 },
                    { title: "DJI Power SDC to Mavic 3 Fast Charge Cable", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle:
                    "DJI Power 1000 + Mavic 3 Fast Charge Cable | 1024 Wh Portable Station",
                metaDescription:
                    "Get DJI Power 1000 with 1024 Wh capacity and 2600 W output for Mavic 3 drones. Fast-charge Mavic 3 batteries from 0–100% in 58 minutes.",
                keywords: [
                    "DJI Power 1000",
                    "Mavic 3 battery charger",
                    "DJI portable power supply",
                    "DJI SDC fast charge cable",
                    "Mavic 3 accessories"
                ],
                compatibility: [
                    "DJI Mavic 3 Series",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3 Pro Series",
                    "DJI Mavic 3 Enterprise Series",
                    "DJI Mavic 3 Multispectral Edition"
                ]
            },

            {
                title: "DJI Power SDC to Mavic 3 Fast Charge Cable",
                slug: "dji-sdc-mavic-3-fast-charge-cable",
                category: "Accessories",
                type: "Charge Cable",
                brand: "DJI",
                salePrice: 1999,
                price: 2359,
                productCategory: "mavic",
                sku: "DJI-SDC-M3",
                stock: 10,
                inStock: true,
                image: "/assets/img/product/dji/dji-sdc-mavic3-cable.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-sdc-mavic3-cable.jpg",
                    "/assets/img/product/dji/dji-power-500-4.jpg",
                    "/assets/img/product/dji/dji-sdc-mavic3-cable.jpg"
                ],
                shortDescription:
                    "150 W fast charge cable for connecting DJI Power Stations to Mavic 3 series batteries.",
                description: `The DJI Power SDC to Mavic 3 Series Fast Charge Cable enables high-speed charging between DJI Power 500, 1000, or 2000 stations and Mavic 3 drone batteries. With a 150 W power output, it recharges batteries from 0–100% in around 58 minutes, providing professional reliability for field operations.`,
                specs: {
                    length: "40 cm"
                },
                inTheBox: [{ title: "DJI Power SDC to Mavic 3 Fast Charge Cable", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle:
                    "DJI Power SDC to Mavic 3 Fast Charge Cable | 150W Charging",
                metaDescription:
                    "Shop DJI 150W SDC to Mavic 3 Fast Charge Cable. Charge your Mavic 3 series drone batteries in under an hour with DJI Power stations.",
                keywords: [
                    "DJI Mavic 3 charge cable",
                    "DJI SDC power cable",
                    "DJI Power 1000 accessories",
                    "Mavic 3 fast charger"
                ],
                compatibility: [
                    "DJI Power 500",
                    "DJI Power 1000",
                    "DJI Power 2000",
                    "DJI Mavic 3 Series"
                ]
            },
            {
                title: "DJI Mavic 3 Pro ND Filter Set (ND8/16/32/64)",
                slug: "dji-mavic-3-pro-nd-filter-set",
                category: "Accessories",
                type: "ND Filter Set",
                brand: "DJI",
                salePrice: 15899,
                price: 17899,
                productCategory: "mavic",
                sku: "DJI-M3PRO-NDSET",
                stock: 40,
                inStock: true,
                image: "/assets/img/product/dji/mavic3pro-nd-filters.jpg",
                thumbnails: [
                    "/assets/img/product/dji/mavic3pro-nd-filters.jpg",
                    "/assets/img/product/dji/mavic3pro-nd-filters-1.jpg",
                    "/assets/img/product/dji/mavic3pro-nd-filters-2.jpg",
                    "/assets/img/product/dji/mavic3pro-nd-filters-3.jpg",
                    "/assets/img/product/dji/mavic3pro-nd-filters-4.jpg"
                ],
                shortDescription:
                    "Professional ND filter set (ND8, ND16, ND32, ND64) for DJI Mavic 3 Pro and Pro Cine, designed for smooth long-exposure and cinematic shooting.",
                description: `The DJI Mavic 3 Pro ND Filter Set is tailored for the Mavic 3 Pro's triple-camera system, allowing creators to capture perfect long-exposure and bright-light footage. Each filter provides precise shutter control, maintaining balanced exposure across all lenses — including the tele camera — for consistent, cinematic results.`,
                specs: {
                    filterTypes: ["ND8", "ND16", "ND32", "ND64"],
                    weight: "5.1 g each"
                },
                inTheBox: [
                    { title: "ND8 Filter", quantity: 1 },
                    { title: "ND16 Filter", quantity: 1 },
                    { title: "ND32 Filter", quantity: 1 },
                    { title: "ND64 Filter", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle:
                    "DJI Mavic 3 Pro ND Filter Set | ND8/16/32/64 for Cinematic Control",
                metaDescription:
                    "Buy DJI Mavic 3 Pro ND Filter Set with ND8, ND16, ND32, and ND64 filters. Designed for precise exposure and cinematic quality in bright conditions.",
                keywords: [
                    "DJI Mavic 3 Pro ND filter",
                    "ND8 ND16 ND32 ND64 set",
                    "Mavic 3 Pro Cine accessories",
                    "DJI camera filter set"
                ],
                compatibility: ["DJI Mavic 3 Pro", "DJI Mavic 3 Pro Cine"]
            },

            {
                title: "DJI Mavic 3 Series Intelligent Flight Battery",
                slug: "dji-mavic-3-series-intelligent-flight-battery",
                category: "Accessories",
                type: "Battery",
                brand: "DJI",
                price: 15349,
                salePrice: 14349,
                productCategory: "mavic",
                sku: "DJI-M3-BATT",
                stock: 50,
                inStock: true,
                image: "/assets/img/product/dji/mavic3-battery.jpg",
                thumbnails: [
                    "/assets/img/product/dji/mavic3-battery.jpg",
                    "/assets/img/product/dji/mavic3-battery-1.jpg",
                    "/assets/img/product/dji/mavic3-battery-2.jpg",
                    "/assets/img/product/dji/mavic3-battery-3.jpg"
                ],
                shortDescription:
                    "High-capacity Intelligent Flight Battery offering up to 46 minutes of flight time for Mavic 3 and 43 minutes for Mavic 3 Pro.",
                description: `The DJI Mavic 3 Series Intelligent Flight Battery provides exceptional endurance, allowing up to 46 minutes of flight time on the Mavic 3 and up to 43 minutes on the Mavic 3 Pro. Built with advanced LiPo 4S chemistry, it ensures reliable power delivery and consistent performance for extended aerial sessions.`,
                specs: {
                    model: "BWX260-5000-15.4",
                    capacity: "5000 mAh",
                    type: "LiPo 4S",
                    chargingTemperature: "5° to 40° C (41° to 104° F)"
                },
                inTheBox: [{ title: "DJI Mavic 3 Intelligent Flight Battery", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mavic 3 Series Intelligent Flight Battery | 46-Min Max Flight Time",
                metaDescription:
                    "Buy DJI Mavic 3 Intelligent Flight Battery with 5000 mAh capacity. Up to 46 minutes of flight time for Mavic 3 and 43 minutes for Mavic 3 Pro.",
                keywords: [
                    "DJI Mavic 3 battery",
                    "Mavic 3 Pro battery",
                    "Mavic 3 Intelligent Flight Battery",
                    "DJI drone battery"
                ],
                compatibility: [
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Pro Classic",
                    "DJI Mavic Cine",
                    "DJI Mavic 3 Enterprise Series",
                ]
            },

            {
                title: "DJI 100W USB-C Power Adapter",
                slug: "dji-100w-usb-c-power-adapter",
                category: "Accessories",
                type: "Adapter",
                brand: "DJI",
                price: 5849,
                salePrice: 5349,
                productCategory: "mavic",
                sku: "DJI-100W-ADAPTER",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/dji-100w-usbc-adapter.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-100w-usbc-adapter.jpg",
                    "/assets/img/product/dji/dji-100w-usbc-adapter-2.jpg"
                ],
                shortDescription:
                    "Dual-port 100W USB-C power adapter for fast charging DJI drone batteries, remote controllers, and mobile devices.",
                description: `The DJI 100W USB-C Power Adapter supports fast charging for multiple devices simultaneously. With two USB-C output ports, it can charge a Mavic 3 Intelligent Flight Battery and a DJI RC or mobile device at the same time. It supports PPS and PD protocols, ensuring efficient, safe, and versatile power delivery for DJI drones and accessories.`,
                specs: {
                    inputVoltage: "100–240 V AC, 50–60 Hz, 2.5 A",
                    outputPower:
                        "100 W total; when both ports are used, max 82 W each (dynamic allocation)",
                    operatingTemperature: "5° to 40° C (41° to 104° F)",
                    chargingTime: {
                        mavic3Battery: "Approx. 1 hr 10 mins",
                        rcPro: "Approx. 2 hrs",
                        rcProEnterprise: "Approx. 1 hr 30 mins",
                        goggles2Battery: "Approx. 1 hr 50 mins"
                    }
                },
                inTheBox: [{ title: "DJI 100W USB-C Power Adapter", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI 100W USB-C Power Adapter | Dual-Port Fast Charger",
                metaDescription:
                    "Shop DJI 100W USB-C Power Adapter. Fast charge DJI Mavic 3, Air 3, Avata, and RC controllers simultaneously with 100W output.",
                keywords: [
                    "DJI 100W charger",
                    "Mavic 3 charger",
                    "DJI USB-C power adapter",
                    "DJI RC charger"
                ],
                compatibility: [
                    "DJI Mini 5 Pro",
                    "DJI Mavic 4 Pro",
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3",
                    "DJI Mavic 3 Cine",
                    "DJI Mavic 3 Enterprise Series",
                    "DJI Air 3S",
                    "DJI Air 3",
                    "DJI Avata",
                    "DJI Goggles 2 Battery",
                    "DJI Matrice 4 Series"
                ]
            },

            {
                title: "DJI Mavic 3 Series 100W Battery Charging Hub",
                slug: "dji-mavic-3-series-100w-battery-charging-hub",
                category: "Accessories",
                type: "Charging Hub",
                brand: "DJI",
                salePrice: 8799,
                price: 9399,
                productCategory: "mavic",
                sku: "DJI-M3-HUB-100W",
                stock: 6,
                inStock: true,
                image: "/assets/img/product/dji/mavic3-100w-charging-hub.jpg",
                thumbnails: [
                    "/assets/img/product/dji/mavic3-100w-charging-hub.jpg",
                    "/assets/img/product/dji/mavic3-100w-charging-hub-2.jpg",
                    "/assets/img/product/dji/mavic3-100w-charging-hub-3.jpg"
                ],
                shortDescription:
                    "Charge up to three Mavic 3 Intelligent Flight Batteries in sequence when connected to a 100W power adapter.",
                description: `The DJI Mavic 3 Series 100W Battery Charging Hub expands your charging setup, allowing up to three batteries to be charged sequentially based on their remaining power levels. Pair it with the DJI 100W USB-C Power Adapter or 65W chargers for fast, efficient charging — perfect for professionals who need multiple batteries ready at all times.`,
                specs: {
                    operatingTemperature: "5° to 40° C (41° to 104° F)",
                    input: "5–20 V, max 5 A",
                    chargingTime: {
                        with100WAdapter: "Approx. 1 hr 10 mins per battery",
                        with65WCharger: "Approx. 1 hr 36 mins per battery"
                    }
                },
                inTheBox: [{ title: "DJI Mavic 3 100W Battery Charging Hub", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mavic 3 100W Battery Charging Hub | Triple Charging Station",
                metaDescription:
                    "Buy DJI Mavic 3 100W Battery Charging Hub. Charge up to three Mavic 3 batteries in sequence for efficient field operations.",
                keywords: [
                    "DJI Mavic 3 charging hub",
                    "Mavic 3 battery hub",
                    "DJI 100W charger accessory",
                    "DJI drone battery station"
                ],
                compatibility: ["DJI Mavic 3 Intelligent Flight Battery", "DJI 100W USB - C Power Adapter", "DJI 65W Portable Charger", "DJI 65W Car Charger"]

            },

            {
                title: "DJI 65W Portable Charger",
                slug: "dji-65w-portable-charger",
                category: "Accessories",
                type: "Charger",
                brand: "DJI",
                salePrice: 3999,
                price: 4299,
                productCategory: "mavic",
                sku: "DJI-65W-CHARGER",
                stock: 2,
                inStock: true,
                image: "/assets/img/product/dji/dji-65w-portable-charger.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-65w-portable-charger.jpg",
                    "/assets/img/product/dji/dji-65w-portable-charger-2.jpg"
                ],
                shortDescription:
                    "Compact 65W GaN charger with USB-C and USB-A ports for charging DJI drone batteries, controllers, and mobile devices.",
                description: `The DJI 65W Portable Charger utilizes advanced GaN technology for faster, cooler, and more efficient charging in a compact form. It features both USB-C and USB-A outputs, allowing you to charge an Intelligent Flight Battery and remote controller simultaneously. It supports PD and PPS protocols for universal device compatibility, from drones to laptops and smartphones.`,
                specs: {
                    inputVoltage: "100–240 V, 2 A, 50/60 Hz",
                    output: {
                        usbC: "5V–20V up to 3.25 A (65 W max)",
                        usbA: "5V, 2 A"
                    },
                    ratedPower: "65 W",
                    operatingTemperature: "5° to 40° C (41° to 104° F)",
                    chargingTime: {
                        mavic3Battery: "Approx. 1 hr 36 mins",
                        rcPro: "Approx. 2 hrs"
                    }
                },
                inTheBox: [{ title: "DJI 65W Portable Charger", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI 65W Portable Charger | Compact Dual-Port GaN Power Adapter",
                metaDescription:
                    "Shop DJI 65W Portable Charger with USB-C & USB-A outputs. Charge Mavic 3 batteries, RC controllers, phones, and laptops efficiently.",
                keywords: [
                    "DJI 65W charger",
                    "DJI portable GaN charger",
                    "Mavic 3 battery charger",
                    "DJI USB-C charger"
                ],

                compatibility: [
                    "DJI Mini 5 Pro",
                    "DJI Mavic 4 Pro",
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3",
                    "DJI Mavic 3 Cine",
                    "DJI Air 3S",
                    "DJI Air 3",
                    "DJI Flip",
                    "DJI Avata 2",
                    "DJI Avata",
                    "DJI Neo",
                    "DJI Goggles 2",
                    "DJI Matrice 400"
                ]
            },

            {
                title: "DJI Mavic 3 Series Low-Noise Propellers",
                slug: "dji-mavic-3-series-low-noise-propellers",
                category: "Accessories",
                type: "Propellers",
                brand: "DJI",
                price: 1699,
                productCategory: "mavic",
                sku: "DJI-M3-PROPELLER",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/mavic3-low-noise-propellers.jpg",
                thumbnails: [
                    "/assets/img/product/dji/mavic3-low-noise-propellers.jpg",
                    "/assets/img/product/dji/mavic3-low-noise-propellers-2.jpg",
                    "/assets/img/product/dji/mavic3-low-noise-propellers-3.jpg"
                ],
                shortDescription:
                    "Precisely balanced low-noise propellers that enhance aerodynamic efficiency and reduce flight noise for the Mavic 3 Series.",
                description: `Each DJI Mavic 3 Series Low-Noise Propeller blade undergoes rigorous dynamic balancing tests to achieve optimal aerodynamic performance and quieter flight. Designed for longer, smoother, and more stable operation with reduced propeller noise output.`,
                specs: {
                    dimensions: "9.4 × 5.3 in (23.9 × 13.5 cm)",
                    weight: "8.5 g (single)"
                },
                inTheBox: [{ title: "DJI Mavic 3 Low-Noise Propellers (pair)", quantity: 1 }],

                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mavic 3 Low-Noise Propellers | Quieter, Efficient Flight",
                metaDescription:
                    "Buy DJI Mavic 3 Low-Noise Propellers for quieter operation and improved efficiency. Compatible with all Mavic 3 models.",
                keywords: [
                    "DJI Mavic 3 propellers",
                    "Mavic 3 low noise props",
                    "DJI Mavic 3 blades",
                    "DJI drone propellers"
                ],
                compatibility: [
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3",
                    "DJI Mavic 3 Cine"
                ],
            },

            {
                title: "DJI RC",
                slug: "dji-rc",
                category: "Accessories",
                brand: "DJI",
                type: "RC",
                price: 27439,
                productCategory: "mavic",
                sku: "DJI-RC",
                stock: 4,
                inStock: true,
                image: "/assets/img/product/dji/dji-rc.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-rc.jpg",
                    "/assets/img/product/dji/dji-rc-1.jpg",
                    "/assets/img/product/dji/dji-rc-2.jpg",
                    "/assets/img/product/dji/dji-rc-3.jpg",
                    "/assets/img/product/dji/dji-rc-4.jpg"
                ],
                shortDescription:
                    "Lightweight 390g remote controller with 5.5-inch FHD display, 15km O3+ video transmission, and 4-hour battery life.",
                description: `The DJI RC is a compact, lightweight remote controller featuring an integrated 5.5-inch FHD screen and DJI O3+ transmission for stable, long-range connectivity up to 15 km. With its ergonomic design, dual-spring control sticks, and 4-hour runtime, it delivers a premium flying experience in a portable form factor.`,
                specs: {
                    transmission: "O3+ up to 15 km",
                    weight: "390 g",
                    display: "5.5-inch FHD, 700 nits brightness",
                    maxOperatingTime: "4 hours"
                },
                inTheBox: [
                    { title: "DJI RC", quantity: 1 },
                    { title: "DJI RC Spare Control Sticks (pair)", quantity: 1 },
                    { title: "Type-C to Type-C PD Cable", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI RC | Lightweight Smart Controller with Built-in FHD Display",
                metaDescription:
                    "Buy DJI RC with 15km O3+ video transmission, 5.5-inch FHD screen, and 4-hour battery life. Compatible with Mavic 3, Mini 3, and Air 2S.",
                keywords: [
                    "DJI RC controller",
                    "DJI Mavic 3 controller",
                    "DJI Mini 3 controller",
                    "DJI O3+ remote"
                ],
                compatibility: [
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3",
                    "DJI Mavic 3 Cine",
                    "DJI Mini 3 Pro",
                    "DJI Mini 3",
                    "DJI Air 2S"
                ],
            },

            {
                title: "DJI RC Pro",
                slug: "dji-rc-pro",
                category: "Accessories",
                brand: "DJI",
                type: "RC",
                price: 109499,
                salePrice: 103499,
                productCategory: "mavic",
                sku: "DJI-RC-PRO",
                stock: 2,
                inStock: true,
                image: "/assets/img/product/dji/dji-rc-pro.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-rc-pro.jpg",
                    "/assets/img/product/dji/dji-rc-pro-2.jpg"
                ],
                shortDescription:
                    "Professional-grade controller with 1000-nit 5.5-inch display, 15 km range, 120 ms latency, and advanced audio-video capabilities.",
                description: `The DJI RC Pro is a high-performance controller built for professionals. Featuring a 1000-nit high-brightness FHD display, O3+ transmission up to 15 km, and ultra-low latency of 120 ms, it ensures reliable and responsive flight control. With a powerful processor and support for 4K/120fps playback and third-party apps, it’s designed for cinematic workflows.`,
                specs: {
                    transmission: "O3+ up to 15 km",
                    latency: "120 ms",
                    display: "5.5-inch 1080p, 1000 nits brightness",
                    operatingTime: "Up to 3 hours"
                },
                inTheBox: [
                    { title: "DJI RC Pro", quantity: 1 },
                    { title: "USB 3.0 Type-C Cable", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI RC Pro | 1000-Nit Display, 15 km Range, Pro Flight Control",
                metaDescription:
                    "Shop DJI RC Pro with O3+ transmission, 5.5-inch 1080p high-bright display, 120 ms low latency, and 4K/120fps playback support.",
                keywords: [
                    "DJI RC Pro controller",
                    "DJI Mavic 3 Pro controller",
                    "DJI smart controller",
                    "DJI professional remote"
                ],
                compatibility: [
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3",
                    "DJI Mavic 3 Cine",
                    "DJI Mini 3 Pro",
                    "DJI Air 2S"
                ],
            },

            //DJI Air3 / 3S
            {
                title: "DJI Air 3S Intelligent Flight Battery",
                slug: "dji-air-3s-intelligent-flight-battery",
                category: "Accessories",
                type: "Battery",
                brand: "DJI",
                price: 24759,
                salePrice: 21759,
                productCategory: "air",
                sku: "DJI-AIR3S-BATTERY",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/air3s-battery.jpg",
                thumbnails: [
                    "/assets/img/product/dji/air3s-battery.jpg",
                    "/assets/img/product/dji/air3s-battery-1.jpg",
                    "/assets/img/product/dji/air3s-battery-2.jpg",
                    "/assets/img/product/dji/air3s-battery-3.jpg",
                    "/assets/img/product/dji/air3s-battery-4.jpg"
                ],
                shortDescription:
                    "Provides up to 45 minutes of flight time and supports Off-State QuickTransfer for high-speed file transfer.",
                description: `The DJI Air 3S Intelligent Flight Battery offers up to 45 minutes of flight time for longer sessions and more creative possibilities. It also supports Off-State QuickTransfer, allowing fast data transfer directly to your smartphone even when the drone is powered off.`,
                specs: {
                    model: "BWX234-4276-14.6",
                    capacity: "4276 mAh",
                    type: "Li-ion 4S",
                    chargingTemperature: "5° to 40° C (41° to 104° F)"
                },
                inTheBox: [{ title: "Intelligent Flight Battery", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Air 3S Intelligent Flight Battery | 45-Minute Flight Time",
                metaDescription:
                    "Buy the DJI Air 3S Intelligent Flight Battery with 45-minute max flight time and Off-State QuickTransfer support.",
                keywords: [
                    "DJI Air 3S battery",
                    "DJI Air 3 battery",
                    "DJI Air 3S flight battery",
                    "DJI Air 3S accessories"
                ],
                compatibility: ["DJI Air 3S", "DJI Air 3"]
            },

            {
                title: "DJI Air 3S ND Filter Set (ND8/32/128)",
                slug: "dji-air-3s-nd-filter-set",
                category: "Accessories",
                type: "ND Filter Set",
                brand: "DJI",
                price: 8799,
                productCategory: "air",
                sku: "DJI-AIR3S-ND-FILTER",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/air3s-nd-filter.jpg",
                thumbnails: [
                    "/assets/img/product/dji/air3s-nd-filter.jpg",
                    "/assets/img/product/dji/air3s-nd-filter-1.jpg",
                    "/assets/img/product/dji/air3s-nd-filter-2.jpg",
                    "/assets/img/product/dji/air3s-nd-filter-3.jpg",
                ],
                shortDescription:
                    "Set of ND8, ND32, and ND128 filters for precise shutter control and smooth footage in bright conditions.",
                description: `The DJI Air 3S ND Filter Set includes ND8, ND32, and ND128 filters to help you manage exposure and shutter speed when shooting in bright environments. Perfect for long-exposure shots or cinematic video at low ISO settings.`,
                specs: {
                    lightTransmissionSize: "Wide: 17.15×14.53 mm, Tele: 15.08×13.25 mm",
                    weight: "2.84 g (each)"
                },
                inTheBox: [
                    { title: "ND8 Filter", quantity: 1 },
                    { title: "ND32 Filter", quantity: 1 },
                    { title: "ND128 Filter", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Air 3S ND Filter Set | ND8 ND32 ND128 | Smooth Footage",
                metaDescription:
                    "DJI Air 3S ND Filter Set for precise shutter control and reduced glare in bright lighting. Includes ND8, ND32, and ND128 filters.",
                keywords: [
                    "DJI Air 3S ND filters",
                    "Air 3S ND8 ND32 ND128",
                    "DJI Air 3S camera filters",
                    "DJI Air 3S accessories"
                ],
                compatibility: ["DJI Air 3S"],

            },

            {
                title: "DJI Air 3S Wide-Angle Lens",
                slug: "dji-air-3s-wide-angle-lens",
                category: "Accessories",
                type: "Lens",
                brand: "DJI",
                price: 6349,
                productCategory: "air",
                sku: "DJI-AIR3S-WIDE-LENS",
                stock: 4,
                inStock: true,
                image: "/assets/img/product/dji/air3s-wide-angle-lens.jpg",
                thumbnails: [
                    "/assets/img/product/dji/air3s-wide-angle-lens.jpg",
                    "/assets/img/product/dji/air3s-wide-angle-lens-1.jpg",
                    "/assets/img/product/dji/air3s-wide-angle-lens-2.jpg",
                    "/assets/img/product/dji/air3s-wide-angle-lens-3.jpg"
                ],
                shortDescription:
                    "Expands the FOV of the Air 3S wide-angle camera to 114° for immersive aerial perspectives.",
                description: `This precision-engineered wide-angle lens for DJI Air 3S expands the field of view to 114°, allowing for stunningly wide and cinematic shots. Perfect for landscapes, architecture, and immersive aerial photography.`,
                specs: {
                    weight: "11.8 g",
                    FOV: "114°",
                },
                inTheBox: [{ title: "Wide-Angle Lens", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Air 3S Wide-Angle Lens | 114° Field of View",
                metaDescription:
                    "Get a wider perspective with the DJI Air 3S Wide-Angle Lens. Expands FOV to 114° for cinematic aerial footage.",
                keywords: [
                    "DJI Air 3S wide angle lens",
                    "DJI Air 3S FOV lens",
                    "DJI Air 3S accessories",
                    "DJI Air 3S camera lens"
                ], compatibility: ["DJI Air 3S"],

            },

            {
                title: "DJI Air 3 Intelligent Flight Battery",
                slug: "dji-air-3-intelligent-flight-battery",
                category: "Accessories",
                type: "Battery",
                brand: "DJI",
                price: 14499,
                productCategory: "air",
                sku: "DJI-AIR3-BATTERY",
                stock: 4,
                inStock: true,
                image: "/assets/img/product/dji/air3-battery.jpg",
                thumbnails: [
                    "/assets/img/product/dji/air3-battery.jpg",
                    "/assets/img/product/dji/air3-battery-1.jpg",
                    "/assets/img/product/dji/air3-battery-2.jpg",
                    "/assets/img/product/dji/air3-battery-3.jpg"
                ],
                shortDescription:
                    "Provides up to 46 minutes of flight time for the DJI Air 3 and Air 3S.",
                description: `The DJI Air 3 Intelligent Flight Battery powers your Air 3 or Air 3S drone for up to 46 minutes of continuous flight. Designed for efficiency and reliability, it’s perfect for longer aerial photography sessions.`,
                specs: {
                    model: "BWX233-4241-14.76",
                    capacity: "4241 mAh",
                    type: "Li-ion 4S",
                    chargingTemperature: "5° to 40° C (41° to 104° F)",
                },
                inTheBox: [{ title: "Intelligent Flight Battery", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Air 3 Intelligent Flight Battery | 46-Minute Flight Time",
                metaDescription:
                    "Buy DJI Air 3 Intelligent Flight Battery for 46-minute max flight time. Compatible with Air 3 and Air 3S drones.",
                keywords: [
                    "DJI Air 3 battery",
                    "DJI Air 3S battery",
                    "DJI Air 3 accessories",
                    "DJI drone battery"
                ],
                compatibility: ["DJI Air 3S", "DJI Air 3"],

            },

            {
                title: "DJI Air 3 Series Battery Charging Hub",
                slug: "dji-air-3-series-battery-charging-hub",
                category: "Accessories",
                type: "Charging Hub",
                brand: "DJI",
                price: 6499,
                salePrice: 6199,
                productCategory: "air",
                sku: "DJI-AIR3-CHARGING-HUB",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/air3-charging-hub.jpg",
                thumbnails: [
                    "/assets/img/product/dji/air3-charging-hub.jpg",
                    "/assets/img/product/dji/air3-charging-hub1.jpg",
                    "/assets/img/product/dji/air3-charging-hub2.jpg",
                    "/assets/img/product/dji/air3-charging-hub3.jpg",
                ],
                shortDescription:
                    "Three-battery charging hub with power accumulation and quick device charging support.",
                description: `Charge up to three DJI Air 3 or Air 3S batteries sequentially with the DJI Air 3 Series Battery Charging Hub. It includes a power accumulation function to transfer remaining power from multiple batteries into one and supports fast charging for remote controllers and mobile devices.`,
                specs: {
                    input: "5-20 V, max 5 A",
                    outputPower: "82 W (as power bank)",
                    operatingTemperature: "5° to 40° C (41° to 104° F)",
                },
                inTheBox: [{ title: "Battery Charging Hub", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Air 3 Series Battery Charging Hub | Fast Multi-Battery Charging",
                metaDescription:
                    "DJI Air 3 Series Battery Charging Hub supports three batteries, power accumulation, and fast device charging.",
                keywords: [
                    "DJI Air 3 charging hub",
                    "DJI Air 3S battery charger",
                    "DJI Air 3 accessories",
                    "DJI Air 3 hub"
                ],
                compatibility: ["DJI Air 3S", "DJI Air 3"],

            },

            {
                title: "DJI Air 3 Series Low-Noise Propellers",
                slug: "dji-air-3-series-low-noise-propellers",
                category: "Accessories",
                type: "Propellers",
                brand: "DJI",
                price: 1079,
                productCategory: "air",
                sku: "DJI-AIR3-PROPELLER",
                stock: 10,
                inStock: true,
                image: "/assets/img/product/dji/air3-propellers.jpg",
                thumbnails: [
                    "/assets/img/product/dji/air3-propellers.jpg",
                    "/assets/img/product/dji/air3-propellers1.jpg",
                    "/assets/img/product/dji/air3-propellers2.jpg",
                    "/assets/img/product/dji/air3-propellers3.jpg",
                    "/assets/img/product/dji/air3-propellers4.jpg",
                ],
                shortDescription:
                    "Low-noise propellers tested for aerodynamic efficiency and quieter flight.",
                description: `DJI Air 3 Series Low-Noise Propellers are dynamically balanced for optimal aerodynamic performance and quieter operation, ensuring stable and efficient flight performance.`,
                specs: {
                    dimensions: "8.7×4.7 in (22.1×12 cm)",
                    weight: "6.4 g (single)",
                },
                inTheBox: [{ title: "Low-Noise Propellers (pair)", quantity: 1 }],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Air 3 Series Low-Noise Propellers | Quieter Flight",
                metaDescription:
                    "DJI Air 3 Series Low-Noise Propellers for quieter, smoother flight. Precisely balanced for optimal efficiency.",
                keywords: [
                    "DJI Air 3 propellers",
                    "DJI Air 3S propellers",
                    "DJI Air 3 blades",
                    "DJI low noise propellers"
                ],
                compatibility: ["DJI Air 3S", "DJI Air 3"],

            },

            {
                title: "DJI 65W Car Charger",
                slug: "dji-65w-car-charger",
                category: "Accessories",
                type: "Charger",
                brand: "DJI",
                price: 7999,
                salePrice: 7099,
                productCategory: "air",
                sku: "DJI-65W-CAR-CHARGER",
                stock: 8,
                inStock: true,
                image: "/assets/img/product/dji/65w-car-charger.jpg",
                thumbnails: [
                    "/assets/img/product/dji/65w-car-charger.jpg",
                    "/assets/img/product/dji/65w-car-charger2.jpg"
                ],
                shortDescription:
                    "Compact dual-port car charger supporting 65W output and PD/PPS protocols for multiple DJI devices.",
                description: `The DJI 65W Car Charger allows convenient in-vehicle charging for Intelligent Flight Batteries, remote controllers, and mobile devices. Equipped with USB-C and USB-A ports, it supports simultaneous charging and PPS/PD fast charging standards.`,
                specs: {
                    inputVoltage: "12.7-16 V, 6.5 A",
                    outputUSB_C: "5-20 V, 3.25 A (65 W max)",
                    outputUSB_A: "5 V/2 A",
                    operatingTemperature: "5° to 40° C (41° to 104° F)",

                },
                inTheBox: [
                    { title: "DJI 65W Car Charger", quantity: 1 },
                    { title: "USB-C to USB-C Cable", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI 65W Car Charger | Dual-Port Fast Charger for DJI Devices",
                metaDescription:
                    "DJI 65W Car Charger supports dual-port PD/PPS fast charging for drones, controllers, and devices on the go.",
                keywords: [
                    "DJI 65W car charger",
                    "DJI Air 3 car charger",
                    "DJI portable car charger",
                    "DJI drone accessories"
                ],
                compatibility: [
                    "DJI Mini 5 Pro",
                    "DJI Mavic 4 Pro",
                    "DJI Mavic 3 Series",
                    "DJI Air 3S",
                    "DJI Air 3",
                    "DJI Avata 2",
                    "DJI Avata",
                    "DJI Neo",
                    "DJI Goggles 2"
                ],
            },

            {
                title: "DJI RC Motion 3",
                slug: "dji-rc-motion-3",
                category: "Accessories",
                type: "RC",
                brand: "DJI",
                price: 8799,
                productCategory: "avata",
                sku: "DJI-RC-MOTION3",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/dji-rc-motion-3.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-rc-motion-3.jpg",
                    "/assets/img/product/dji/dji-rc-motion-3-1.jpg",
                    "/assets/img/product/dji/dji-rc-motion-3-2.jpg",
                    "/assets/img/product/dji/dji-rc-motion-3-3.jpg",
                    "/assets/img/product/dji/dji-rc-motion-3-4.jpg",
                ],
                shortDescription:
                    "Immersive motion control when paired with DJI Goggles 3, enabling precise and intuitive ‘point-to-fly’ flight.",
                description:
                    "DJI RC Motion 3 offers immersive wrist-based control when used with DJI Goggles 3. Lightweight, portable, and designed for natural flight navigation. Requires pairing with DJI Goggles 3.",
                specs: {
                },
                inTheBox: [
                    { title: "DJI RC Motion 3", quantity: 1 },
                    { title: "DJI RC Motion 3 Lanyard", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI RC Motion 3 | Immersive Motion Controller",
                metaDescription:
                    "DJI RC Motion 3 enables intuitive motion-based drone control when paired with DJI Goggles 3. Compact, ergonomic, and compatible with DJI Avata 2, Air 3, Mini 4 Pro, and Neo.",
                keywords: [
                    "DJI RC Motion 3",
                    "DJI motion controller",
                    "DJI Goggles 3 controller",
                    "DJI Air 3 accessories",
                    "DJI Avata 2 accessories"
                ],
                compatibility: ["DJI Avata 2", "DJI Mini 4 Pro", "DJI Air 3", "DJI Neo"]

            },

            {
                title: "DJI Mini 4 Pro Intelligent Flight Battery",
                slug: "dji-mini-4-pro-intelligent-flight-battery",
                category: "Accessories",
                type: "Battery",
                brand: "DJI",
                price: 8999,
                productCategory: "mini",
                sku: "DJI-MINI4-BATT",
                stock: 80,
                inStock: true,
                image: "/assets/img/product/dji/dji-mini4-battery.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-mini4-battery.jpg",
                    "/assets/img/product/dji/dji-mini4-battery-2.jpg",
                    "/assets/img/product/dji/dji-mini4-battery-3.jpg",
                    "/assets/img/product/dji/dji-mini4-battery-4.jpg",
                    "/assets/img/product/dji/dji-mini4-battery-5.jpg"
                ],
                shortDescription:
                    "Provides up to 34 minutes of flight time, allowing you to fly and create freely with peace of mind.",
                description:
                    "The DJI Mini 4 Pro Intelligent Flight Battery offers up to 34 minutes of flight time. Compact and lightweight, it ensures stable power delivery and reliable performance during your flights.",
                specs: {
                    model: "BWX140-2590-7.32",
                    weight: "Approx. 77.9 g",
                    capacity: "2590 mAh",
                    nominalVoltage: "7.32 V",
                    maxChargingVoltage: "8.6 V",
                    batteryType: "Li-ion",
                    energy: "18.96 Wh",
                    chargingTime:
                        "70 minutes (with DJI 30W USB-C Charger on aircraft) / 58 minutes (with Charging Hub)",
                    chargingTemperature: "5° to 40°C (41° to 104°F)",
                    recommendedCharger: "DJI 30W USB-C Charger or USB PD Chargers",
                },
                inTheBox: [{ title: "Intelligent Flight Battery", quantity: 1 }],

                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mini 4 Pro Intelligent Flight Battery | 34-Minute Flight Time",
                metaDescription:
                    "DJI Mini 4 Pro Intelligent Flight Battery offers up to 34 minutes of flight time. Reliable Li-ion battery compatible with DJI Mini 4 Pro and Mini 3 Pro.",
                keywords: [
                    "DJI Mini 4 Pro battery",
                    "DJI Mini 3 Pro battery",
                    "DJI Intelligent Flight Battery",
                    "DJI Mini 4 accessories"
                ],
                compatibility: ["DJI Mini 4 Pro", "DJI Mini 3 Pro"],

            },


            {
                title: "DJI Mini 3 Series ND Filter Set (ND16/64/256)",
                slug: "dji-mini-3-series-nd-filter-set-nd16-64-256",
                category: "Accessories",
                type: "ND Filter Set",
                brand: "DJI",
                price: 4899,
                productCategory: "mini",
                sku: "DJI-MINI3-NDSET",
                stock: 70,
                inStock: true,
                image: "/assets/img/product/dji/dji-mini3-ndfilter-set.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-mini3-ndfilter-set.jpg",
                    "/assets/img/product/dji/dji-mini3-ndfilter-set-2.jpg",
                    "/assets/img/product/dji/dji-mini3-ndfilter-set-3.jpg"
                ],
                shortDescription:
                    "Adapt to strong lighting conditions with ND16, ND64, and ND256 filters for consistently clear and balanced shots.",
                description:
                    "The DJI Mini 3 Series ND Filter Set includes ND16, ND64, and ND256 filters to help you capture the perfect shot even in bright lighting conditions. Ideal for long exposure and timelapse photography.",
                specs: {
                    weight: "0.75 g (each)",
                },
                inTheBox: [
                    { title: "ND16 Filter", quantity: 1 },
                    { title: "ND64 Filter", quantity: 1 },
                    { title: "ND256 Filter", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mini 3 Series ND Filter Set (ND16/64/256) | Perfect Exposure Control",
                metaDescription:
                    "Get ND16, ND64, and ND256 filters for DJI Mini 3 Series. Perfect for bright conditions, long exposure, and timelapse photography.",
                keywords: [
                    "DJI Mini 3 ND filters",
                    "DJI Mini 3 Pro ND filter set",
                    "ND16 ND64 ND256 filters",
                    "DJI Mini accessories"
                ],
                compatibility: ["DJI Mini 3 Pro", "DJI Mini 3"]
            },

            {
                title: "DJI Mini 4 Pro/Mini 3 Pro Propellers",
                slug: "dji-mini4-mini3-pro-propellers",
                category: "Accessories",
                type: "Propellers",
                brand: "DJI",
                price: 799,
                productCategory: "mini",
                sku: "DJI-MINI4-PROPELLERS",
                stock: 100,
                inStock: true,
                image: "/assets/img/product/dji/dji-mini4-propellers.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-mini4-propellers.jpg",
                    "/assets/img/product/dji/dji-mini4-propellers-2.jpg",
                    "/assets/img/product/dji/dji-mini4-propellers-3.jpg"
                ],
                shortDescription:
                    "Low-noise, high-efficiency propellers designed for DJI Mini 4 Pro and Mini 3 Pro, providing smooth and stable flight.",
                description:
                    "Propellers specially made for DJI Mini 4 Pro and Mini 3 Pro produce less noise and have undergone precise dynamic balancing tests to ensure high aerodynamic efficiency and powerful thrust. Follow installation instructions carefully and avoid mixing propellers from different packages.",
                specs: {
                    "Diameter × Thread Pitch": "6.0 × 3.0 inch",
                    "Weight (each)": "0.9 g",
                },
                inTheBox: [
                    { title: "Propellers (pair)", quantity: 2 },
                    { title: "Screws", quantity: 12 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mini 4 Pro/Mini 3 Pro Propellers | Low-Noise, Efficient Design",
                metaDescription:
                    "Buy DJI Mini 4 Pro and Mini 3 Pro Propellers. Low-noise, high-efficiency blades for smoother, more stable flight performance.",
                keywords: [
                    "DJI Mini 4 Pro propellers",
                    "DJI Mini 3 Pro propellers",
                    "DJI Mini replacement blades",
                    "DJI Mini accessories"
                ],
                compatibility: ["DJI Mini 4 Pro", "DJI Mini 3 Pro"]

            },

            {
                title: "DJI Mini 4 Pro/Mini 3 Series Two-Way Charging Hub",
                slug: "dji-mini4-mini3-series-two-way-charging-hub",
                category: "Accessories",
                type: "Charging Hub",
                brand: "DJI",
                price: 4355,
                salePrice: 4555,
                productCategory: "mini",
                sku: "DJI-MINI4-HUB",
                stock: 50,
                inStock: true,
                image: "/assets/img/product/dji/dji-mini4-charging-hub.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-mini4-charging-hub.jpg",
                    "/assets/img/product/dji/dji-mini4-charging-hub-2.jpg",
                    "/assets/img/product/dji/dji-mini4-charging-hub-3.jpg",
                    "/assets/img/product/dji/dji-mini4-charging-hub-4.jpg",
                ],
                shortDescription:
                    "Charges up to three DJI Mini 4 Pro/Mini 3 Pro batteries in sequence and can also serve as a power bank.",
                description:
                    "The DJI Mini 4 Pro/Mini 3 Series Two-Way Charging Hub can charge the remote controller and up to three batteries in sequence. It also works as a portable power bank and a safe battery storage solution. When used with the DJI 30W USB-C Charger, three Intelligent Flight Batteries can be fully charged in about three hours.",
                specs: {
                    Model: "CHX162-30",
                    "Recommended Charger": "DJI 30W USB-C Charger or other USB Power Delivery chargers",
                    Input: "5 V, 3 A / 9 V, 3 A / 12 V, 3 A",
                    "Output (USB)": "5 V, 2 A",
                    "Operating Temperature": "5° to 40° C (41° to 104° F)",
                    "Charging Time": "Approx. 3 hours for three batteries",
                },
                inTheBox: [
                    { title: "Two-Way Charging Hub", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mini 4 Pro/Mini 3 Series Two-Way Charging Hub | Fast Multi-Battery Charging",
                metaDescription:
                    "Buy DJI Mini 4 Pro and Mini 3 Series Two-Way Charging Hub. Charge up to 3 batteries and the remote controller efficiently. Doubles as a power bank.",
                keywords: [
                    "DJI Mini 4 Pro Charging Hub",
                    "DJI Mini 3 Pro Charging Hub",
                    "DJI Mini 3 accessories",
                    "DJI battery charger"
                ],
                compatibility: ["DJI Mini 4 Pro", "DJI Mini 3 Pro", "DJI Mini 3"]

            },

            {
                title: "DJI Mini 4 Pro ND Filter Set (ND16/64/256)",
                slug: "dji-mini4pro-nd-filter-set-nd16-64-256",
                category: "Accessories",
                type: "ND Filter Set",
                brand: "DJI",
                price: 4999,
                salePrice: 4899,
                productCategory: "mini",
                sku: "DJI-MINI4-ND-FILTER",
                stock: 60,
                inStock: true,
                image: "/assets/img/product/dji/dji-mini4-ndfilter.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-mini4-ndfilter.jpg",
                    "/assets/img/product/dji/dji-mini4-ndfilter-1.jpg",
                    "/assets/img/product/dji/dji-mini4-ndfilter-2.jpg",
                    "/assets/img/product/dji/dji-mini4-ndfilter-3.jpg",
                    "/assets/img/product/dji/dji-mini4-ndfilter-4.jpg",
                ],
                shortDescription:
                    "ND16/64/256 filters for DJI Mini 4 Pro reduce light in bright conditions, ideal for long exposure and timelapse shots.",
                description:
                    "The DJI Mini 4 Pro ND Filter Set (ND16/64/256) helps you adapt to strong lighting conditions, ensuring perfect exposure and smooth motion in every shot. These filters are ideal for shooting long exposure timelapse and bright outdoor scenes.",
                specs: {
                    "Weight (each)": "0.75 g",
                },
                inTheBox: [
                    { title: "ND16 Filter", quantity: 1 },
                    { title: "ND64 Filter", quantity: 1 },
                    { title: "ND256 Filter", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mini 4 Pro ND Filter Set (ND16/64/256) | Long Exposure Filters",
                metaDescription:
                    "Buy DJI Mini 4 Pro ND Filter Set (ND16/64/256). Capture smooth, perfectly exposed footage even in harsh light. Ideal for long exposure and timelapse shots.",
                keywords: [
                    "DJI Mini 4 Pro ND Filter",
                    "ND16 ND64 ND256 filters",
                    "DJI Mini 4 accessories",
                    "DJI ND filter set"
                ],
                compatibility: ["DJI Mini 4 Pro"]

            },


            {
                title: "DJI Mini 4 Pro Wide-Angle Lens",
                slug: "dji-mini4pro-wide-angle-lens",
                category: "Accessories",
                type: "Lens",
                brand: "DJI",
                price: 3599,
                salePrice: 3469,
                productCategory: "mini",
                sku: "DJI-MINI4-WIDE-LENS",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/dji-mini4-wide-lens.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-mini4-wide-lens.jpg",
                    "/assets/img/product/dji/dji-mini4-wide-lens-1.jpg",
                    "/assets/img/product/dji/dji-mini4-wide-lens-2.jpg",
                    "/assets/img/product/dji/dji-mini4-wide-lens-3.jpg",
                    "/assets/img/product/dji/dji-mini4-wide-lens-4.jpg",
                ],
                shortDescription:
                    "Expand your view — the DJI Mini 4 Pro Wide-Angle Lens increases the photo FOV to 114° and video FOV to 100° (16:9).",
                description:
                    "Capture more of every scene with the DJI Mini 4 Pro Wide-Angle Lens. It expands your field of view from 82.1° to 114° for photos and from 75° to 100° for videos (16:9), allowing for stunning wide landscape shots and immersive perspectives.",
                specs: {
                    Weight: "2.3 g",
                    FOV: "Photo mode 114°, Video mode (16:9) 100°",
                },
                inTheBox: [
                    { title: "Wide-Angle Lens", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mini 4 Pro Wide-Angle Lens | Expand Your Field of View",
                metaDescription:
                    "Get more in every shot with the DJI Mini 4 Pro Wide-Angle Lens. Expands photo FOV to 114° and video FOV to 100° (16:9) for breathtaking wide views.",
                keywords: [
                    "DJI Mini 4 Pro Wide-Angle Lens",
                    "Mini 4 Pro accessories",
                    "DJI wide angle camera lens",
                    "DJI Mini 4 lens attachment"
                ],
                compatibility: ["DJI Mini 4 Pro"],

            },

            {
                title: "DJI Flip Intelligent Flight Battery",
                slug: "dji-flip-intelligent-flight-battery",
                category: "Accessories",
                type : "Battery",
                brand: "DJI",
                price: 8799,
                productCategory: "flip",
                sku: "DJI-FLIP-BATT",
                stock: 80,
                inStock: true,
                image: "/assets/img/product/dji/dji-flip-battery.webp",
                thumbnails: [
                    "/assets/img/product/dji/dji-flip-battery.webp",
                    "/assets/img/product/dji/dji-flip-battery-1.webp",
                    "/assets/img/product/dji/dji-flip-battery-2.webp",
                    "/assets/img/product/dji/dji-flip-battery-3.webp",
                    "/assets/img/product/dji/dji-flip-battery-4.webp"
                ],
                shortDescription:
                    "31-min max flight time. Be prepared and fly freely with peace of mind.",
                description:
                    "The DJI Flip Intelligent Flight Battery offers a maximum flight time of 31 minutes*, allowing you to fly with confidence. Designed for efficiency and safety, it supports fast charging with the DJI 30W or 65W USB-C Chargers. Ideal for long, uninterrupted flights.",
                specs: {
                    Model: "BWX141-3110-7.16",
                    Weight: "Approx. 83.5 g",
                    Capacity: "3110 mAh",
                    "Nominal Voltage": "7.16 V",
                    "Max Charging Voltage": "8.6 V",
                    "Battery Type": "Li-ion",
                    Energy: "22.3 Wh",
                    "Charging Time": "70 min (30W Charger) / 45–70 min (65W Charger via Hub)",
                    "Charging Temperature": "5° to 40° C (41° to 104° F)",
                    "Recommended Charger": "DJI 65W USB-C Charger or other PD chargers",
                },
                inTheBox: [
                    { title: "Intelligent Flight Battery", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Flip Intelligent Flight Battery | 31-Min Max Flight Time",
                metaDescription:
                    "Enjoy up to 31 minutes of flight time with the DJI Flip Intelligent Flight Battery. Lightweight, fast-charging, and built for reliable performance.",
                keywords: [
                    "DJI Flip battery",
                    "DJI Flip Intelligent Flight Battery",
                    "DJI Flip accessories",
                    "DJI drone spare battery"
                ],
                compatibility: ["DJI Flip"],

            },


            {
                title: "DJI Flip Parallel Charging Hub",
                slug: "dji-flip-parallel-charging-hub",
                category: "Accessories",
                type: "Charging Hub",
                brand: "DJI",
                price: 49,
                productCategory: "flip",
                sku: "DJI-FLIP-HUB",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/dji-flip-charging-hub.webp",
                thumbnails: [
                    "/assets/img/product/dji/dji-flip-charging-hub.webp",
                    "/assets/img/product/dji/dji-flip-charging-hub-1.webp",
                    "/assets/img/product/dji/dji-flip-charging-hub-2.webp",
                    "/assets/img/product/dji/dji-flip-charging-hub-2.webp",
                ],
                shortDescription:
                    "Charge 2 DJI Flip batteries simultaneously in as little as 70 minutes. Can also serve as a power bank.",
                description:
                    "The DJI Flip Parallel Charging Hub allows simultaneous charging of two Intelligent Flight Batteries in just 70 minutes when used with the DJI 65W Portable Charger. It also doubles as a power bank — with at least one battery inserted, it can charge external devices like goggles or smartphones. Ideal for efficient charging and travel convenience.",
                specs: {
                    "Input": "5–15 V, max 4.3 A",
                    "Output (Charging)": "5–15 V, max 3 A",
                    "Charging Method": "Charge 2 batteries simultaneously (requires 65W or higher charger)",
                    "Recommended Charger": "DJI 65W Portable Charger or equivalent PD charger (5A cable)",
                    "Charging Time": "2 batteries in approx. 70 minutes",
                    "Function": "Acts as power bank when at least one battery is inserted",
                },
                inTheBox: [
                    { title: "DJI Flip Parallel Charging Hub", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Flip Parallel Charging Hub | Dual Battery Fast Charging",
                metaDescription:
                    "Charge two DJI Flip batteries simultaneously in 70 minutes with the DJI Flip Parallel Charging Hub. Also doubles as a power bank for goggles and phones.",
                keywords: [
                    "DJI Flip charger",
                    "DJI Flip parallel charging hub",
                    "DJI Flip battery charger",
                    "DJI Flip accessories"
                ],
                compatibility: ["DJI Flip"],

            },


            {
                title: "DJI Flip Propellers",
                slug: "dji-flip-propellers",
                category: "Accessories",
                type: "Propellers",
                brand: "DJI",
                price: 799,
                productCategory: "flip",
                sku: "DJI-FLIP-PROPELLERS",
                stock: 10,
                inStock: true,
                image: "/assets/img/product/dji/dji-flip-propellers.webp",
                thumbnails: [
                    "/assets/img/product/dji/dji-flip-propellers.webp",
                    "/assets/img/product/dji/dji-flip-propellers-1.webp",
                    "/assets/img/product/dji/dji-flip-propellers-2.webp",
                    "/assets/img/product/dji/dji-flip-propellers-3.webp",
                ],
                shortDescription:
                    "Low-noise propellers designed for DJI Flip, offering higher efficiency and powerful thrust.",
                description:
                    "Propellers specially made for DJI Flip produce less noise and have undergone precise dynamic balancing tests to deliver higher aerodynamic efficiency and strong thrust. Follow the installation guide carefully to attach propellers to the correct frame arms. Use propellers from the same package for consistent performance.",
                specs: {
                    "Diameter × Thread Pitch": "4.0 × 2.2 inch",
                    "Weight": "0.51 g (each)",
                },
                inTheBox: [
                    { title: "Propellers (pair)", quantity: 2 },
                    { title: "Screws", quantity: 12 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Flip Propellers | Low-Noise High-Efficiency Design",
                metaDescription:
                    "DJI Flip Propellers offer low noise, high efficiency, and precise aerodynamic balance for smoother and quieter flights.",
                keywords: [
                    "DJI Flip propellers",
                    "DJI Flip accessories",
                    "DJI Flip blades",
                    "DJI Flip drone parts"
                ],
                compatibility: ["DJI Flip"],

            },

            {
                title: "DJI Mic Mini Transmitter (Infinity Black)",
                slug: "dji-mic-mini-transmitter-infinity-black",
                category: "Accessories",
                type: "Transmitter",
                brand: "DJI",
                price: 2959,
                productCategory: "audio",
                sku: "DJI-MIC-MINI-BLACK",
                stock: 80,
                inStock: true,
                image: "/assets/img/product/dji/dji-mic-mini-black.webp",
                thumbnails: [
                    "/assets/img/product/dji/dji-mic-mini-black.webp",
                    "/assets/img/product/dji/dji-mic-mini-black1.webp",
                    "/assets/img/product/dji/dji-mic-mini-black2.webp",
                    "/assets/img/product/dji/dji-mic-mini-black3.webp",
                    "/assets/img/product/dji/dji-mic-mini-black4.webp",
                    "/assets/img/product/dji/dji-mic-mini-black5.webp",
                ],
                shortDescription:
                    "Small, ultralight, and discreet wireless transmitter with premium sound, active noise cancelling, and 8-hour battery life.",
                description: `The DJI Mic Mini Transmitter (Infinity Black) delivers high-quality omnidirectional audio in a compact, 10 g body. 
                It supports direct Bluetooth connection via DJI OsmoAudio™ for professional-grade sound without a receiver. 
                With two-level active noise cancelling, automatic limiting to prevent clipping, and up to 8 hours of battery life, it’s perfect for creators who need reliability and premium audio on the go.`,
                specs: {
                    "Transmission Range": "Up to 400 m",
                    "Battery Life": "Up to 8 hours (48 hours with case)",
                    "Audio Pattern": "Omnidirectional",
                    "Noise Cancelling": "Two-level active",
                    "Charging": "USB-C / Charging Dock",
                    "Weight": "Approx. 10 g",

                },
                inTheBox: [
                    { title: "DJI Mic Mini Transmitter (Infinity Black)", quantity: 1 },
                    { title: "DJI Mic Mini Windscreen (Black/Gray)", quantity: 1 },
                    { title: "DJI Mic Mini Windscreen (Black)", quantity: 1 },
                    { title: "DJI Mic Mini Clip Magnet", quantity: 1 },
                    { title: "DJI Mic Mini Compact Carrying Pouch", quantity: 1 },
                    { title: "DJI Mic Mini Transmitter Charging Dock (Infinity Black)", quantity: 1 },
                    { title: "DJI Mic USB-C Charging Cable", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                metaTitle: "DJI Mic Mini Transmitter (Infinity Black) | Compact Wireless Audio System",
                metaDescription:
                    "Buy DJI Mic Mini Transmitter (Infinity Black) – small, ultralight wireless mic with noise cancelling, OsmoAudio™ support, and 8-hour battery life.",
                keywords: [
                    "DJI Mic Mini",
                    "DJI wireless mic",
                    "DJI audio transmitter",
                    "DJI OsmoAudio",
                    "DJI microphone"
                ],
                compatibility: [
                    "DJI Osmo Action 5 Pro",
                    "DJI Osmo Action 4",
                    "DJI Osmo Pocket 3"
                ],
            },

            {
                title: "DJI Neo Intelligent Flight Battery",
                slug: "dji-neo-intelligent-flight-battery",
                category: "Accessories",
                type : "Battery",
                brand: "DJI",
                price: 5900,
                salePrice: 5259,
                productCategory: "neo",
                sku: "DJI-NEO-BAT",
                stock: 10,
                inStock: true,
                image: "/assets/img/product/dji/dji-neo-battery.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-neo-battery.jpg",
                    "/assets/img/product/dji/dji-neo-battery-1.jpg",
                    "/assets/img/product/dji/dji-neo-battery-2.jpg",
                    "/assets/img/product/dji/dji-neo-battery-3.jpg",
                    "/assets/img/product/dji/dji-neo-battery-4.jpg",
                ],
                shortDescription: "Lightweight Li-ion battery offering up to 18 minutes of flight time for DJI Neo.",
                description: `The DJI Neo Intelligent Flight Battery provides up to 18 minutes of flight time, allowing the drone to perform multiple palm takeoff and landing sequences. Its compact and lightweight design maintains optimal power and reliability for extended flights.`,
                specs: {
                    "Capacity": "1435 mAh",
                    "Weight": "Approx. 45 g",
                    "Nominal Voltage": "7.3 V",
                    "Max Charging Voltage": "8.6 V",
                    "Battery Type": "Li-ion",
                    "Energy": "10.5 Wh",
                    "Charging Temperature": "5° to 40° C",
                },
                inTheBox: [
                    { title: "DJI Neo Intelligent Flight Battery", quantity: 1 }
                ],
                rating: 0,
                reviews: 0,
                compatibility: ["DJI Neo"],

            },

            {
                title: "DJI Neo Two-Way Charging Hub",
                slug: "dji-neo-two-way-charging-hub",
                category: "Accessories",
                type: "Charging Hub",
                brand: "DJI",
                price: 3500,
                salePrice: 3100,
                productCategory: "neo",
                sku: "DJI-NEO-HUB",
                stock: 8,
                inStock: true,
                image: "/assets/img/product/dji/dji-neo-charging-hub.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-neo-charging-hub.jpg",
                    "/assets/img/product/dji/dji-neo-charging-hub-1.jpg",
                    "/assets/img/product/dji/dji-neo-charging-hub-2.jpg",
                    "/assets/img/product/dji/dji-neo-charging-hub-3.jpg",
                    "/assets/img/product/dji/dji-neo-charging-hub-4.jpg",
                ],
                shortDescription: "Charge three DJI Neo batteries simultaneously and use as a power bank.",
                description: `The DJI Neo Two-Way Charging Hub stores and charges up to three batteries simultaneously when used with a 65W charger. It also doubles as a power bank to charge devices such as smartphones and goggles, ensuring you stay powered on the go.`,
                specs: {
                    "Input": "5–20 V, max 3 A",
                    "Output (Charging)": "5 V, 2 A",
                    "Charging Method": "Charge 3 batteries simultaneously (charger > 45 W)",
                },
                compatibility: ["DJI Neo"],

                inTheBox: [
                    { title: "DJI Neo Two-Way Charging Hub", quantity: 1 }
                ],
                rating: 0,
                reviews: 0
            },

            {
                title: "DJI Neo Propellers",
                slug: "dji-neo-propellers",
                category: "Accessories",
                type: "Propellers",
                brand: "DJI",
                price: 500,
                salePrice: 449,
                productCategory: "neo",
                sku: "DJI-NEO-PROPS",
                stock: 10,
                inStock: true,
                image: "/assets/img/product/dji/dji-neo-propellers.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-neo-propellers.jpg",
                    "/assets/img/product/dji/dji-neo-propellers-1.jpg",
                    "/assets/img/product/dji/dji-neo-propellers-2.jpg",
                    "/assets/img/product/dji/dji-neo-propellers-3.jpg"
                ],
                shortDescription: "Durable, efficient propellers designed for stable DJI Neo flight performance.",
                description: `DJI Neo Propellers provide efficient and stable propulsion for smooth flight. Each pair is precision-balanced and tested for safety, ensuring optimal performance and reduced noise.`,
                specs: {
                    "Model": "2016S",
                    "Diameter": "50.8 mm",
                    "Weight": "Approx. 0.68 g",

                },
                compatibility: ["DJI Neo"],
                inTheBox: [
                    { title: "DJI Neo Propellers (Pair)", quantity: 2 },
                    { title: "M1.2×3.6mm Screw", quantity: 8 }
                ],
                rating: 0,
                reviews: 0
            },

            {
                title: "DJI FPV Remote Controller 3",
                slug: "dji-fpv-remote-controller-3",
                category: "Accessories",
                type: "RC",
                brand: "DJI",
                price: 18900,
                salePrice: 17699,
                productCategory: "neo",
                stock: 5,
                inStock: true,
                image: "/assets/img/product/dji/dji-fpv-rc3.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-fpv-rc3.jpg",
                    "/assets/img/product/dji/dji-fpv-rc3-2.jpg",
                    "/assets/img/product/dji/dji-fpv-rc3-3.jpg",
                ],
                shortDescription: "Advanced FPV controller supporting manual mode and extended control options.",
                description: `The DJI FPV Remote Controller 3 is engineered for DJI O4 video transmission with integrated antennas and lightweight design. It supports Manual, Sport, and Normal modes, allowing advanced users to practice precision control and flight maneuvers.`,
                specs: {
                    "Weight": "Approx. 240 g",
                    "Dimensions": "165×119×62 mm",
                    "Operating Time": "Approx. 10 hours",
                    "Charging Time": "Approx. 2 hours",
                },
                compatibility: [
                    "DJI Avata 2",
                    "DJI Neo",
                    "DJI O4 Air Unit Pro",
                    "DJI O4 Air Unit",
                    "DJI O3 Air Unit"
                ],
                inTheBox: [
                    { title: "DJI FPV Remote Controller 3", quantity: 1 },
                    { title: "Control Sticks (Pair)", quantity: 1 },
                    { title: "L-shaped Screwdriver", quantity: 1 }
                ],

                rating: 0,
                reviews: 0
            },

            {
                title: "DJI Goggles N3",
                slug: "dji-goggles-n3",
                category: "Accessories",
                type: "Goggles",
                brand: "DJI",
                price: 21900,
                salePrice: 20399,
                productCategory: "neo",
                sku: "DJI-GOGGLES-N3",
                stock: 4,
                inStock: true,
                image: "/assets/img/product/dji/dji-goggles-n3.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-goggles-n3.jpg",
                    "/assets/img/product/dji/dji-goggles-n3-1.jpg",
                    "/assets/img/product/dji/dji-goggles-n3-2.jpg",
                    "/assets/img/product/dji/dji-goggles-n3-3.jpg",
                    "/assets/img/product/dji/dji-goggles-n3-4.jpg",
                ],
                shortDescription: "Immersive 1080p FPV goggles with O4 FHD transmission and head tracking.",
                description: `Pair the DJI Goggles N3 with DJI Neo or Avata 2 for an immersive FPV flight experience. Featuring a 1080p ultra-wide display, O4 FHD transmission, head tracking, and 2.7-hour operating time, these goggles deliver comfort and performance for both creators and racers.`,
                specs: {
                    "Display": "1080p Full HD",
                    "Field of View": "54°",
                    "Transmission": "DJI O4 FHD, up to 13 km range",
                    "Operating Time": "Approx. 2.7 hours",
                },
                compatibility: [
                    "DJI Avata 2",
                    "DJI Neo",
                    "DJI O4 Air Unit Pro",
                    "DJI O4 Air Unit"
                ],
                inTheBox: [
                    { title: "DJI Goggles N3", quantity: 1 }
                ],
                rating: 0,
                reviews: 0
            },

            {
                title: "DJI Neo Propeller Guard",
                slug: "dji-neo-propeller-guard",
                category: "Accessories",
                type: "Propeller Guard",
                brand: "DJI",
                price: 799,
                productCategory: "neo",
                sku: "DJI-NEO-GUARD",
                stock: 10,
                inStock: true,
                image: "/assets/img/product/dji/dji-neo-propellers-guard.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-neo-propellers-guard.jpg",
                    "/assets/img/product/dji/dji-neo-propellers-guard-1.jpg",
                    "/assets/img/product/dji/dji-neo-propellers-guard-2.jpg",
                    "/assets/img/product/dji/dji-neo-propellers-guard-3.jpg",
                ],
                shortDescription: "Protective guards that enclose propellers for safe and secure DJI Neo flights.",
                description: `The DJI Neo Propeller Guard fully encloses the propellers, preventing contact with external objects to enhance flight safety — perfect for beginners or indoor flying.`,
                specs: {
                    "Dimensions": "129.3×68×13.5 mm (L×W×H)",
                    "Weight": "Approx. 2.4 g (each)"
                },
                inTheBox: [
                    { title: "DJI Neo Propeller Guard (Pair)", quantity: 1 }
                ],
                compatibility: ["DJI Neo"],
                rating: 0,
                reviews: 0
            },

            // Avata
            {
                title: "DJI Avata 2 Intelligent Flight Battery",
                slug: "dji-avata-2-intelligent-flight-battery",
                category: "Accessories",
                type : "Battery",
                brand: "DJI",
                price: 19900,
                salePrice: 17900,
                productCategory: "avata",
                sku: "DJI-AVATA2-BAT",
                stock: 8,
                inStock: true,
                image: "/assets/img/product/dji/dji-avata2-battery.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-avata2-battery.jpg",
                    "/assets/img/product/dji/dji-avata2-battery-1.jpg",
                    "/assets/img/product/dji/dji-avata2-battery-2.jpg",
                    "/assets/img/product/dji/dji-avata2-battery-3.jpg",
                ],
                shortDescription: "2150 mAh Li-ion battery delivering approx. 23 min flight time for DJI Avata 2.",
                description: `The DJI Avata 2 Intelligent Flight Battery provides approximately 23 minutes of flight time, empowering immersive FPV flights with confidence and stability. A must-have spare for extended sessions and creative freedom.`,
                specs: {
                    "Capacity": "2150 mAh",
                    "Weight": "Approx. 145 g",
                    "Standard Voltage": "14.76 V",
                    "Max Charging Voltage": "17 V",
                    "Battery Type": "Li-ion",
                    "Energy": "31.7 Wh @ 0.5C",
                    "Charging Temperature": "5° to 40° C (41° to 104° F)",
                },
                compatibility: ["DJI Avata 2"],
                inTheBox: [
                    { title: "DJI Avata 2 Intelligent Flight Battery", quantity: 1 }
                ],
                rating: 0,
                reviews: 0
            },
            {
                title: "DJI Avata 2 Two-Way Charging Hub",
                slug: "dji-avata-2-two-way-charging-hub",
                category: "Accessories",
                type: "Charging Hub",
                brand: "DJI",
                price: 5900,
                salePrice: 5499,
                productCategory: "avata",
                sku: "DJI-AVATA2-HUB",
                stock: 100,
                inStock: true,
                image: "/assets/img/product/dji/dji-avata2-hub.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-avata2-hub.jpg",
                    "/assets/img/product/dji/dji-avata2-hub-1.jpg",
                    "/assets/img/product/dji/dji-avata2-hub-2.jpg",
                    "/assets/img/product/dji/dji-avata2-hub-3.jpg",
                ],
                shortDescription: "Charge three Avata 2 batteries sequentially and use as a power bank.",
                description: `The DJI Avata 2 Two-Way Charging Hub stores, charges, and accumulates power for multiple batteries. Paired with a 65 W charger, it fully charges a battery in 45 minutes and can also power devices like goggles or phones.`,
                specs: {
                    "Input": "5–20 V, max 3 A",
                    "Input (Power Accumulation)": "Max 65 W",
                    "Output (Charging)": "Max 17 V",
                    "Output (USB)": "5 V, 2 A",
                    "Charging Method": "Three batteries charged in sequence",
                    "Recommended Chargers": "DJI 65 W Portable Charger / Car Charger or other PD chargers",
                },
                compatibility: ["DJIx Avata 2"],
                inTheBox: [
                    { title: "DJI Avata 2 Two-Way Charging Hub", quantity: 1 }
                ],
                rating: 0,
                reviews: 0
            },
            {
                title: "DJI Avata 2 ND Filter Set (ND8/16/32)",
                slug: "dji-avata-2-nd-filter-set-nd8-16-32",
                category: "Accessories",
                type: "ND Filter Set",
                brand: "DJI",
                price: 7900,
                salePrice: 7299,
                productCategory: "avata",
                sku: "DJI-AVATA2-ND",
                stock: 6,
                inStock: true,
                image: "/assets/img/product/dji/dji-avata2-nd-filters.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-avata2-nd-filters.jpg",
                    "/assets/img/product/dji/dji-avata2-nd-filters1.jpg",
                    "/assets/img/product/dji/dji-avata2-nd-filters2.jpg",
                    "/assets/img/product/dji/dji-avata2-nd-filters3.jpg",
                ],
                shortDescription: "Set of ND8, ND16 & ND32 filters for precise exposure control.",
                description: `The DJI Avata 2 ND Filter Set (ND8/16/32) helps you control aperture and shutter speed for cinematic results. Capture motion blur or bright-light shots with perfect exposure and color balance.`,
                specs: {
                    "Dimensions (Single Filter)": "26 × 24 mm (L×W)",
                    "Weight (Single Filter)": "Approx. 0.7 g",
                },
                compatibility: ["DJI Avata 2", "DJI O4 Air Unit Pro"],
                inTheBox: [
                    { title: "ND8 Filter", quantity: 1 },
                    { title: "ND16 Filter", quantity: 1 },
                    { title: "ND32 Filter", quantity: 1 }
                ],
                rating: 0,
                reviews: 0
            },
            {
                title: "DJI Avata 2 Propellers",
                slug: "dji-avata-2-propellers",
                category: "Accessories",
                type: "Propellers",
                brand: "DJI",
                price: 900,
                salePrice: 799,
                productCategory: "avata",
                sku: "DJI-AVATA2-PROPS",
                stock: 150,
                inStock: true,
                image: "/assets/img/product/dji/dji-avata2-propellers.jpg",
                thumbnails: [
                    "/assets/img/product/dji/dji-avata2-propellers.jpg",
                    "/assets/img/product/dji/dji-avata2-propellers1.jpg",
                    "/assets/img/product/dji/dji-avata2-propellers2.jpg",
                    "/assets/img/product/dji/dji-avata2-propellers3.jpg",
                ],
                shortDescription: "Efficient, balanced propellers designed for stable Avata 2 flight.",
                description: `The DJI Avata 2 Propellers are optimized for quiet, stable, and efficient flight. Each pair is dynamically balanced and includes replacement screws for safe installation and top-tier performance.`,
                specs: {
                    "Model": "3032S",
                    "Diameter": "75.66 mm",
                    "Weight": "Approx. 1.74 g",
                },
                compatibility: ["DJI Avata 2"],
                inTheBox: [
                    { title: "DJI Avata 2 Propellers (Pair)", quantity: 2 },
                    { title: "M2×8.7 mm Screw", quantity: 8 }
                ],
                rating: 0,
                reviews: 0
            }
        ];


        // await Accessory.deleteMany();
        // console.log("Exisitng accessories deleted");
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
