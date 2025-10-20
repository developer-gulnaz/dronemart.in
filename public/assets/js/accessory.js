document.addEventListener('DOMContentLoaded', async function () {
    const sidebar = document.querySelector(".sidebar");
    const btn = document.getElementById("mobileSidebarBtn");

    if (!sidebar || !btn) return;

    // 🔹 Toggle sidebar open/close
    btn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        document.body.classList.toggle("sidebar-open");
    });

    // 🔹 Close sidebar when clicking outside
    document.addEventListener("click", (e) => {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !btn.contains(e.target)
        ) {
            sidebar.classList.remove("active");
            document.body.classList.remove("sidebar-open");
        }
    });

    // 🔹 Close when a category link is clicked
    document.querySelectorAll(".category-link").forEach(link => {
        link.addEventListener("click", () => {
            sidebar.classList.remove("active");
            document.body.classList.remove("sidebar-open");
        });
    });

    const searchInput = document.getElementById('productSearch');
    const searchButton = document.getElementById('searchButton');
    const sortSelect = document.getElementById('sortBy');
    const productGrid = document.getElementById('productGrid');
    const categoryLinks = document.querySelectorAll('.category-link');
    const scrollTopButton = document.getElementById('scroll-top');

    const modal = new bootstrap.Modal(document.getElementById('accessoryModal'));
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const modalSpecs = document.getElementById('modalSpecs');
    const cartButton = document.getElementById('cartButton');
    const wishlistButton = document.getElementById('wishlistButton');

    let accessories = [];
    let currentAccessory = null;
    // === Fetch Accessories ===
    async function fetchAccessories(query = "", category = "") {
        try {
            const params = new URLSearchParams();

            // Allow multiple brands
            const brands = ["DJI", "Tattu", "Herewin"];
            brands.forEach(brand => params.append("brand", brand));

            // Add search and category filters
            if (query) params.append("q", query);
            if (category) params.append("productCategory", category);

            // ✅ If category is "Battery" or query mentions battery, add type filter
            if (category === "Battery" || query.toLowerCase().includes("battery")) {
                params.append("type", "Battery");
            }

            const res = await fetch(`/api/accessory?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch accessories");

            const result = await res.json();
            accessories = result.data || [];
            renderAccessories(accessories);
        } catch (err) {
            console.error("Error loading accessories:", err);
            productGrid.innerHTML = `<p class="text-danger">Failed to load accessories.</p>`;
        }
    }


    // === Render Accessories ===
    function renderAccessories(list) {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        if (!list.length) {
            productGrid.innerHTML = `<p class="text-center text-muted">No accessories found.</p>`;
            return;
        }

        list.forEach(a => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 mb-4';
            col.innerHTML = `
      <div class="product-card card shadow-sm border-0 position-relative"
           data-id="${a._id}"
           data-title="${a.title}"
           data-price="${a.price}"
           data-image="${a.image}">
        <div class="product-image position-relative overflow-hidden">
          <img src="${a.image}" alt="${a.title}" class="w-100">
          <div class="product-overlay d-flex justify-content-center align-items-center gap-2">
            <button class="btn btn-light view-btn" title="View"><i class="bi bi-eye"></i></button>
            <button class="btn btn-light cart-btn" title="Add to Cart"><i class="bi bi-cart-plus"></i></button>
            <button class="btn btn-light wishlist-btn" title="Add to Wishlist"><i class="bi bi-heart"></i></button>
          </div>
        </div>
        <div class="p-3 text-center">
          <h6 class="mb-1">${a.title}</h6>
          <p class="text-muted mb-2">${a.productCategory || ''}</p>
          <h6 class="text-primary mb-0">₹${a.price}</h6>
        </div>
      </div>
    `;
            productGrid.appendChild(col);
        });

        attachAccessoryActions(list);
    }


    function attachAccessoryActions(accessories) {
        // === View button: open modal ===
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.closest('.product-card').dataset.id;
                const acc = accessories.find(a => a._id === id);
                if (!acc) return;

                currentAccessory = acc;

                // Set modal content
                modalTitle.textContent = acc.title;

                // Price handling
                const salePriceEl = document.querySelector('.sale-price');
                const regularPriceEl = document.querySelector('.regular-price');
                const discountPercentEl = document.querySelector('.discount-percent');

                const price = parseFloat(acc.price) || 0;
                const salePrice = parseFloat(acc.salePrice) || price;

                salePriceEl.textContent = `₹${salePrice}`;
                if (salePrice < price) {
                    regularPriceEl.textContent = `₹${price}`;
                    const percent = Math.round(((price - salePrice) / price) * 100);
                    discountPercentEl.textContent = `(${percent}% off)`;
                } else {
                    regularPriceEl.textContent = '';
                    discountPercentEl.textContent = '';
                }

                modalDescription.textContent = acc.description || "No description available.";

                // === Image Slider (Thumbnails + Main Image) ===
                const images = acc.thumbnails?.length ? acc.thumbnails : [acc.image];
                const indicators = document.querySelector('#modalImageIndicators');
                const inner = document.querySelector('#modalImageInner');
                if (inner && indicators) {
                    indicators.innerHTML = '';
                    inner.innerHTML = '';
                    images.forEach((img, i) => {
                        indicators.innerHTML += `
                        <button type="button" data-bs-target="#accessoryCarousel"
                                data-bs-slide-to="${i}" ${i === 0 ? 'class="active"' : ''}></button>`;
                        inner.innerHTML += `
                        <div class="carousel-item ${i === 0 ? 'active' : ''}">
                            <img src="${img}" class="d-block w-100" alt="Accessory image ${i + 1}">
                        </div>`;
                    });
                }

                // === Specs ===
                modalSpecs.innerHTML = acc.specs
                    ? `<div class="acc-specs">
                    ${Object.entries(acc.specs)
                        .map(([k, v]) => `<div class="data"><strong>${k}:</strong> ${v}</div>`)
                        .join('')}
                   </div>`
                    : "";

                // === In The Box ===
                const inBoxContainer = document.getElementById('modalInBox');
                if (inBoxContainer) {
                    inBoxContainer.innerHTML = acc.inTheBox?.length
                        ? `<ul class="list-unstyled mb-0">
                        ${acc.inTheBox.map(item =>
                            `<li>• ${item.title}${item.quantity ? ` ×${item.quantity}` : ''}</li>`
                        ).join('')}
                       </ul>`
                        : "<p class='text-muted mb-0'>No items listed.</p>";
                }

                // === Compatibility ===
                const compatContainer = document.getElementById('modalCompatibility');
                if (compatContainer) {
                    compatContainer.innerHTML = acc.compatibility?.length
                        ? `<ul class="list-unstyled mb-0">
                        ${acc.compatibility.map(c => `<li>• ${c}</li>`).join('')}
                       </ul>`
                        : "<p class='text-muted mb-0'>Compatibility info not available.</p>";
                }

                modal.show();
            });
        });

        // === Add to Cart ===
        document.querySelectorAll('.cart-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.closest('.product-card').dataset.id;
                const acc = accessories.find(a => a._id === id);
                if (acc && window.addToCart) window.addToCart(acc);
            });
        });

        // === Wishlist ===
        document.querySelectorAll('.wishlist-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.closest('.product-card').dataset.id;
                const acc = accessories.find(a => a._id === id);
                if (acc && window.addToWishlist) window.addToWishlist(acc);
            });
        });
    }

    // === Add to Cart / Wishlist in Modal ===
    cartButton.addEventListener('click', () => {
        if (!currentAccessory) return;
        window.addToCart(currentAccessory);
    });

    wishlistButton.addEventListener('click', () => {
        if (!currentAccessory) return;
        window.addToWishlist(currentAccessory);
    });

    // === Search ===
    function performSearch() {
        const term = (searchInput?.value || '').toLowerCase();
        const filtered = accessories.filter(a =>
            a.title.toLowerCase().includes(term) ||
            (a.category || "").toLowerCase().includes(term)
        );
        renderAccessories(filtered);
    }

    searchButton?.addEventListener('click', performSearch);
    searchInput?.addEventListener('input', performSearch);

    // === Sort ===
    sortSelect?.addEventListener('change', function () {
        const val = this.value;
        let sorted = [...accessories];
        sorted.sort((a, b) => {
            const aPrice = parseFloat(a.price) || 0;
            const bPrice = parseFloat(b.price) || 0;
            switch (val) {
                case 'price-low': return aPrice - bPrice;
                case 'price-high': return bPrice - aPrice;
                default: return 0;
            }
        });
        renderAccessories(sorted);
    });

    // === Category Filter ===


    // === Category Filter ===
    // === Load category from hash (used on page load or hash change) ===
    function loadCategoryFromHash() {
        const hash = window.location.hash.substring(1); // remove '#'
        if (hash) {
            const activeLink = document.querySelector(`.category-link[data-category="${hash}"]`);

            // Highlight correct category
            categoryLinks.forEach(l => l.classList.remove('active'));
            if (activeLink) activeLink.classList.add('active');

            // Fetch matching category
            fetchAccessories("", hash);
        } else {
            // Load default (optional)
            fetchAccessories("", "");
        }
    }

    if (categoryLinks.length) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                const category = this.dataset.category;

                // ✅ Update URL hash without reload
                history.pushState(null, "", `#${category}`);

                // ✅ Fetch data
                fetchAccessories("", category);

                // ✅ Update active link
                categoryLinks.forEach(l => l.classList.remove("active"));
                this.classList.add("active");
            });
        });

        // ✅ Load correct category when page first opens
        loadCategoryFromHash();

        // ✅ Handle navbar clicks or back/forward navigation
        window.addEventListener('hashchange', loadCategoryFromHash);
    }


    // === Scroll to Top ===
    window.addEventListener('scroll', () => {
        if (scrollTopButton) scrollTopButton.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });
    scrollTopButton?.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Initial Load ===
    fetchAccessories();
});
