const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const Accessory = require('./models/Accessory');

const demoAccessories = [
    {
        productSlug: "dji-avata-2",
        title: "DJI Avata 2 Gimbal Protector",
        description: "Protect your DJI Avata 2 gimbal from scratches and impacts.",
        image: "assets/img/product/in-the-box/avata 2 13.png",
        category: "dji-avata-2"
    },
    {
        productSlug: "dji-avata-2",
        title: "DJI Avata 2 Propeller Screw",
        description: "Spare screws for propeller attachment.",
        image: "assets/img/product/in-the-box/avata 2 14.png",
        category: "dji-avata-2"
    },
    {
        productSlug: "dji-avata-2",
        title: "DJI RC Motion 3 Lanyard",
        description: "Comfortable lanyard for DJI RC Motion 3 remote.",
        image: "assets/img/product/in-the-box/avata 2 11.png",
        category: "dji-avata-2"
    }
];

async function seedDemoAccessories() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // Remove only demo accessories (optional)
        await Accessory.deleteMany({ productId: { $exists: true } });
        console.log("Existing accessories removed");

        for (const item of demoAccessories) {
            const product = await Product.findOne({ slug: item.productSlug });
            if (!product) {
                console.log(`Product not found for slug: ${item.productSlug}`);
                continue;
            }

            const exists = await Accessory.findOne({ productId: product._id, title: item.title });
            if (exists) continue;

            const accessory = new Accessory({
                productId: product._id,
                title: item.title,
                description: item.description,
                image: item.image
            });

            await accessory.save();
            console.log(`Accessory "${item.title}" added for product "${product.title}"`);
        }

        process.exit(0);
    } catch (err) {
        console.error("DB Seed Error:", err);
        process.exit(1);
    }
}


seedDemoAccessories();
