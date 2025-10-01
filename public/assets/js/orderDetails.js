document.addEventListener("DOMContentLoaded", async () => {

  const queryParams = new URLSearchParams(window.location.search);
  const orderId = queryParams.get("orderId");

  if (!orderId) {
    alert("Order ID not found");
    return;
  }

  // ---------------- Load user ----------------
  let profile = {};
  try {
    const res = await fetch("/api/users/profile", { credentials: "include" });
    if (!res.ok) throw new Error("Login required");
    profile = await res.json();
  } catch (err) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch(`/api/orders/${orderId}`, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to fetch order details");
    const order = await res.json();

    // ================== ORDER SUMMARY   ===================
    document.querySelector("[data-order-id]").textContent = `Order #${order.orderNumber || order._id}`;
    document.querySelector("[data-order-date]").textContent = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";
    document.querySelector("[data-subtotal]").textContent = `₹${(order.subtotal || order.total || 0).toFixed(2)}`;
    document.querySelector("[data-shipping]").textContent = `₹${order.shippingCost?.toFixed(2) || 0}`;
    document.querySelector("[data-tax]").textContent = `₹${order.tax?.toFixed(2) || 0}`;
    document.querySelector("[data-total]").textContent = `₹${(order.total || 0).toFixed(2)}`;
    document.querySelector("[data-estimate]").textContent = `Estimated delivery: ${order.estimatedDelivery || "N/A"}`;
    document.querySelector("[data-shipping-method]").textContent = order.shippingMethod || "N/A";

    const shipping = order.shippingAddress || {};
    document.querySelector("[data-shipping-address]").innerHTML = ` 
      ${shipping.name || ""}<br>
      ${shipping.street || ""}<br>
      ${shipping.city || ""}, ${shipping.state || ""} ${shipping.pincode || ""}<br>
      ${shipping.country || ""}
    `;
    document.querySelector("[data-email]").textContent = shipping.email || "N/A";
    document.querySelector("[data-phone]").textContent = shipping.phone || "N/A";
    document.querySelector("[data-billing-address]").textContent = order.billingAddress || "Same as shipping address";

    // ================== PAYMENT DETAILS ====================
    const paymentTypeEl = document.querySelector("[data-card-type]");
    const paymentNumberEl = document.querySelector("[data-card-number]");
    const txnIdEl = document.querySelector("[data-txn-id]");
    const paymentIconEl = document.querySelector(".payment-icon i");

    if (order.paymentMethod === "COD") {
      // No Payment entry in DB
      paymentTypeEl.textContent = "Cash on Delivery";
      paymentNumberEl.textContent = `Status: ${order.paymentStatus || "Pending"}`;
      txnIdEl.textContent = "";
      paymentIconEl.className = "bi bi-cash";
    } else if (order.paymentMethod === "PayU") {
      // Fetch payment entry from API
      try {
        const payRes = await fetch(`/api/payments/${orderId}`, { credentials: "include" });
        const payment = await payRes.json();
        console.log(payment);
        if (payRes.ok && payment) {
          paymentTypeEl.textContent = "PayU Payment";
          paymentNumberEl.innerHTML = `
            <strong>Payment Status:</strong> ${payment.status}<br>
            <strong>Payment Mode:</strong> ${payment.mode || "N/A"}<br>
            <strong>Amount:</strong> ₹${payment.amount.toFixed(2)}<br>
            <strong>Bank Ref:</strong> ${payment.bank_ref_num || "N/A"}
          `;
          paymentIconEl.className = payment.mode === "UPI" ? "bi bi-upi" : "bi bi-credit-card-2-front";
        } else {
          paymentTypeEl.textContent = "PayU Payment";
          paymentNumberEl.textContent = "Payment details not found";
          txnIdEl.textContent = "";
          paymentIconEl.className = "bi bi-credit-card-2-front";
        }
      } catch (err) {
        console.error("Failed to fetch payment details", err);
      }
    } else {
      // Fallback
      paymentTypeEl.textContent = order.paymentMethod || "N/A";
      paymentNumberEl.textContent = "N/A";
      txnIdEl.textContent = "";
      paymentIconEl.className = "bi bi-credit-card-2-front";
    }

    // ================== ORDER ITEMS ===================
    const itemsContainer = document.querySelector(".order-items-container");
    itemsContainer.innerHTML = "";
    order.items.forEach(item => {
      itemsContainer.innerHTML += `
        <div class="item">
          <div class="item-image">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="item-details">
            <h4>${item.title}</h4>
            <div class="item-meta">${item.color ? `Color: ${item.color}` : ""} ${item.size ? ` | Size: ${item.size}` : ""}</div>
            <div class="item-price">
              <span class="quantity">${item.quantity} ×</span>
              <span class="price">₹${item.price.toFixed(2)}</span>
            </div>
          </div>
        </div>
      `;
    });

    // ================== RECOMMENDED PRODUCTS ==================
    const recommendedContainer = document.querySelector("[data-recommended-products]");
    recommendedContainer.innerHTML = "";
    if (order.recommendedProducts?.length) {
      order.recommendedProducts.forEach(prod => {
        recommendedContainer.innerHTML += `
          <div class="col-6 col-md-4">
            <div class="product-card">
              <div class="product-image">
                <img src="${prod.image}" alt="${prod.title}" loading="lazy">
              </div>
              <h5>${prod.title}</h5>
              <div class="product-price">₹${prod.price.toFixed(2)}</div>
              <a href="/product/${prod._id}" class="btn btn-add-cart">
                <i class="bi bi-plus"></i>
                Add to Cart
              </a>
            </div>
          </div>
        `;
      });
    }

  } catch (err) {
    console.error(err);
    alert("Failed to load order details. Please try again.");
  }
});
