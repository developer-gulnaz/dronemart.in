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
            "assets/img/product/mavic 4 pro 1.webp",
            "assets/img/product/mavic 4 pro 2.png",
            "assets/img/product/mavic 4 pro 3.webp",
            "assets/img/product/mavic 4 pro 4.webp",
            "assets/img/product/mavic 4 pro 5.webp",
            "assets/img/product/mavic 4 pro 6.webp"
        ],
        usps: [
            { icon: "bi bi-camera", label: "6K Camera" },
            { icon: "bi bi-battery-full", label: "45min Flight Time" },
            { icon: "bi bi-cpu", label: "Advanced Sensor" },
            { icon: "bi bi-broadcast", label: "O4 Transmission" }
        ],
        links: {
            learnMore: "product-details.html?id=mavic4pro",
            buyNow: "checkout.html?id=mavic4pro"
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
            "assets/img/product/air 3s 1.webp",
            "assets/img/product/air 3s 2.webp",
            "assets/img/product/air 3s 3.webp",
            "assets/img/product/air 3s 5.webp",
            "assets/img/product/air 3s 6.webp",
            "assets/img/product/air 3s 8.webp",
        ],
        usps: [
            { icon: "bi bi-camera-video", label: "4K/100fps HDR Video" },
            { icon: "bi bi-battery-full", label: "Up to 45 min Flight" },
            { icon: "bi bi-shield-check", label: "Omni Obstacle Sensing" },
            { icon: "bi bi-wifi", label: "20km FHD Transmission" }

        ],
        links: {
            learnMore: "product-details.html?id=air3s",
            buyNow: "checkout.html?id=air3s"
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
            "assets/img/product/mini 4 pro 1.webp",
            "assets/img/product/mini 4 pro 2.webp",
            "assets/img/product/mini 4 pro 3.webp",
            "assets/img/product/mini 4 pro 7.webp",
            "assets/img/product/mini 4 pro 4.webp",
            "assets/img/product/mini 4 pro 11.webp"
        ],
        usps: [
            { icon: "bi bi-lightning-charge", label: "Ultra-Light Under 249g" },
            { icon: "bi bi-camera-video", label: "True Vertical 4K HDR Video" },
            { icon: "bi bi-battery-full", label: "Up to 45 min Flight" },
            { icon: "bi bi-shield-check", label: "Omni Obstacle Sensing + ActiveTrack 360°" }

        ],
        links: {
            learnMore: "product-details.html?id=mini4pro",
            buyNow: "checkout.html?id=mini4pro"
        }
    },
    {
        title: "DJI Avata 2 Fly More Combo",
        description: "Dive into the sky with Avata 2 the ultimate FPV freedom — compact, agile, and cinematic from every breathtaking angle.",
        featuredProduct: {
            image: "assets/img/product/AVATA_2.webp",
            name: "DJI Mini 4 Pro Fly More Combo",
            salePrice: "₹1,10,000",
            originalPrice: "₹1,33,000",
            badge: "Sale"
        },
        floatingIcons: [
            "assets/img/product/avata 2 1.png",
            "assets/img/product/avata 2 2.png",
            "assets/img/product/avata 2 3.png",
            "assets/img/product/avata 2 7.png",
            "assets/img/product/avata 2 4.png",
            "assets/img/product/avata 2 5.png"
        ],
        usps: [
            { icon: "bi bi-camera-video", label: "4K HDR Ultra-Wide Video" },
            { icon: "bi bi-vinyl-fill", label: "RockSteady & HorizonSteady" },
            { icon: "bi bi-shield-check", label: "Prop Guards & Safety Modes" },
            { icon: "bi bi-broadcast", label: "DJI O4 Low-Latency 13km Transmission" }

        ],
        links: {
            learnMore: "product-details.html?id=avata2",
            buyNow: "checkout.html?id=avata2"
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
            "assets/img/product/flip 3.webp",
            "assets/img/product/flip_4.webp",
            "assets/img/product/flip 5.webp",
            "assets/img/product/flip 6.webp",
        ],
        usps: [
            { icon: "bi bi-lightning-charge", label: "Ultra-Light Under 249g" },
            { icon: "bi bi-camera-video", label: "True Vertical 4K HDR Video" },
            { icon: "bi bi-battery-full", label: "Up to 45 min Flight" },
            { icon: "bi bi-shield-check", label: "Omni Obstacle Sensing + ActiveTrack 360°" }

        ],
        links: {
            learnMore: "product-details.html?id=flip",
            buyNow: "checkout.html?id=flip"
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
            "assets/img/product/neo 1.webp",
            "assets/img/product/neo 3.webp",
            "assets/img/product/neo 7.webp",
            "assets/img/product/neo 2.webp",
            "assets/img/product/neo 5.webp",
            "assets/img/product/neo 8.webp"
        ],
        usps: [
            { icon: "bi bi-box-arrow-up", label: "Ultra-Light 135g Design" },
            { icon: "bi bi-camera-video", label: "4K Ultra-Stabilized Video" },
            { icon: "bi bi-battery-full", label: "18 min Flight Time" },
            { icon: "bi bi-shield-check", label: "Propeller Guards & Safe Flying" }
        ],
        links: {
            learnMore: "product-details.html?id=neo",
            buyNow: "checkout.html?id=new"
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
  <a href="${firstData.links.buyNow}" class="btn-secondary">Buy Now</a>
`;


        // Update featured product
        const featuredProduct = firstSlide.querySelector('.featured');
        featuredProduct.querySelector('img').src = firstData.featuredProduct.image;
        featuredProduct.querySelector('img').alt = firstData.featuredProduct.name;
        featuredProduct.querySelector('.product-badge').textContent = firstData.featuredProduct.badge;
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
  <a href="${slideData.links.buyNow}" class="btn-secondary">Buy Now</a>
`;

            const featured = slideTemplate.querySelector('.featured');
            featured.querySelector('img').src = slideData.featuredProduct.image;
            featured.querySelector('img').alt = slideData.featuredProduct.name;
            featured.querySelector('.product-badge').textContent = slideData.featuredProduct.badge;
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