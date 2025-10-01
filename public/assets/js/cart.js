document.addEventListener("DOMContentLoaded", async function () {
  const cartContainer = document.querySelector(".cart-items");
  const subtotalEl = document.querySelector(".summary-item .summary-value");
  const totalEl = document.querySelector(".summary-total .summary-value");

  let cart = [];

  // Fetch cart from server
  async function fetchCart() {
    try {
      const res = await fetch("/api/cart", { credentials: "include" });
      if (res.ok) {
        cart = (await res.json()).items || [];
      } else {
        alert("You must login to access your cart!");
        window.location.href = "login.html";
        return;
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }
  function renderCart() {
    cartContainer.innerHTML = `
      <div class="cart-header d-none d-lg-block">
        <div class="row align-items-center">
          <div class="col-lg-5"><h5>Product</h5></div>
          <div class="col-lg-2 text-center"><h5>Price</h5></div>
          <div class="col-lg-3 text-center"><h5>Quantity</h5></div>
          <div class="col-lg-2 text-center"><h5>Total</h5></div>
        </div>
      </div>
    `;

    if (cart.length === 0) {
      cartContainer.innerHTML += `<p class="text-center my-4">Your cart is empty.</p>`;
      subtotalEl.textContent = "$0.00";
      totalEl.textContent = "$0.00";
      return;
    }

    let subtotal = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      cartContainer.innerHTML += `
        <div class="cart-item">
          <div class="row align-items-center">
            <div class="col-lg-5 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
              <div class="product-info d-flex align-items-center">
                <div class="product-image">
                  <img src="${item.image}" alt="${item.title}" class="img-fluid" loading="lazy">
                </div>
                <div class="product-details">
                  <h6 class="product-title">${item.title}</h6>
                  <button class="remove-item" data-product-id="${item.product}" type="button">
                    <i class="bi bi-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
              <div class="price-tag">
                <span class="current-price">₹${item.price.toFixed(2)}</span>
              </div>
            </div>
            <div class="col-lg-3 col-12 mt-3 mt-lg-0 text-center">
              <div class="quantity-selector">
                <button class="quantity-btn decrease" data-product-id="${item.product}">
                  <i class="bi bi-dash"></i>
                </button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="10" data-product-id="${item.product}">
                <button class="quantity-btn increase" data-product-id="${item.product}">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>
            <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
              <div class="item-total">
                <span>₹${itemTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;

    // --- Shipping logic ---
    const shippingEl = document.querySelector(".summary-item.shipping-item");
    let shipping = 4.99; // default standard
    let freeShipping = false;

    if (subtotal >= 300) {
      shipping = 0;
      freeShipping = true;
    }

    shippingEl.innerHTML = `
        <span class="summary-label">Shipping</span>
        <span class="summary-value"></span>
        <div class="shipping-options">
            <div class="form-check text-end">
                <input class="form-check-input" type="radio" name="shipping" id="standard" ${!freeShipping ? "checked" : ""} ${freeShipping ? "disabled" : ""}>
                <label class="form-check-label" for="standard">Standard Delivery - $4.99</label>
            </div>
            <div class="form-check text-end">
                <input class="form-check-input" type="radio" name="shipping" id="express" ${!freeShipping ? "" : "disabled"}>
                <label class="form-check-label" for="express">Express Delivery - $12.99</label>
            </div>
            <div class="form-check text-end">
                <input class="form-check-input" type="radio" name="shipping" id="free" ${freeShipping ? "checked" : ""} disabled>
                <label class="form-check-label" for="free">Free Shipping (Orders over $300)</label>
            </div>
        </div>
    `;

    // --- Total calculation ---
    const tax = subtotal * 0.10;
    const total = subtotal + tax + shipping;
    totalEl.textContent = `₹${total.toFixed(2)}`;

    // --- Update shipping dynamically ---
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    shippingRadios.forEach(radio => {
      radio.addEventListener("change", () => {
        let newShipping = 0;
        if (radio.id === "standard") newShipping = 4.99;
        else if (radio.id === "express") newShipping = 12.99;
        else newShipping = 0; // free

        // shippingEl.querySelector(".summary-value").textContent = `₹${newShipping.toFixed(2)}`;
        totalEl.textContent = `₹${(subtotal + tax + newShipping).toFixed(2)}`;
      });
    });

  }


  async function updateCartItem(productId, quantity) {
    try {
      const res = await fetch(`/api/cart/${productId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity })
      });
      if (res.ok) {
        cart = (await res.json()).items;
        renderCart();
      }
    } catch (err) {
      console.error("Error updating cart item:", err);
    }
  }

  async function removeCartItem(productId) {
    try {
      const res = await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        cart = (await res.json()).items;
        renderCart();
        // Update header cart badge live
        if (window.updateCartBadge) {
          window.updateCartBadge(cart.length);
        }
      }
    } catch (err) {
      console.error("Error removing cart item:", err);
    }
  }

  // Handle quantity changes and removals
  cartContainer.addEventListener("click", function (e) {
    if (e.target.closest(".increase")) {
      const productId = e.target.closest(".increase").dataset.productId;
      const item = cart.find(i => i.product === productId);
      if (item) updateCartItem(productId, item.quantity + 1);
    }
    if (e.target.closest(".decrease")) {
      const productId = e.target.closest(".decrease").dataset.productId;
      const item = cart.find(i => i.product === productId);
      if (item && item.quantity > 1) updateCartItem(productId, item.quantity - 1);
    }
    if (e.target.closest(".remove-item")) {
      const productId = e.target.closest(".remove-item").dataset.productId;
      removeCartItem(productId);
    }
  });

  // Handle manual quantity input
  cartContainer.addEventListener("change", function (e) {
    if (e.target.classList.contains("quantity-input")) {
      const productId = e.target.dataset.productId;
      let value = parseInt(e.target.value);
      if (value < 1) value = 1;
      if (value > 10) value = 10;
      updateCartItem(productId, value);
    }
  });

  await fetchCart();
  renderCart();
});




