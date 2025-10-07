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
                brand: "DJI",
                price: 381,
                originalPrice: 521,
                productCategory: "mavic",
                sku: "DJI-PWR500-M3",
                stock: 25,
                inStock: true,
                image: "assets/img/product/dji/dji-power-500.jpg",
                thumbnails: [
                    "assets/img/product/dji/dji-power-500.jpg",
                    "assets/img/product/dji/dji-power-500-2.jpg"
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
                ]
            },
            {
                title: "DJI Power 1000 + DJI Power SDC to Mavic 3 Fast Charge Cable",
                slug: "dji-power-1000-sdc-fast-charge-mavic-3",
                category: "Accessories",
                brand: "DJI",
                price: 718,
                originalPrice: 1021,
                productCategory: "mavic",
                sku: "DJI-PWR1000-M3",
                stock: 20,
                inStock: true,
                image: "assets/img/product/dji/dji-power-1000.jpg",
                thumbnails: [
                    "assets/img/product/dji/dji-power-1000.jpg",
                    "assets/img/product/dji/dji-power-1000-2.jpg"
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
                ]
            },
            {
                title: "DJI Power SDC to Mavic 3 Fast Charge Cable",
                slug: "dji-sdc-mavic-3-fast-charge-cable",
                category: "Accessories",
                brand: "DJI",
                price: 22,
                productCategory: "mavic",
                sku: "DJI-SDC-M3",
                stock: 100,
                inStock: true,
                image: "assets/img/product/dji/dji-sdc-mavic3-cable.jpg",
                thumbnails: [
                    "assets/img/product/dji/dji-sdc-mavic3-cable.jpg"
                ],
                shortDescription:
                    "150 W fast charge cable for connecting DJI Power Stations to Mavic 3 series batteries.",
                description: `The DJI Power SDC to Mavic 3 Series Fast Charge Cable enables high-speed charging between DJI Power 500, 1000, or 2000 stations and Mavic 3 drone batteries. With a 150 W power output, it recharges batteries from 0–100% in around 58 minutes, providing professional reliability for field operations.`,
                specs: {
                    length: "40 cm",
                    compatibleDevices: [
                        "DJI Power 500",
                        "DJI Power 1000",
                        "DJI Power 2000",
                        "DJI Mavic 3 Series"
                    ]
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
                ]
            },
            {
                title: "DJI Mavic 3 Pro ND Filter Set (ND8/16/32/64)",
                slug: "dji-mavic-3-pro-nd-filter-set",
                category: "Accessories",
                brand: "DJI",
                price: 179,
                productCategory: "mavic",
                sku: "DJI-M3PRO-NDSET",
                stock: 40,
                inStock: true,
                image: "assets/img/product/dji/mavic3pro-nd-filters.jpg",
                thumbnails: [
                    "assets/img/product/dji/mavic3pro-nd-filters.jpg",
                    "assets/img/product/dji/mavic3pro-nd-filters-2.jpg"
                ],
                shortDescription:
                    "Professional ND filter set (ND8, ND16, ND32, ND64) for DJI Mavic 3 Pro and Pro Cine, designed for smooth long-exposure and cinematic shooting.",
                description: `The DJI Mavic 3 Pro ND Filter Set is tailored for the Mavic 3 Pro's triple-camera system, allowing creators to capture perfect long-exposure and bright-light footage. Each filter provides precise shutter control, maintaining balanced exposure across all lenses — including the tele camera — for consistent, cinematic results.`,
                specs: {
                    filterTypes: ["ND8", "ND16", "ND32", "ND64"],
                    weight: "5.1 g each",
                    compatibility: ["DJI Mavic 3 Pro", "DJI Mavic 3 Pro Cine"]
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
                ]
            },

            {
                title: "DJI Mavic 3 Series Intelligent Flight Battery",
                slug: "dji-mavic-3-series-intelligent-flight-battery",
                category: "Accessories",
                brand: "DJI",
                price: 159,
                productCategory: "mavic",
                sku: "DJI-M3-BATT",
                stock: 50,
                inStock: true,
                image: "assets/img/product/dji/mavic3-battery.jpg",
                thumbnails: [
                    "assets/img/product/dji/mavic3-battery.jpg",
                    "assets/img/product/dji/mavic3-battery-2.jpg"
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
                ]
            },

            {
                title: "DJI 100W USB-C Power Adapter",
                slug: "dji-100w-usb-c-power-adapter",
                category: "Accessories",
                brand: "DJI",
                price: 59,
                productCategory: "mavic",
                sku: "DJI-100W-ADAPTER",
                stock: 80,
                inStock: true,
                image: "assets/img/product/dji/dji-100w-usbc-adapter.jpg",
                thumbnails: [
                    "assets/img/product/dji/dji-100w-usbc-adapter.jpg",
                    "assets/img/product/dji/dji-100w-usbc-adapter-2.jpg"
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
                ]
            },

            {
                title: "DJI Mavic 3 Series 100W Battery Charging Hub",
                slug: "dji-mavic-3-series-100w-battery-charging-hub",
                category: "Accessories",
                brand: "DJI",
                price: 99,
                productCategory: "mavic",
                sku: "DJI-M3-HUB-100W",
                stock: 60,
                inStock: true,
                image: "assets/img/product/dji/mavic3-100w-charging-hub.jpg",
                thumbnails: [
                    "assets/img/product/dji/mavic3-100w-charging-hub.jpg",
                    "assets/img/product/dji/mavic3-100w-charging-hub-2.jpg"
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
                ]
            },

            {
                title: "DJI 65W Portable Charger",
                slug: "dji-65w-portable-charger",
                category: "Accessories",
                brand: "DJI",
                price: 45,
                productCategory: "mavic",
                sku: "DJI-65W-CHARGER",
                stock: 100,
                inStock: true,
                image: "assets/img/product/dji/dji-65w-portable-charger.jpg",
                thumbnails: [
                    "assets/img/product/dji/dji-65w-portable-charger.jpg",
                    "assets/img/product/dji/dji-65w-portable-charger-2.jpg"
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
                ]
            },

            {
                title: "DJI Mavic 3 Series Low-Noise Propellers",
                slug: "dji-mavic-3-series-low-noise-propellers",
                category: "Accessories",
                brand: "DJI",
                price: 19,
                productCategory: "mavic",
                sku: "DJI-M3-PROPELLER",
                stock: 120,
                inStock: true,
                image: "assets/img/product/dji/mavic3-low-noise-propellers.jpg",
                thumbnails: [
                    "assets/img/product/dji/mavic3-low-noise-propellers.jpg",
                    "assets/img/product/dji/mavic3-low-noise-propellers-2.jpg"
                ],
                shortDescription:
                    "Precisely balanced low-noise propellers that enhance aerodynamic efficiency and reduce flight noise for the Mavic 3 Series.",
                description: `Each DJI Mavic 3 Series Low-Noise Propeller blade undergoes rigorous dynamic balancing tests to achieve optimal aerodynamic performance and quieter flight. Designed for longer, smoother, and more stable operation with reduced propeller noise output.`,
                specs: {
                    dimensions: "9.4 × 5.3 in (23.9 × 13.5 cm)",
                    weight: "8.5 g (single)"
                },
                inTheBox: [{ title: "DJI Mavic 3 Low-Noise Propellers (pair)", quantity: 1 }],
                compatibility: [
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3",
                    "DJI Mavic 3 Cine"
                ],
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
                ]
            },

            {
                title: "DJI RC",
                slug: "dji-rc",
                category: "Accessories",
                brand: "DJI",
                price: 309,
                productCategory: "mavic",
                sku: "DJI-RC",
                stock: 40,
                inStock: true,
                image: "assets/img/product/dji/dji-rc.jpg",
                thumbnails: [
                    "assets/img/product/dji/dji-rc.jpg",
                    "assets/img/product/dji/dji-rc-2.jpg"
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
                ]
            },

            {
                title: "DJI RC Pro",
                slug: "dji-rc-pro",
                category: "Accessories",
                brand: "DJI",
                price: 1199,
                productCategory: "mavic",
                sku: "DJI-RC-PRO",
                stock: 25,
                inStock: true,
                image: "assets/img/product/dji/dji-rc-pro.jpg",
                thumbnails: [
                    "assets/img/product/dji/dji-rc-pro.jpg",
                    "assets/img/product/dji/dji-rc-pro-2.jpg"
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
                compatibility: [
                    "DJI Mavic 3 Pro",
                    "DJI Mavic 3 Pro Cine",
                    "DJI Mavic 3 Classic",
                    "DJI Mavic 3",
                    "DJI Mavic 3 Cine",
                    "DJI Mini 3 Pro",
                    "DJI Air 2S"
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
                ]
            },

            //DJI Air3 / 3S
            // {
            //     title: "DJI Air 3S Intelligent Flight Battery",
            //     slug: "dji-air-3s-intelligent-flight-battery",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 245,
            //     productCategory: "air",
            //     sku: "DJI-AIR3S-BATTERY",
            //     stock: 50,
            //     inStock: true,
            //     image: "assets/img/product/dji/air3s-battery.jpg",
            //     thumbnails: [
            //         "assets/img/product/dji/air3s-battery.jpg",
            //         "assets/img/product/dji/air3s-battery-1.jpg",
            //         "assets/img/product/dji/air3s-battery-2.jpg",
            //         "assets/img/product/dji/air3s-battery-3.jpg",
            //         "assets/img/product/dji/air3s-battery-4.jpg",
                    
            //     ],
            //     shortDescription:
            //         "Provides up to 45 minutes of flight time and supports Off-State QuickTransfer for high-speed file transfer.",
            //     description: `The DJI Air 3S Intelligent Flight Battery offers up to 45 minutes of flight time for longer sessions and more creative possibilities. It also supports Off-State QuickTransfer, allowing fast data transfer directly to your smartphone even when the drone is powered off.`,
            //     specs: {
            //         model: "BWX234-4276-14.6",
            //         capacity: "4276 mAh",
            //         type: "Li-ion 4S",
            //         chargingTemperature: "5° to 40° C (41° to 104° F)"
            //     },
            //     inTheBox: [{ title: "Intelligent Flight Battery", quantity: 1 }],
            //     compatibility: ["DJI Air 3S", "DJI Air 3"],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI Air 3S Intelligent Flight Battery | 45-Minute Flight Time",
            //     metaDescription:
            //         "Buy the DJI Air 3S Intelligent Flight Battery with 45-minute max flight time and Off-State QuickTransfer support.",
            //     keywords: [
            //         "DJI Air 3S battery",
            //         "DJI Air 3 battery",
            //         "DJI Air 3S flight battery",
            //         "DJI Air 3S accessories"
            //     ]
            // },

            // {
            //     title: "DJI Air 3S ND Filter Set (ND8/32/128)",
            //     slug: "dji-air-3s-nd-filter-set",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 99,
            //     productCategory: "air",
            //     sku: "DJI-AIR3S-ND-FILTER",
            //     stock: 60,
            //     inStock: true,
            //     image: "assets/img/product/dji/air3s-nd-filter.jpg",
            //     thumbnails: [
            //         "assets/img/product/dji/air3s-nd-filter.jpg",
            //         "assets/img/product/dji/air3s-nd-filter-1.jpg",
            //         "assets/img/product/dji/air3s-nd-filter-2.jpg",
            //         "assets/img/product/dji/air3s-nd-filter-3.jpg",
            //     ],
            //     shortDescription:
            //         "Set of ND8, ND32, and ND128 filters for precise shutter control and smooth footage in bright conditions.",
            //     description: `The DJI Air 3S ND Filter Set includes ND8, ND32, and ND128 filters to help you manage exposure and shutter speed when shooting in bright environments. Perfect for long-exposure shots or cinematic video at low ISO settings.`,
            //     specs: {
            //         lightTransmissionSize: "Wide: 17.15×14.53 mm, Tele: 15.08×13.25 mm",
            //         weight: "2.84 g (each)"
            //     },
            //     inTheBox: [
            //         { title: "ND8 Filter", quantity: 1 },
            //         { title: "ND32 Filter", quantity: 1 },
            //         { title: "ND128 Filter", quantity: 1 }
            //     ],
            //     compatibility: ["DJI Air 3S"],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI Air 3S ND Filter Set | ND8 ND32 ND128 | Smooth Footage",
            //     metaDescription:
            //         "DJI Air 3S ND Filter Set for precise shutter control and reduced glare in bright lighting. Includes ND8, ND32, and ND128 filters.",
            //     keywords: [
            //         "DJI Air 3S ND filters",
            //         "Air 3S ND8 ND32 ND128",
            //         "DJI Air 3S camera filters",
            //         "DJI Air 3S accessories"
            //     ]
            // },

            // {
            //     title: "DJI Air 3S Wide-Angle Lens",
            //     slug: "dji-air-3s-wide-angle-lens",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 69,
            //     productCategory: "air",
            //     sku: "DJI-AIR3S-WIDE-LENS",
            //     stock: 40,
            //     inStock: true,
            //     image: "assets/img/product/dji/air3s-wide-angle-lens.jpg",
            //     thumbnails: [
            //         "assets/img/product/dji/air3s-wide-angle-lens.jpg",
            //         "assets/img/product/dji/air3s-wide-angle-lens-1.jpg",
            //         "assets/img/product/dji/air3s-wide-angle-lens-2.jpg",
            //         "assets/img/product/dji/air3s-wide-angle-lens-3.jpg"
            //     ],
            //     shortDescription:
            //         "Expands the FOV of the Air 3S wide-angle camera to 114° for immersive aerial perspectives.",
            //     description: `This precision-engineered wide-angle lens for DJI Air 3S expands the field of view to 114°, allowing for stunningly wide and cinematic shots. Perfect for landscapes, architecture, and immersive aerial photography.`,
            //     specs: {
            //         weight: "11.8 g",
            //         FOV: "114°"
            //     },
            //     inTheBox: [{ title: "Wide-Angle Lens", quantity: 1 }],
            //     compatibility: ["DJI Air 3S"],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI Air 3S Wide-Angle Lens | 114° Field of View",
            //     metaDescription:
            //         "Get a wider perspective with the DJI Air 3S Wide-Angle Lens. Expands FOV to 114° for cinematic aerial footage.",
            //     keywords: [
            //         "DJI Air 3S wide angle lens",
            //         "DJI Air 3S FOV lens",
            //         "DJI Air 3S accessories",
            //         "DJI Air 3S camera lens"
            //     ]
            // },

            // {
            //     title: "DJI Air 3 Intelligent Flight Battery",
            //     slug: "dji-air-3-intelligent-flight-battery",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 159,
            //     productCategory: "air",
            //     sku: "DJI-AIR3-BATTERY",
            //     stock: 70,
            //     inStock: true,
            //     image: "assets/img/product/dji/air3-battery.jpg",
            //     thumbnails: [
            //         "assets/img/product/dji/air3-battery.jpg",
            //         "assets/img/product/dji/air3-battery-1.jpg",
            //         "assets/img/product/dji/air3-battery-2.jpg",
            //         "assets/img/product/dji/air3-battery-3.jpg",
            //     ],
            //     shortDescription:
            //         "Provides up to 46 minutes of flight time for the DJI Air 3 and Air 3S.",
            //     description: `The DJI Air 3 Intelligent Flight Battery powers your Air 3 or Air 3S drone for up to 46 minutes of continuous flight. Designed for efficiency and reliability, it’s perfect for longer aerial photography sessions.`,
            //     specs: {
            //         model: "BWX233-4241-14.76",
            //         capacity: "4241 mAh",
            //         type: "Li-ion 4S",
            //         chargingTemperature: "5° to 40° C (41° to 104° F)"
            //     },
            //     inTheBox: [{ title: "Intelligent Flight Battery", quantity: 1 }],
            //     compatibility: ["DJI Air 3S", "DJI Air 3"],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI Air 3 Intelligent Flight Battery | 46-Minute Flight Time",
            //     metaDescription:
            //         "Buy DJI Air 3 Intelligent Flight Battery for 46-minute max flight time. Compatible with Air 3 and Air 3S drones.",
            //     keywords: [
            //         "DJI Air 3 battery",
            //         "DJI Air 3S battery",
            //         "DJI Air 3 accessories",
            //         "DJI drone battery"
            //     ]
            // },

            // {
            //     title: "DJI Air 3 Series Battery Charging Hub",
            //     slug: "dji-air-3-series-battery-charging-hub",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 69,
            //     productCategory: "air",
            //     sku: "DJI-AIR3-CHARGING-HUB",
            //     stock: 65,
            //     inStock: true,
            //     image: "assets/img/product/dji/air3-charging-hub.jpg",
            //     thumbnails: [
            //         "assets/img/product/dji/air3-charging-hub.jpg",
            //         "assets/img/product/dji/air3-charging-hub1.jpg",
            //         "assets/img/product/dji/air3-charging-hub2.jpg",
            //         "assets/img/product/dji/air3-charging-hub3.jpg",
            //     ],
            //     shortDescription:
            //         "Three-battery charging hub with power accumulation and quick device charging support.",
            //     description: `Charge up to three DJI Air 3 or Air 3S batteries sequentially with the DJI Air 3 Series Battery Charging Hub. It includes a power accumulation function to transfer remaining power from multiple batteries into one and supports fast charging for remote controllers and mobile devices.`,
            //     specs: {
            //         input: "5-20 V, max 5 A",
            //         outputPower: "82 W (as power bank)",
            //         operatingTemperature: "5° to 40° C (41° to 104° F)"
            //     },
            //     inTheBox: [{ title: "Battery Charging Hub", quantity: 1 }],
            //     compatibility: ["DJI Air 3S", "DJI Air 3"],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI Air 3 Series Battery Charging Hub | Fast Multi-Battery Charging",
            //     metaDescription:
            //         "DJI Air 3 Series Battery Charging Hub supports three batteries, power accumulation, and fast device charging.",
            //     keywords: [
            //         "DJI Air 3 charging hub",
            //         "DJI Air 3S battery charger",
            //         "DJI Air 3 accessories",
            //         "DJI Air 3 hub"
            //     ]
            // },

            // {
            //     title: "DJI Air 3 Series Low-Noise Propellers",
            //     slug: "dji-air-3-series-low-noise-propellers",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 12,
            //     productCategory: "air",
            //     sku: "DJI-AIR3-PROPELLER",
            //     stock: 150,
            //     inStock: true,
            //     image: "assets/img/product/dji/air3-propellers.jpg",
            //     thumbnails: [
            //         "assets/img/product/dji/air3-propellers.jpg",
            //         "assets/img/product/dji/air3-propellers1.jpg",
            //         "assets/img/product/dji/air3-propellers2.jpg",
            //         "assets/img/product/dji/air3-propellers3.jpg",
            //         "assets/img/product/dji/air3-propellers4.jpg",
            //     ],
            //     shortDescription:
            //         "Low-noise propellers tested for aerodynamic efficiency and quieter flight.",
            //     description: `DJI Air 3 Series Low-Noise Propellers are dynamically balanced for optimal aerodynamic performance and quieter operation, ensuring stable and efficient flight performance.`,
            //     specs: {
            //         dimensions: "8.7×4.7 in (22.1×12 cm)",
            //         weight: "6.4 g (single)"
            //     },
            //     inTheBox: [{ title: "Low-Noise Propellers (pair)", quantity: 1 }],
            //     compatibility: ["DJI Air 3S", "DJI Air 3"],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI Air 3 Series Low-Noise Propellers | Quieter Flight",
            //     metaDescription:
            //         "DJI Air 3 Series Low-Noise Propellers for quieter, smoother flight. Precisely balanced for optimal efficiency.",
            //     keywords: [
            //         "DJI Air 3 propellers",
            //         "DJI Air 3S propellers",
            //         "DJI Air 3 blades",
            //         "DJI low noise propellers"
            //     ]
            // },

            // {
            //     title: "DJI 65W Car Charger",
            //     slug: "dji-65w-car-charger",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 79,
            //     productCategory: "air",
            //     sku: "DJI-65W-CAR-CHARGER",
            //     stock: 80,
            //     inStock: true,
            //     image: "assets/img/product/dji/65w-car-charger.jpg",
            //     thumbnails: [
            //         "assets/img/product/dji/65w-car-charger.jpg",
            //         "assets/img/product/dji/65w-car-charger2.jpg"
            //     ],
            //     shortDescription:
            //         "Compact dual-port car charger supporting 65W output and PD/PPS protocols for multiple DJI devices.",
            //     description: `The DJI 65W Car Charger allows convenient in-vehicle charging for Intelligent Flight Batteries, remote controllers, and mobile devices. Equipped with USB-C and USB-A ports, it supports simultaneous charging and PPS/PD fast charging standards.`,
            //     specs: {
            //         inputVoltage: "12.7-16 V, 6.5 A",
            //         outputUSB_C: "5-20 V, 3.25 A (65 W max)",
            //         outputUSB_A: "5 V/2 A",
            //         operatingTemperature: "5° to 40° C (41° to 104° F)"
            //     },
            //     inTheBox: [
            //         { title: "DJI 65W Car Charger", quantity: 1 },
            //         { title: "USB-C to USB-C Cable", quantity: 1 }
            //     ],
            //     compatibility: [
            //         "DJI Mini 5 Pro",
            //         "DJI Mavic 4 Pro",
            //         "DJI Mavic 3 Series",
            //         "DJI Air 3S",
            //         "DJI Air 3",
            //         "DJI Avata 2",
            //         "DJI Avata",
            //         "DJI Neo",
            //         "DJI Goggles 2"
            //     ],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI 65W Car Charger | Dual-Port Fast Charger for DJI Devices",
            //     metaDescription:
            //         "DJI 65W Car Charger supports dual-port PD/PPS fast charging for drones, controllers, and devices on the go.",
            //     keywords: [
            //         "DJI 65W car charger",
            //         "DJI Air 3 car charger",
            //         "DJI portable car charger",
            //         "DJI drone accessories"
            //     ]
            // },

            // {
            //     title: "DJI RC-N Series Remote Controller Monitor Hood",
            //     slug: "dji-rcn-series-monitor-hood",
            //     category: "Accessories",
            //     brand: "DJI",
            //     price: 29,
            //     productCategory: "air",
            //     sku: "DJI-RCN-HOOD",
            //     stock: 90,
            //     inStock: true,
            //     image: "assets/img/product/dji/rcn-monitor-hood.png",
            //     thumbnails: [
            //         "assets/img/product/dji/rcn-monitor-hood.png",
            //         "assets/img/product/dji/rcn-monitor-hood1.png",
            //         "assets/img/product/dji/rcn-monitor-hood2.png",
            //     ],
            //     shortDescription:
            //         "Reduces screen glare on RC-N series remote controllers in bright conditions.",
            //     description: `The DJI RC-N Series Monitor Hood is designed to reduce glare and reflections on your smartphone screen during outdoor flights. Compatible with RC-N1, RC-N2, and RC-N1C remote controllers.`,
            //     specs: {},
            //     inTheBox: [{ title: "Monitor Hood", quantity: 1 }],
            //     compatibility: ["DJI RC-N1", "DJI RC-N2", "DJI RC-N1C"],
            //     rating: 0,
            //     reviews: 0,
            //     metaTitle: "DJI RC-N Series Monitor Hood | Reduce Screen Glare",
            //     metaDescription:
            //         "DJI RC-N Series Remote Controller Monitor Hood reduces glare for better screen visibility outdoors. Compatible with RC-N1, RC-N2, and RC-N1C.",
            //     keywords: [
            //         "DJI monitor hood",
            //         "DJI RC-N1 hood",
            //         "DJI controller sunshade",
            //         "DJI Air 3 accessories"
            //     ]
            // }
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
