window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    const topbar = header?.querySelector(".top-bar");
    const navbarActions = header?.querySelector(".navbar-actions"); // navbar header-actions

    const scrollY = window.scrollY;
    const threshold = 1; // scroll threshold

    if (scrollY > threshold) {
        // Scroll down: hide topbar, show navbar actions
        header.classList.add("scrolled");

        if (topbar) topbar.classList.add("hidden");
        if (navbarActions) navbarActions.classList.add("visible");
    } else {
        // Scroll up: show topbar, hide navbar actions
        header.classList.remove("scrolled");

        if (topbar) topbar.classList.remove("hidden");
        if (navbarActions) navbarActions.classList.remove("visible");
    }
});


// Sample data for the slider (replace with your actual data source)
const sliderData = [
    {
        title: "DJI Mavic 4 Pro Creator Combo",
        description: "Triple-camera Hasselblad system with up to 6K/60fps & 4K/120fps recording, Includes extra batteries, ND filters, storage & DJI RC Pro for creators on the move",
        featuredProduct: {
            image: "assets/img/product/mavic 4 pro combo1.jpg",
            name: "DJI Mavic 4 Pro Creator Combo",
            salePrice: "₹3,60,000",
            originalPrice: "₹4,50,000",
            badge: "Best Seller"
        },
        floatingIcons: [
            "assets/img/product/in-the-box/mavic 4 pro 1.webp",
            "assets/img/product/in-the-box/mavic 4 pro 2.png",
            "assets/img/product/in-the-box/mavic 4 pro 3.webp",
            "assets/img/product/in-the-box/mavic 4 pro 4.webp",
            "assets/img/product/in-the-box/mavic 4 pro 5.webp",
            "assets/img/product/in-the-box/mavic 4 pro 6.webp"
        ],
        usps: [
            { icon: "bi bi-camera", label: "6K Camera" },
            { icon: "bi bi-battery-full", label: "45min Flight Time" },
            { icon: "bi bi-cpu", label: "Advanced Sensor" },
            { icon: "bi bi-broadcast", label: "O4 Transmission" }
        ],
        links: {
            learnMore: "productDetails.html?slug=dji-mini-4-pro"

        }

    },
    {
        title: "DJI Air 3S Flymore Combo Lite",
        description: "Weighing under 249g, this compact powerhouse captures stunning 4K HDR video, flies longer, and delivers safe, seamless cinematic adventures anywhere.",
        featuredProduct: {
            image: "assets/img/product/air3s2.jpg",
            name: "DJI Air 3S Flymore Combo Lite",
            salePrice: "₹1,70,000",
            originalPrice: "₹1,97,000"
        },
        floatingIcons: [
            "assets/img/product/in-the-box/air 3s 1.webp",
            "assets/img/product/in-the-box/air 3s 2.webp",
            "assets/img/product/in-the-box/air 3s 3.webp",
            "assets/img/product/in-the-box/air 3s 5.webp",
            "assets/img/product/in-the-box/air 3s 6.webp",
            "assets/img/product/in-the-box/air 3s 8.webp",
        ],
        usps: [
            { icon: "bi bi-camera-video", label: "4K/100fps HDR Video" },
            { icon: "bi bi-battery-full", label: "Up to 45 min Flight" },
            { icon: "bi bi-shield-check", label: "Omni Obstacle Sensing" },
            { icon: "bi bi-wifi", label: "20km FHD Transmission" }

        ],
        links: {
            learnMore: "productDetails.html?slug=dji-air-3s"
        }
    },
    {
        title: "DJI Mini 4 Pro Fly More Combo",
        description: "Redefine freedom in the skies - a pocket-sized powerhouse that turns every flight into a cinematic story worth sharing.",
        featuredProduct: {
            image: "assets/img/product/mini 4 pro.jpg",
            name: "DJI Mini 4 Pro Fly More Combo",
            salePrice: "₹1,02,000",
            originalPrice: "₹1,30,000",
            badge: "Sale"
        },
        floatingIcons: [
            "assets/img/product/in-the-box/mini 4 pro 1.webp",
            "assets/img/product/in-the-box/mini 4 pro 2.webp",
            "assets/img/product/in-the-box/mini 4 pro 3.webp",
            "assets/img/product/in-the-box/mini 4 pro 7.webp",
            "assets/img/product/in-the-box/mini 4 pro 4.webp",
            "assets/img/product/in-the-box/mini 4 pro 11.webp"
        ],
        usps: [
            { icon: "bi bi-lightning-charge", label: "Ultra-Light Under 249g" },
            { icon: "bi bi-camera-video", label: "True Vertical 4K HDR Video" },
            { icon: "bi bi-battery-full", label: "Up to 45 min Flight" },
            { icon: "bi bi-shield-check", label: "Omni Obstacle Sensing + ActiveTrack 360°" }

        ],
        links: {
            learnMore: "productDetails.html?slug=dji-mini-4-pro"
        }
    },
    {
        title: "DJI Avata 2 Fly More Combo",
        description: "Dive into the sky with Avata 2 the ultimate FPV freedom — compact, agile, and cinematic from every breathtaking angle.",
        featuredProduct: {
            image: "assets/img/product/dji-avata-2.webp",
            name: "DJI Avata 2 Fly More Combo",
            salePrice: "₹1,10,000",
            originalPrice: "₹1,33,000",
            badge: "Sale"
        },
        floatingIcons: [
            "assets/img/product/in-the-box/avata 2 1.png",
            "assets/img/product/in-the-box/avata 2 2.png",
            "assets/img/product/in-the-box/avata 2 3.png",
            "assets/img/product/in-the-box/avata 2 7.png",
            "assets/img/product/in-the-box/avata 2 4.png",
            "assets/img/product/in-the-box/avata 2 5.png"
        ],
        usps: [
            { icon: "bi bi-camera-video", label: "4K HDR Ultra-Wide Video" },
            { icon: "bi bi-vinyl-fill", label: "RockSteady & HorizonSteady" },
            { icon: "bi bi-shield-check", label: "Prop Guards & Safety Modes" },
            { icon: "bi bi-broadcast", label: "DJI O4 Low-Latency 13km Transmission" }

        ],
        links: {
            learnMore: "productDetails.html?slug=dji-avata-2"
        }
    },
    {
        title: "DJI FLIP RC Fly More Combo (DJI RC 2)",
        description: "Lightweight power meets smooth control — capture stunning 4K moments and fly with confidence anytime, anywhere.",
        featuredProduct: {
            image: "assets/img/product/fliprc2.jpg",
            name: "DJI FLIP RC Fly More Combo",
            salePrice: "₹87,000",
            originalPrice: "₹1,03,000",
            badge: "Sale"
        },
        floatingIcons: [
            "assets/img/product/flip4.jpg",
            "assets/img/product/flip2.jpg",
            "assets/img/product/in-the-box/flip 3.webp",
            "assets/img/product/in-the-box/flip 4.webp",
            "assets/img/product/in-the-box/flip 5.webp",
            "assets/img/product/in-the-box/flip 6.webp"
        ],
        usps: [
            { icon: "bi bi-lightning-charge", label: "Ultra-Light Under 249g" },
            { icon: "bi bi-camera-video", label: "True Vertical 4K HDR Video" },
            { icon: "bi bi-battery-full", label: "Up to 45 min Flight" },
            { icon: "bi bi-shield-check", label: "Omni Obstacle Sensing + ActiveTrack 360°" }

        ],
        links: {
            learnMore: "productDetails.html?slug=dji-flip-rc2"
        }
    },
    {
        title: "DJI NEO Fly More Combo",
        description: "Small in size, limitless in creativity. The DJI Mini Neo makes every flight unforgettable.",
        featuredProduct: {
            image: "assets/img/product/Neo combo.jpg",
            name: "DJI Neo Fly More Combo",
            salePrice: "₹45,000",
            originalPrice: "₹56,000",
            badge: "Sale"
        },
        floatingIcons: [
            "assets/img/product/in-the-box/neo 1.webp",
            "assets/img/product/in-the-box/neo 3.webp",
            "assets/img/product/in-the-box/neo 7.webp",
            "assets/img/product/in-the-box/neo 2.webp",
            "assets/img/product/in-the-box/neo 5.webp",
            "assets/img/product/in-the-box/neo 8.webp"
        ],
        usps: [
            { icon: "bi bi-box-arrow-up", label: "Ultra-Light 135g Design" },
            { icon: "bi bi-camera-video", label: "4K Ultra-Stabilized Video" },
            { icon: "bi bi-battery-full", label: "18 min Flight Time" },
            { icon: "bi bi-shield-check", label: "Propeller Guards & Safe Flying" }
        ],
        links: {
            learnMore: "productDetails.html?slug=dji-neo",
        }

    }
];

