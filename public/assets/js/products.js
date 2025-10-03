document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('productSearch');
    const searchButton = document.getElementById('searchButton');
    const sortSelect = document.getElementById('sortBy');
    const productGrid = document.getElementById('productGrid');
    const scrollTopButton = document.getElementById('scroll-top');

    let products = []; // Stores fetched products

    // === Detect Page Type ===
    const pageTitle = document.querySelector('.page-title h3')?.textContent || '';
    const isAgriculturePage = pageTitle.toLowerCase().includes('agriculture');
    const isFPVPage = pageTitle.toLowerCase().includes('fpv');
    const isCategoryPage = pageTitle.toLowerCase().includes('dji');

    // === Fetch products from backend ===
    async function fetchProducts(query = "", category = "") {
        try {
            const params = new URLSearchParams();
            if (query) params.append("q", query);
            if (category) params.append("category", category);

            const res = await fetch(`/api/products?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch products");

            let data = await res.json();

            // Filter for page type
            if (isCategoryPage) {
                data = data.filter(p => p.brand?.toLowerCase() === 'dji');
            } else if (isAgriculturePage) {
                data = data.filter(p => p.category?.toLowerCase().includes('agriculture'));
            } else if (isFPVPage) {
                data = data.filter(p => p.category?.toLowerCase().includes('fpv'));
            }

            products = data;
            renderProducts(products);
        } catch (err) {
            console.error("Error loading products:", err);
            if (productGrid) productGrid.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
        }
    }

    // === Render Products & Accessories Below Them ===
    function renderProducts(list) {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        if (!list.length) {
            productGrid.innerHTML = `<p class="text-center text-muted">No products found.</p>`;
            return;
        }

        list.forEach(p => {
            const col = document.createElement('div');
            col.className = 'col-12 col-md-6 col-lg-4 mb-4';
            col.innerHTML = `
              <div class="product-card card shadow-sm border-0" 
                   data-id="${p._id}" 
                   data-slug="${p.slug}" 
                   data-title="${p.title}" 
                   data-price="${p.price}" 
                   data-image="${p.image}">
                <div class="product-image">
                  <img src="${p.image}" alt="${p.title}">
                  <div class="product-overlay">
                    <div class="product-actions">
                      <button type="button" class="action-btn view-btn" title="Quick View"><i class="bi bi-eye"></i></button>
                      <button type="button" class="action-btn cart-btn" title="Add to Cart"><i class="bi bi-cart-plus"></i></button>
                      <button type="button" class="action-btn wishlist-btn" title="Add to Wishlist"><i class="bi bi-heart"></i></button>
                    </div>
                  </div>
                  ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
                </div>
                <div class="product-details">
                  <h4 class="product-title"><a href="product-details.html?slug=${p.slug}">${p.title}</a></h4>
                  <div class="product-meta">
                    <div class="product-price">₹${p.price}</div>
                    <div class="product-rating"><i class="bi bi-star-fill"></i> ${p.rating || 0}</div>
                  </div>
                </div>
              </div>
              <div class="product-accessories mt-2" id="accessories-${p._id}">
                <!-- Accessories will be dynamically rendered here -->
              </div>
            `;
            productGrid.appendChild(col);

            // Fetch & render accessories for this product
            fetchAccessories(p._id);
        });

        attachActionEvents();
    }

    // === Fetch Accessories for a Product ===
    async function fetchAccessories(productId) {
        try {
            const res = await fetch(`/api/products/accessories?productId=${productId}`);
            if (!res.ok) return;
            const accessories = await res.json();
            const container = document.getElementById(`accessories-${productId}`);
            if (container && accessories.length) {
                container.innerHTML = `
                    <h6>Accessories:</h6>
                    <ul class="list-unstyled mb-0">
                        ${accessories.map(a => `<li>${a.title} - ₹${a.price}</li>`).join('')}
                    </ul>
                `;
            }
        } catch (err) {
            console.error("Error fetching accessories:", err);
        }
    }

    // === Attach Quick View, Cart & Wishlist Events ===
    function attachActionEvents() {
        // Quick View
        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const slug = this.closest(".product-card").dataset.slug;
                window.location.href = `product-details.html?slug=${slug}`;
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

    // === Scroll-to-top ===
    window.addEventListener('scroll', function () {
        if (scrollTopButton) scrollTopButton.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });
    scrollTopButton?.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // === Initial Load ===
    fetchProducts(); // Fetch based on page type automatically
});
