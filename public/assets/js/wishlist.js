document.addEventListener("DOMContentLoaded", async () => {
  const wishlistContainer = document.querySelector("#wishlist .wishlist-items");

  try {
    // Fetch wishlist from backend
    const res = await fetch("/api/wishlist", { credentials: "include" });
    if (res.status === 401) {
      alert("Please login to view your wishlist");
      window.location.href = "login.html";
      return;
    }

    if (!res.ok) throw new Error("Failed to fetch wishlist");

    const wishlist = await res.json();

    // Header section
    wishlistContainer.innerHTML = `
      <div class="wishlist-header d-none d-lg-block">
        <div class="row align-items-center">
          <div class="col-lg-6"><h5>Product</h5></div>
          <div class="col-lg-2 text-center"><h5>Price</h5></div>
          <div class="col-lg-2 text-center"><h5>Stock Status</h5></div>
          <div class="col-lg-2 text-center"><h5>Action</h5></div>
        </div>
      </div>
    `;

    if (!wishlist.items || wishlist.items.length === 0) {
      wishlistContainer.innerHTML += `
        <p class="text-center mt-4">Your wishlist is empty.</p>
      `;
      return;
    }

    // Render wishlist items
    wishlist.items.forEach((item) => {
      wishlistContainer.innerHTML += `
        <div class="wishlist-item">
          <div class="row align-items-center">
            <div class="col-lg-6 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
              <div class="product-info d-flex align-items-center">
                <div class="product-image w-50">
                  <img src="${item.image}" alt="${item.title}" class="img-fluid" loading="lazy">
                </div>
                <div class="product-details">
                  <h6 class="product-title">${item.title}</h6>
                  <div class="product-meta">
                    <span class="product-color">Color: -</span>
                    <span class="product-size">Size: -</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
              <div class="price-tag">
                <span class="current-price">₹${item.price.toFixed(2)}</span>
              </div>
            </div>
            <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
              <div class="stock-status">
                <span class="badge bg-success">In Stock</span>
              </div>
            </div>
            <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
              <div class="action-buttons">
                <button type="button" class="btn btn-accent btn-sm w-100 mb-2 add-to-cart" data-id="${item.product}">
                  <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
                <button type="button" class="btn btn-outline-remove btn-sm w-100 remove-item" data-id="${item.product}">
                  <i class="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    wishlistContainer.addEventListener("click", async (e) => {
      // --- Remove item ---
      const removeBtn = e.target.closest(".remove-item");
      if (removeBtn) {
        e.stopPropagation();
        const productId = removeBtn.dataset.id;
        window.removeFromWishlist(productId, removeBtn);
        return;
      }

      // --- Add to cart ---
      const addCartBtn = e.target.closest(".add-to-cart");
      if (addCartBtn) {
        e.stopPropagation();
        const productId = addCartBtn.dataset.id;
        if (!productId) return;

        try {
          // Add to cart
          await window.addToCart({ _id: productId }, 1);

          // Then remove from wishlist using the same global fn
          window.removeFromWishlist(productId, addCartBtn);
        } catch (err) {
          console.error("Add to cart from wishlist error:", err);
        }
      }
    });

  } catch (err) {
    console.error("Error loading wishlist:", err);
    wishlistContainer.innerHTML = `<p class="text-center text-danger">Failed to load wishlist</p>`;
  }
});