document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.hero-slider-wrapper');
    const paginationContainer = document.querySelector('.slider-pagination');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');

    let currentSlide = 0;
    let autoSlideInterval;

    function generateSlides() {
        // Select the first (template) slide
        const firstSlide = document.querySelector('.hero-slide');
        const firstData = sliderData[0];

        // Update the first slide dynamically
        firstSlide.querySelector('.hero-title').textContent = firstData.title;
        firstSlide.querySelector('.hero-description').textContent = firstData.description;

        const actions = firstSlide.querySelector('.hero-actions');
        actions.innerHTML = `
  <a href="${firstData.links.learnMore}" class="btn-primary">Learn More</a>
`;


        // Update featured product
        const featuredProduct = firstSlide.querySelector('.featured');
        featuredProduct.querySelector('img').src = firstData.featuredProduct.image;
        featuredProduct.querySelector('img').alt = firstData.featuredProduct.name;
        // featuredProduct.querySelector('.product-badge').textContent = firstData.featuredProduct.badge;
        featuredProduct.querySelector('h4').textContent = firstData.featuredProduct.name;
        featuredProduct.querySelector('.sale-price').textContent = firstData.featuredProduct.salePrice;
        featuredProduct.querySelector('.original-price').textContent = firstData.featuredProduct.originalPrice;

        // Update floating icons
        const floatingElements = firstSlide.querySelectorAll('.floating-icon img');
        floatingElements.forEach((icon, index) => {
            if (firstData.floatingIcons[index]) {
                icon.src = firstData.floatingIcons[index];
                icon.alt = `Floating Icon ${index + 1}`;
            }
        });

        // Update USPs
        const uspContainer = firstSlide.querySelector('.features-list');
        if (uspContainer) {
            uspContainer.innerHTML = ""; // Clear existing
            firstData.usps.forEach(usp => {
                const uspItem = document.createElement("div");
                uspItem.classList.add("feature-item");
                uspItem.innerHTML = `<i class="${usp.icon}"></i><span>${usp.label}</span>`;
                uspContainer.appendChild(uspItem);
            });
        }


        // Clear existing cloned slides
        while (sliderWrapper.children.length > 1) {
            sliderWrapper.removeChild(sliderWrapper.lastChild);
        }

        // Generate remaining slides dynamically
        for (let i = 1; i < sliderData.length; i++) {
            const slideData = sliderData[i];
            const slideTemplate = firstSlide.cloneNode(true);

            // Update cloned slide
            slideTemplate.querySelector('.hero-title').textContent = slideData.title;
            slideTemplate.querySelector('.hero-description').textContent = slideData.description;
            // Update action buttons
            const actions = slideTemplate.querySelector('.hero-actions');
            actions.innerHTML = `
            <a href="${slideData.links.learnMore}" class="btn-primary">Learn More</a>
`;

            const featured = slideTemplate.querySelector('.featured');
            featured.querySelector('img').src = slideData.featuredProduct.image;
            featured.querySelector('img').alt = slideData.featuredProduct.name;
            // featured.querySelector('.product-badge').textContent = slideData.featuredProduct.badge;
            featured.querySelector('h4').textContent = slideData.featuredProduct.name;
            featured.querySelector('.sale-price').textContent = slideData.featuredProduct.salePrice;
            featured.querySelector('.original-price').textContent = slideData.featuredProduct.originalPrice;

            // Update floating icons
            const icons = slideTemplate.querySelectorAll('.floating-icon img');
            icons.forEach((icon, index) => {
                if (slideData.floatingIcons && slideData.floatingIcons[index]) {
                    icon.src = slideData.floatingIcons[index];
                    icon.alt = `Floating Icon ${index + 1}`;
                } else {
                    icon.src = "";
                    icon.alt = "";
                }
            });

            // Update USPs
            const uspBox = slideTemplate.querySelector('.features-list');
            if (uspBox) {
                uspBox.innerHTML = "";
                if (slideData.usps) {
                    slideData.usps.forEach(usp => {
                        const uspItem = document.createElement("div");
                        uspItem.classList.add("feature-item");
                        uspItem.innerHTML = `<i class="${usp.icon}"></i><span>${usp.label}</span>`;
                        uspBox.appendChild(uspItem);
                    });
                }
            }

            // Remove active class so only first slide is visible
            slideTemplate.classList.remove('active');

            sliderWrapper.appendChild(slideTemplate);
        }

        // ✅ Create pagination dots
        createPagination();
    }

    // Create pagination dots
    function createPagination() {
        paginationContainer.innerHTML = '';

        for (let i = 0; i < sliderData.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('pagination-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i)); // ✅ Correct event binding
            paginationContainer.appendChild(dot);
        }
    }

    // Go to specific slide
    function goToSlide(index) {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.pagination-dot');

        if (!slides[index]) return; // ✅ Safety check

        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentSlide = index;

        // Reset auto slide timer
        resetAutoSlide();
    }

    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % sliderData.length;
        goToSlide(nextIndex);
    }

    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + sliderData.length) % sliderData.length;
        goToSlide(prevIndex);
    }

    // Auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Reset auto slide timer
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Initialize slider
    function initSlider() {
        generateSlides();

        // Add event listeners to arrows
        prevArrow.addEventListener('click', prevSlide);
        nextArrow.addEventListener('click', nextSlide);

        // Start auto slide
        startAutoSlide();

        // Pause auto slide on hover
        const sliderContainer = document.querySelector('.hero-slider-container');
        sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        sliderContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize the slider
    initSlider();
    renderBestSellers();
    // loadCardProducts();
    loadFeaturedProducts();

});

