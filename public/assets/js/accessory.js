document.addEventListener('DOMContentLoaded', async function () {
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
            params.append("brand", "dji");
            if (query) params.append("q", query);
            if (category) params.append("productCategory", category);

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
          <h5 class="mb-1">${a.title}</h5>
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
                modalPrice.textContent = `₹${acc.price}`;
                modalDescription.textContent = acc.description || "No description available.";

                // === Image Slider (Thumbnails + Main Image) ===
                const images = acc.images?.length ? acc.images : [acc.image];
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

                // Specs
                modalSpecs.innerHTML = acc.specs
                    ? `<ul>${Object.entries(acc.specs)
                        .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
                        .join('')}</ul>`
                    : "";

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
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const category = this.dataset.category;
            fetchAccessories("", category);
            categoryLinks.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

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
