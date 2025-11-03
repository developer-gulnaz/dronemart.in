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

    let products = []; // Stores fetched products

    // === Detect Page Type ===
    const pageTitle = document.title || '';
    const isSpecializedPage = pageTitle.toLowerCase().includes('specialized');
    const isCategoryPage = pageTitle.toLowerCase().includes('category');

    // === Fetch products from backend ===
    async function fetchProducts(query = "", category = "") {
        try {
            const params = new URLSearchParams();
            if (query) params.append("q", query);
            if (category) params.append("category", category);

            const res = await fetch(`/api/products?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch products");

            let data = await res.json();

            // Filter for DJI on category page
            if (isCategoryPage) {
                data = data.filter(p => p.brand?.toLowerCase() === 'dji');
            }

            products = data;
            renderProducts(products);
            console.log("dji product -- " + products);
        } catch (err) {
            console.error("Error loading products:", err);
            if (productGrid) productGrid.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
        }
    }

    // === Render Products ===
    function renderProducts(list) {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        if (!list.length) {
            productGrid.innerHTML = `<p class="text-center text-muted">No products found.</p>`;
            return;
        }

        list.forEach(p => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4';
            col.innerHTML = `
              <div class="product-card card shadow-sm border-0" 
                   data-id="${p._id}" 
                   data-slug="${p.slug}" 
                   data-title="${p.title}" 
                   data-price="${p.price}" 
                   data-image="${p.image}">
                <div class="product-image">
                  <img src="${p.image}" alt="${p.title}" class="w-100">
                  <div class="product-overlay">
                    <div class="product-actions">
                      <button type="button" class="action-btn view-btn" title="Quick View"><i class="bi bi-eye"></i></button>

${p.badge?.toLowerCase() === "discontinued"
                    ? `<button type="button" class="action-btn cart-btn disabled" title="Unavailable" disabled><i class="bi bi-ban"></i></button>`
                    : `<button type="button" class="action-btn cart-btn" title="Add to Cart"><i class="bi bi-cart-plus"></i></button>`}
                      <button type="button" class="action-btn wishlist-btn" title="Add to Wishlist"><i class="bi bi-heart"></i></button>
                    </div>
                  </div>
                  ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
                </div>
                <div class="productDetails">
                  <div class="product-category">${p.category || ""}</div>
                  <h4 class="product-title"><a href="productDetails.html?slug=${p.slug}">${p.title}</a></h4>
                  <div class="product-meta">
                    <div class="product-price">₹${p.price}</div>
                    <div class="product-rating"><i class="bi bi-star-fill"></i> ${p.rating || 0}</div>
                  </div>
                </div>
              </div>
            `;
            productGrid.appendChild(col);
        });

        attachActionEvents();
    }

    // === Attach Quick View, Cart & Wishlist Events ===
    function attachActionEvents() {
        // Quick View
        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const slug = this.closest(".product-card").dataset.slug;
                window.location.href = `productDetails.html?slug=${slug}`;
            });
        });

        // Add to Cart
        document.querySelectorAll(".cart-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const card = this.closest(".product-card");
                if (!card) return;
                const product = {
                    _id: card.dataset.id,
                    title: card.dataset.title,
                    price: card.dataset.price,
                    image: card.dataset.image
                };
                window.addToCart(product);
            });
        });

        // Add to Wishlist
        document.querySelectorAll(".wishlist-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const card = this.closest(".product-card");
                const id = card.dataset.id;
                const product = products.find(p => p._id === id);
                if (!product) return;
                window.addToWishlist(product);
            });
        });
    }

    // === Search ===
    function performSearch() {
        const term = (searchInput?.value || '').toLowerCase();
        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(term) ||
            (p.category || "").toLowerCase().includes(term)
        );
        renderProducts(filtered);
    }

    searchButton?.addEventListener('click', performSearch);
    searchInput?.addEventListener('keyup', e => { if (e.key === 'Enter') performSearch(); });
    searchInput?.addEventListener('input', performSearch);

    // === Sort ===
    sortSelect?.addEventListener('change', function () {
        const val = this.value;
        let sorted = [...products];
        sorted.sort((a, b) => {
            const aPrice = parseFloat(a.price) || 0;
            const bPrice = parseFloat(b.price) || 0;
            const aRating = parseFloat(a.rating) || 0;
            const bRating = parseFloat(b.rating) || 0;
            switch (val) {
                case 'price-low': return aPrice - bPrice;
                case 'price-high': return bPrice - aPrice;
                case 'rating': return bRating - aRating;
                case 'newest': return new Date(b.createdAt) - new Date(a.createdAt);
                default: return 0;
            }
        });
        renderProducts(sorted);
    });

    // === Category Filter ===
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const categoryId = this.dataset.id || this.textContent.trim().toLowerCase().replace(/\s+/g, '-');
            window.location.hash = categoryId;

            // ✅ Fetch products instantly
            fetchProducts("", categoryId);
        });
    });


    // === Scroll-to-top ===
    window.addEventListener('scroll', function () {
        if (scrollTopButton) scrollTopButton.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });
    scrollTopButton?.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Initial Load ===
    const hashCategory = window.location.hash.replace('#', '');

    if (hashCategory) {
        // ✅ Load products from hash when page opens
        fetchProducts("", hashCategory);
    } else if (!isSpecializedPage) {
        fetchProducts();
    }

    // ✅ Handle when hash changes (e.g. user clicks category again)
    window.addEventListener('hashchange', () => {
        const newCategory = window.location.hash.replace('#', '');
        if (newCategory) fetchProducts("", newCategory);
    });


});