// Scroll effect for header
window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    const topbar = header?.querySelector(".top-bar");
    const navbarActions = header?.querySelector(".navbar-actions");

    const scrollY = window.scrollY;
    const threshold = 1;

    if (scrollY > threshold) {
        header.classList.add("scrolled");
        if (topbar) topbar.classList.add("hidden");
        if (navbarActions) navbarActions.classList.add("visible");
    } else {
        header.classList.remove("scrolled");
        if (topbar) topbar.classList.remove("hidden");
        if (navbarActions) navbarActions.classList.remove("visible");
    }
});

async function loadFeaturedProducts() {
    try {
        const res = await fetch("/api/products", { credentials: "include" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const products = await res.json();

        // ✅ Filter Featured only
        const featuredProducts = products.filter(p => p.badge === "Featured");

        // ✅ Still using #best-sellers (as you requested)
        const container = document.querySelector("#best-sellers .row.g-5");
        if (!container) return console.error("Best sellers section not found");

        container.innerHTML = ""; // clear old products

        featuredProducts.forEach(product => {
            const productHTML = `
        <div class="col-lg-3 col-md-6">
          <div class="product-item" data-id="${product._id}" data-slug="${product.slug}">
            <div class="product-image">
              <a href="productDetails.html?slug=${product.slug}">
                <img src="${product.image}" alt="${product.title}" class="img-fluid" loading="lazy">
              </a>

              <div class="product-actions">
                <button class="action-btn wishlist-btn">
                  <i class="bi bi-heart"></i>
                </button>
              </div>

            </div>

            <div class="product-info">
              <div class="product-category">Featured</div>
              <h4 class="product-name">
                <a href="productDetails.html?slug=${product.slug}">
                  ${product.title}
                </a>
              </h4>
              <div class="product-price">
                ${product.oldPrice ? `<span class="old-price">₹${product.oldPrice}</span>` : ``}
                <span class="current-price">₹${product.price}</span>
              </div>
            </div>
          </div>
        </div>
      `;

            container.insertAdjacentHTML("beforeend", productHTML);
        });

        // ✅ Add to Cart
        // container.querySelectorAll(".cart-btn").forEach(btn => {
        //     btn.addEventListener("click", function () {
        //         const id = this.closest(".product-item").dataset.id;
        //         const product = featuredProducts.find(p => p._id === id);
        //         if (product) window.addToCart(product);
        //     });
        // });

        // ✅ Wishlist
        container.querySelectorAll(".wishlist-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.closest(".product-item").dataset.id;
                const product = featuredProducts.find(p => p._id === id);

                if (product) {
                    window.addToWishlist(product);
                    this.querySelector("i").classList.replace("bi-heart", "bi-heart-fill");
                }
            });
        });

    } catch (err) {
        console.error("Error loading Featured products:", err);
    }
}