document.addEventListener("DOMContentLoaded", async () => {
  const paymentIcons = document.querySelectorAll(".payment-icons i");
  const confirmBtn = document.getElementById("confirm-payment-btn");
  const paymentMessage = document.getElementById("payment-message");

  let selectedMethod = null;

  // --- Fetch existing payment methods ---
  async function checkPaymentMethod() {
    try {
      const res = await fetch("/api/payment-methods", { credentials: "include" });
      const methods = res.ok ? await res.json() : [];

      if (methods.length > 0) {
        paymentMessage.textContent = `You have ${methods.length} payment method(s) available. Select to proceed.`;
        confirmBtn.disabled = false;
      } else {
        paymentMessage.textContent = "No payment method found. Please select one.";
        confirmBtn.disabled = true;
      }
    } catch (err) {
      console.error(err);
      paymentMessage.textContent = "Error checking payment methods.";
      confirmBtn.disabled = true;
    }
  }

  // --- Handle icon selection ---
  paymentIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      // Highlight selected icon
      paymentIcons.forEach(i => i.classList.remove("selected"));
      icon.classList.add("selected");

      selectedMethod = icon.dataset.method;
      confirmBtn.disabled = false;
      paymentMessage.textContent = `Selected payment method: ${icon.title}`;
    });
  });

  // --- Confirm Payment Method ---
  confirmBtn.addEventListener("click", async () => {
    if (!selectedMethod) return alert("Select a payment method first.");

    try {
      const res = await fetch("/api/payment-methods", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: selectedMethod })
      });

      if (!res.ok) throw new Error("Failed to add payment method");

      alert("Payment method added successfully!");
      window.location.href = "/cart.html"; // redirect to cart for checkout
    } catch (err) {
      console.error(err);
      alert("Error adding payment method: " + err.message);
    }
  });

  await checkPaymentMethod();
});
