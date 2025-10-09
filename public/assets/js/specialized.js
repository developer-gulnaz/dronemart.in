document.addEventListener('DOMContentLoaded', async function () {
    const searchInput = document.getElementById('productSearch');
    const searchButton = document.getElementById('searchButton');
    const sortSelect = document.getElementById('sortBy');
    const productGrid = document.getElementById('productGrid');
    const scrollTopButton = document.getElementById('scroll-top');

    let products = []; 
    let accessories = []; // ✅ FIXED: store accessories globally for wishlist/cart

    // === Detect Page Type ===
    const pageTitle = document.querySelector('.page-title h3')?.textContent || '';
    const isAgriculturePage = pageTitle.toLowerCase().includes('agriculture');
    const isFPVPage = pageTitle.toLowerCase().includes('fpv');

    // ============================================================== 
    // 🟢 FETCH PRODUCTS HANDLER
    // ============================================================== 
    async function fetchProducts(query = "", category = "") {
        try {
            const params = new URLSearchParams();
            if (query) params.append("q", query);
            if (category) params.append("category", category);

            const res = await fetch(`/api/products?${params.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch products");
            let data = await res.json();

            // Filter based on page type
            if (isAgriculturePage) {
                data = data.filter(p => p.category?.toLowerCase().includes('agriculture'));
            } else if (isFPVPage) {
                data = data.filter(p => p.category?.toLowerCase().includes('fpv'));
            }

            products = data;
            window.products = data; // ✅ FIXED: expose globally
            renderItems(products, "product");
        } catch (err) {
            console.error("Error loading products:", err);
            if (productGrid)
                productGrid.innerHTML = `<p class="text-danger">Failed to load products.</p>`;
        }
    }

    // ============================================================= 
    // 🧩 UNIVERSAL FETCH (for Products or Accessories)
    // ============================================================= 
    async function fetchItems(type = "product", query = "", category = "") {
        try {
            const params = new URLSearchParams();
            if (query) params.append("q", query);
            if (category) {
                params.append(type === "accessory" ? "productCategory" : "category", category);
            }

            // ✅ Add brand filter only for DJI Accessories Page
            if (type === "accessory" && pageTitle.toLowerCase().includes("dji")) {
                params.append("brand", "dji");
            }

            const endpoint = type === "accessory" ? "/api/accessory" : "/api/products";
            const res = await fetch(`${endpoint}?${params.toString()}`);
            if (!res.ok) throw new Error(`Failed to fetch ${type}s`);

            let data = await res.json();
            data = data.data || data;

            // === Filter logic for both products & accessories ===
            if (isAgriculturePage) {
                data = data.filter(p =>
                    (p.category?.toLowerCase().includes("agriculture") ||
                        p.productCategory?.toLowerCase().includes("agriculture"))
                );
            } else if (isFPVPage) {
                data = data.filter(p =>
                    (p.category?.toLowerCase().includes("fpv") ||
                        p.productCategory?.toLowerCase().includes("fpv"))
                );
            }

            // ✅ FIXED: store in global variable
            if (type === "accessory") {
                accessories = data;
                window.accessories = data;
            } else {
                products = data;
                window.products = data;
            }

            renderItems(data, type);
        } catch (err) {
            console.error(`Error loading ${type}s:`, err);
            const container = type === "accessory"
                ? document.getElementById("accessory-list-category")
                : productGrid;
            if (container)
                container.innerHTML = `<p class="text-danger text-center">Failed to load ${type}s.</p>`;
        }
    }

    // ============================================================= 
    // 🧩 UNIVERSAL RENDER FUNCTION
    // ============================================================= 
    function renderItems(list, type = "product") {
        const container = productGrid;
        if (!container) return;

        container.innerHTML = "";

        if (!list.length) {
            container.innerHTML = `<p class="text-center text-muted">No ${type}s found.</p>`;
            return;
        }

        const activeItems = list.filter(item => item.badge?.toLowerCase() !== "discontinued");
        const discontinuedItems = list.filter(item => item.badge?.toLowerCase() === "discontinued");

        const renderSection = (items, sectionTitle = "") => {
            if (!items.length) return "";

            const cards = items.map(item => `
            <div class="col-12 col-md-6 col-lg-4 mb-4">
                <div class="product-card card shadow-sm border-0"
                    data-id="${item._id}"
                    data-slug="${item.slug}"
                    data-title="${item.title}"
                    data-price="${item.price}"
                    data-image="${item.image}">
                    <div class="product-image">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="product-overlay">
                            <div class="product-actions">
                                <button type="button" class="action-btn view-btn" title="Quick View"><i class="bi bi-eye"></i></button>

                                ${item.badge?.toLowerCase() === "discontinued"
                    ? `<button type="button" class="action-btn cart-btn disabled" title="Unavailable" disabled><i class="bi bi-ban"></i></button>`
                    : `<button type="button" class="action-btn cart-btn" title="Add to Cart"><i class="bi bi-cart-plus"></i></button>`}

                                <button type="button" class="action-btn wishlist-btn" title="Add to Wishlist"><i class="bi bi-heart"></i></button>
                            </div>
                        </div>
                        ${item.badge ? `<div class="product-badge">${item.badge}</div>` : ""}
                    </div>
                    <div class="productDetails">
                        <h4 class="product-title"><a href="productDetails.html?slug=${item.slug}">${item.title}</a></h4>
                        <div class="product-meta">
                            <div class="product-price">₹${item.price}</div>
                            <div class="product-rating"><i class="bi bi-star-fill"></i> ${item.rating || 0}</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join("");

            return `
            ${sectionTitle ? `<h5 class="mt-4 mb-3 text-uppercase text-secondary">${sectionTitle}</h5>` : ""}
            <div class="row">${cards}</div>
        `;
        };

        container.innerHTML = `
        ${renderSection(activeItems)}
        ${discontinuedItems.length ? `<hr class="my-4">` : ""}
        ${renderSection(discontinuedItems, "Discontinued Products")}
        `;

        attachActionEvents();
    }

    // ============================================================== 
    // 🔧 ACTION BUTTON HANDLERS
    // ============================================================== 
    function attachActionEvents() {
        document.querySelectorAll(".view-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const slug = this.closest(".product-card").dataset.slug;
                window.location.href = `productDetails.html?slug=${slug}`;
            });
        });

        // ✅ FIXED: unified Add to Cart
        document.querySelectorAll(".cart-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.closest(".product-card").dataset.id;
                const item =
                    (window.products?.find?.(p => p._id === id)) ||
                    (window.accessories?.find?.(a => a._id === id));
                if (!item) return;

                if (!item.refType) {
                    item.refType = window.accessories?.some?.(a => a._id === id)
                        ? "Accessory"
                        : "Product";
                }

                window.addToCart(item);
            });
        });

        // ✅ FIXED: unified Wishlist logic
        document.querySelectorAll(".wishlist-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const id = this.closest(".product-card").dataset.id;
                const item =
                    (window.products?.find?.(p => p._id === id)) ||
                    (window.accessories?.find?.(a => a._id === id));
                if (!item) return;

                if (!item.refType) {
                    item.refType = window.accessories?.some?.(a => a._id === id)
                        ? "Accessory"
                        : "Product";
                }

                window.addToWishlist(item);
            });
        });
    }

    // ============================================================== 
    // 🔍 SEARCH + SORT + SCROLL
    // ============================================================== 
    function performSearch() {
        const term = (searchInput?.value || '').toLowerCase();
        const filtered = products.filter(p =>
            p.title.toLowerCase().includes(term) ||
            (p.category || "").toLowerCase().includes(term)
        );
        renderItems(filtered, "product");
    }

    searchButton?.addEventListener('click', performSearch);
    searchInput?.addEventListener('keyup', e => { if (e.key === 'Enter') performSearch(); });
    searchInput?.addEventListener('input', performSearch);

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
        renderItems(sorted, "product");
    });

    window.addEventListener('scroll', function () {
        if (scrollTopButton)
            scrollTopButton.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });
    scrollTopButton?.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============================================================== 
    // 🟢 INITIAL LOAD 
    // ============================================================== 
    fetchProducts();

    // ============================================================== 
    // 🟣 ACCESSORY CATEGORY CLICK HANDLER 
    // ============================================================== 
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const category = e.currentTarget.getAttribute('data-category');
            fetchItems("accessory", "", category);
        });
    });
});