loadFeaturedProducts();


// const cardsContainer = document.getElementById("cardsContainer");

// // Badge configuration for icon and card background color
// const badgeConfig = {
//     "Trending": { icon: "bi bi-fire", color: "#ff1919ff" },
//     "Best Sellers": { icon: "bi bi-award", color: "#094098ff" },
//     "Featured": { icon: "bi bi-star-fill", color: "#ffea00ff" },
//     "New": { icon: "bi bi-star", color: "#00a600ff" },
//     "Hot": { icon: "bi bi-lightning-charge", color: "#FFF0F5" },
//     "Limited": { icon: "bi bi-hourglass-split", color: "#f58607ff" },
// };

// async function loadCardProducts() {
//     try {
//         const res = await fetch("/api/products");
//         if (!res.ok) throw new Error("Failed to fetch products");
//         const products = await res.json();

//         Object.keys(badgeConfig).forEach((badge, index) => {
//             const filtered = products.filter(p => p.badge === badge);
//             if (filtered.length === 0) return;

//             const col = document.createElement("div");
//             col.className = "col-lg-4 col-md-6 mb-5 mb-md-0 bestseller-card";
//             col.dataset.aosDelay = `${200 + index * 100}`;

//             col.innerHTML = `
//                 <div class="product-category" style="  background: linear-gradient(135deg, var(--surface-color) 20%, color-mix(in srgb, var(--accent-color), transparent 95%) 100%);">
//                     <h3 class="category-title">
//                         <i class="${badgeConfig[badge].icon}" style="color: ${badgeConfig[badge].color};"></i> ${badge}
//                     </h3>
//                     <div class="product-list">
//                         ${filtered.map(product => `
//                             <div class="product-card">
//                                 <div class="product-image">
//                                     <a href="productDetails.html?slug=${product.slug}">
//                                         <img src="${product.image}" alt="${product.title}" class="img-fluid" style="border-radius: 8px;">
//                                     </a>

