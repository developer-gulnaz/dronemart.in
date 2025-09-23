document.addEventListener("DOMContentLoaded", async () => {
  const wishlistContainer = document.querySelector("#wishlist .wishlist-items");

  try {
    // 🔹 check login status
    const authRes = await fetch("/api/auth/check", { credentials: "include" });
    if (authRes.status === 401) {
      window.location.href = "/login.html"; // redirect if not logged in
      return;
    }

    // Fetch wishlist from backend
    const res = await fetch("/api/wishlist", { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch wishlist");
    const wishlist = await res.json();

    // Clear any existing hardcoded items
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

    // Loop through wishlist items
    wishlist.items.forEach((item) => {
      const productHTML = `
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
                <span class="current-price">$${item.price.toFixed(2)}</span>
              </div>
            </div>
            <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
              <div class="stock-status">
                <span class="badge bg-success">In Stock</span>
              </div>
            </div>
            <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
              <div class="action-buttons">
                <button class="btn btn-accent btn-sm w-100 mb-2 add-to-cart" data-id="${item.product}">
                  <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
                <button class="btn btn-outline-remove btn-sm w-100 remove-item" data-id="${item.product}">
                  <i class="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      wishlistContainer.innerHTML += productHTML;
    });

    // Attach event listeners (remove item / add to cart)
    wishlistContainer.addEventListener("click", async (e) => {
      if (e.target.closest(".remove-item")) {
        const productId = e.target.closest(".remove-item").dataset.id;
        const delRes = await fetch(`/api/wishlist/${productId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (delRes.ok) {
          e.target.closest(".wishlist-item").remove();
        }
      }

      if (e.target.closest(".add-to-cart")) {
        const productId = e.target.closest(".add-to-cart").dataset.id;
        console.log("Add to cart clicked for product:", productId);
        // 👉 Call your Cart API here
      }
    });
  } catch (err) {
    console.error("Error loading wishlist:", err);
    wishlistContainer.innerHTML = `<p class="text-center text-danger">Failed to load wishlist</p>`;
  }
});