//                                 </div>
//                                 <div class="product-info">

//                                     <h4 class="product-name">
//                                         <a href="productDetails.html?slug=${product.slug}" style="color:#1f2937;">${product.title}</a>
//                                     </h4>
//                                     <div class="product-price" style="font-weight:600; color:#111;">
//                                         ${product.oldPrice ? `<span class="old-price" style="text-decoration: line-through; margin-right:5px;">${product.oldPrice}</span>` : ''}
//                                         <span class="current-price">${product.price}</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         `).join('')}
//                     </div>
//                 </div>
//             `;

//             cardsContainer.appendChild(col);
//         });

//     } catch (err) {
//         console.error("Error loading card products:", err);
//     }
// }


// 🧩 Modern Center Dialog Box
window.showDialog = function (message, type = "info") {
    // Overlay background
    const overlay = document.createElement("div");
    overlay.className = "dialog-overlay";
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        zIndex: "9998",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0",
        transition: "opacity 0.3s ease",
    });

    // Dialog box
    const dialog = document.createElement("div");
    dialog.className = "dialog-box";
    dialog.textContent = message;

    const colors = {
        success: "#4caf50",
        error: "#f44336",
        info: "#2196f3",
    };

    Object.assign(dialog.style, {
        background: "#fff",
        borderRadius: "12px",
        padding: "24px 28px",
        color: "#333",
        fontSize: "16px",
        fontWeight: "500",
        maxWidth: "400px",
        width: "90%",
        textAlign: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        transform: "scale(0.9)",
        opacity: "0",
        transition: "all 0.25s ease",
        borderTop: `6px solid ${colors[type] || colors.info}`,
    });

    // ✅ Add icon or color line
    const icon = document.createElement("div");
    icon.innerHTML =
        type === "success"
            ? "✅"
            : type === "error"
                ? "❌"
                : "ℹ️";
    Object.assign(icon.style, {
        fontSize: "28px",
        marginBottom: "10px",
    });

    const msg = document.createElement("div");
    msg.textContent = message;

    dialog.textContent = "";
    dialog.appendChild(icon);
    dialog.appendChild(msg);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Fade in
    setTimeout(() => {
        overlay.style.opacity = "1";
        dialog.style.opacity = "1";
        dialog.style.transform = "scale(1)";
    }, 10);

    // Auto close after 2.5s
    setTimeout(() => {
        dialog.style.opacity = "0";
        dialog.style.transform = "scale(0.9)";
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 300);
    }, 1500);
};

// Check stock and status before adding to cart
async function checkProductStock(itemId, refType) {
    try {
        // Determine correct endpoint
        const endpoint =
            refType === "accessory"
                ? `/api/accessories/${itemId}`
                : `/api/products/${itemId}`;

        const res = await fetch(endpoint);
        if (!res.ok) return null;

        const itemData = await res.json();

        // Return stock, status, and refType
        return {
            stock: itemData.stock,
            discontinued:
                itemData.status === "discontinued" || itemData.badge === "Discontinued",
            refType, // keep track for debugging or logic
        };
    } catch (err) {
        console.error("Error checking stock:", err);
        return null;
    }
}



window.addToCart = async function (product, quantity = 1) {
    if (!product || !product._id) {
        console.error("Invalid product data");
        return;
    }

    // 🧩 Detect refType automatically (same logic as wishlist)
    const refType = product.refType || product.type || (
        window.accessories?.some?.(a => a._id === product._id)
            ? "Accessory"
            : "Product"
    );

    try {
        const res = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                product: product._id,
                refType,        // ✅ Send refType properly
                quantity,       // ✅ Default 1 if not specified
                title: product.title,
                image: product.image,
                price: product.price,
            }),
        });

        if (res.status === 401) {
            window.showDialog("Please login to add items to cart", "error");
            window.location.href = "login.html";
            return;
        }

        const data = await res.json();

        if (res.status === 400) {
            window.showDialog(data.message || "Item already in cart", "error");
            return;
        }

        if (res.ok) {
            window.showDialog(`${product.title} added to cart 🛒`, "success");
            window.updateCartBadge?.(data.items?.length || 0);
        }
    } catch (err) {
        console.error("Error adding to cart:", err);
        window.showDialog("Something went wrong. Please try again.", "error");
    }
};


window.addToWishlist = async function (product) {
    if (!product || !product._id) {
        console.error("Invalid product data");
        return;
    }

    // 🧩 Detect refType automatically
    const refType = product.refType || product.type || (
        window.accessories?.some?.(a => a._id === product._id)
            ? "Accessory"
            : "Product"
    );

    try {
        const res = await fetch("/api/wishlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                product: product._id,
                refType: product.refType,        // ✅ include this
                title: product.title,
                image: product.image,
                price: product.price,
            }),
        });

        if (res.status === 401) {
            window.showDialog("Please login to add to wishlist", "error");
            window.location.href = "login.html";
            return;
        }

        const data = await res.json();

        if (res.status === 400) {
            window.showDialog(data.message || "Item already in wishlist", "error");
            return;
        }

        if (res.ok) {
            window.showDialog(`${product.title} added to wishlist ❤️`, "success");
            window.updateWishlistBadge?.(data.items?.length || 0);
        }

    } catch (err) {
        console.error("Error adding to wishlist:", err);
        window.showDialog("Something went wrong. Please try again.", "error");
    }
};


window.buyNow = async function (item, quantity = 1) {
    if (!item || !item._id || !item.refType)
        return console.error("Invalid item data");

    try {
        const stock = await checkProductStock(item._id, item.refType);
        if (stock === null) {
            window.showDialog("Unable to verify stock. Please try again.", "error");
            return;
        }
        if (stock < quantity) {
            window.showDialog("Not enough stock available.", "error");
            return;
        }

        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                itemId: item._id,
                refType: item.refType, // <-- product or accessory
                quantity,
            }),
        });

        if (res.status === 401) {
            window.showDialog("Please login to proceed", "error");
            window.location.href = "login.html";
            return;
        }

        const data = await res.json();
        if (res.ok && data.success) {
            window.showDialog("Redirecting to checkout...", "success");
            setTimeout(() => (window.location.href = "/checkout.html?buyNow=true"), 1000);
        } else {
            window.showDialog("Failed to proceed to checkout", "error");
        }
    } catch (err) {
        console.error("Error in Buy Now:", err);
        window.showDialog("Something went wrong. Please try again.", "error");
    }
};

