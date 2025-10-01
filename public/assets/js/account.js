document.addEventListener("DOMContentLoaded", async () => {
  try {
    // ----------------- 1. Profile -----------------
    const profileRes = await fetch("/api/users/profile", { credentials: "include" });
    if (!profileRes.ok) throw new Error("Not logged in");
    const profile = await profileRes.json();

    document.getElementById("accountUserName").textContent = `${profile.firstName} ${profile.lastName}` || "User";
    document.getElementById("accountUserStatus").textContent = profile.membership || "Member";
    document.getElementById("firstName").value = profile.firstName || "";
    document.getElementById("lastName").value = profile.lastName || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("phone").value = profile.phone || "";

    // Load all sections with individual error handling
    await loadOrders();
    await loadWishlist();
    await loadPaymentMethods();
    await loadReviews();

    // Setup event listeners
    setupEventListeners();

  } catch (err) {
    console.error("Error loading account data", err);
    window.location.replace("login.html");
  }

  // ---------- Section Loading Functions ----------
  async function loadOrders() {
    try {
      const ordersRes = await fetch("/api/orders/my", { credentials: "include" });
      if (!ordersRes.ok) throw new Error("Failed to fetch orders");
      const orders = await ordersRes.json();

      // const payRes = await fetch(`/api/payments/${orderId}`, { credentials: "include" });
      // const payment = await payRes.json();

      const ordersGrid = document.getElementById("ordersGrid");
      ordersGrid.innerHTML = "";
      document.getElementById("orderCount").textContent = orders.length;
      updateUserBadge(orders.length);
      if (orders.length === 0) {
        document.getElementById("ordersEmpty")?.classList.remove("d-none");
      } else {
        document.getElementById("ordersEmpty")?.classList.add("d-none");
      }

      orders.forEach((order) => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("order-card");
        orderCard.innerHTML = `
                <a href="order-details.html?orderId=${order._id}" class="order-link" style="text-decoration: none; color: inherit;">
                    <div class="order-header">
                        <div class="order-id"><span class="label">Order ID:</span> ${order._id}</div>
                        <div class="order-date">${new Date(order.createdAt).toLocaleString()}</div>
                    </div>
                    <div class="order-content">
                        <div class="product-grid">
                            ${(order.products || []).map((p) => `<img src="${p.image}" alt="${p.title}" loading="lazy">`).join("")}
                        </div>
                        <div class="order-info">
                            <div class="info-row"><span>Payment Type</span> <span class="status ${order.paymentMethod?.toLowerCase()}">${order.paymentMethod || '--'}</span></div>
                            <div class="info-row"><span>Order Status</span> <span class="status ${order.status?.toLowerCase()}">${order.status || '--'}</span></div>
                            <div class="info-row"><span>Items</span> ${order.items?.length || 0}</div>
                            <div class="info-row"><span>Total</span> <span class="price">₹${(order.total || 0).toFixed(2)}</span></div>
                        </div>
                    </div>
                  </a>
                `;
        ordersGrid.appendChild(orderCard);
      });
    } catch (error) {
      console.error("Error loading orders:", error);
      document.getElementById("ordersGrid").innerHTML = `<div class="error-message">Failed to load orders</div>`;
    }
  }

  async function loadWishlist() {
    try {
      const wishlistRes = await fetch("/api/wishlist", { credentials: "include" });
      if (!wishlistRes.ok) throw new Error("Failed to fetch wishlist");

      const wishlist = await wishlistRes.json();
      console.log("Wishlist data:", wishlist);
      const wishlistContainer = document.getElementById("wishlistContainer");
      const wishlistEmpty = document.getElementById("wishlistEmpty");
      wishlistContainer.innerHTML = "";
      document.getElementById("wishlistCountSidebar").textContent = wishlist.items.length;

      if (wishlist.items.length === 0) {
        wishlistEmpty.classList.remove("d-none");
      } else {
        wishlistEmpty.classList.add("d-none");
      }

      wishlist.items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("wishlist-item"); // add "wishlist-item" for consistency
        card.innerHTML = `
        <div class="wishlist-card">
            <div class="wishlist-image">
                <img src="${item.image}" alt="${item.title}">
                <button class="btn-remove" data-id="${item.product}"><i class="bi bi-trash"></i></button>
            </div>
            <div class="wishlist-content">
                <h4>${item.title}</h4>
                <div class="price">₹${item.price}</div>
                <button class="btn btn-sm btn-primary btn-add-cart">Add to Cart</button>
            </div>
        </div> `;

        wishlistContainer.appendChild(card);
        // Use global remove function
        card.querySelector(".btn-remove").addEventListener("click", (e) => {
          const id = e.currentTarget.dataset.id;
          window.removeFromWishlist(id, e.currentTarget); // pass clicked button for DOM removal
        });

        // Use global addToCart + then remove from wishlist
        card.querySelector(".btn-add-cart").addEventListener("click", async () => {
          const product = {
            _id: item.product,   // ✅ real productId, not wishlistId
            title: item.title,
            price: item.price,
            image: item.image
          };

          try {
            await window.addToCart(product, 1);

            // after adding to cart, also remove from wishlist globally
            window.removeFromWishlist(item.product, card.querySelector(".btn-add-cart"));
          } catch (err) {
            console.error("Add to cart from wishlist error:", err);
          }
        });
      });
    } catch (error) {
      console.error("Error loading wishlist:", error);
      document.getElementById("wishlistContainer").innerHTML = `<div class="error-message">Failed to load wishlist</div>`;
    }
  }

  async function loadPaymentMethods() {
    try {
      const paymentRes = await fetch("/api/wallet", { credentials: "include" });
      if (!paymentRes.ok) throw new Error("Failed to fetch payment methods");

      const paymentMethods = await paymentRes.json();
      const paymentContainer = document.getElementById("paymentMethodsContainer");
      const paymentEmpty = document.getElementById("paymentEmpty");
      paymentContainer.innerHTML = "";

      if (paymentMethods.length === 0) {
        paymentEmpty.classList.remove("d-none");
      } else {
        paymentEmpty.classList.add("d-none");
      }

      paymentMethods.forEach((method) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
                    <div class="payment-card">
                        <i class="bi bi-credit-card"></i>
                        <p>${method.type} - **** ${method.last4}</p>
                    </div>
                `;
        paymentContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading payment methods:", error);
      document.getElementById("paymentMethodsContainer").innerHTML = `<div class="error-message">Failed to load payment methods</div>`;
    }
  }

  async function loadReviews() {
    try {
      const reviewsRes = await fetch("/api/reviews/my", { credentials: "include" });
      if (!reviewsRes.ok) throw new Error("Failed to fetch reviews");

      const reviews = await reviewsRes.json();
      const reviewsContainer = document.getElementById("reviewsContainer");
      const reviewsEmpty = document.getElementById("reviewsEmpty");
      reviewsContainer.innerHTML = "";

      if (reviews.length === 0) {
        reviewsEmpty.classList.remove("d-none");
      } else {
        reviewsEmpty.classList.add("d-none");
      }

      reviews.forEach((rev) => {
        const card = document.createElement("div");
        card.classList.add("col-md-6");
        card.innerHTML = `
                    <div class="review-card">
                        <h4>${rev.productTitle}</h4>
                        <div class="stars">${"★".repeat(rev.rating)}${"☆".repeat(5 - (rev.rating || 0))}</div>
                        <p>${rev.comment}</p>
                    </div>
                `;
        reviewsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error loading reviews:", error);
      document.getElementById("reviewsContainer").innerHTML = `<div class="error-message">Failed to load reviews</div>`;
    }
  }
  // ---------- Event Listeners Setup ----------
  function setupEventListeners() {
    // Personal Info Form
    document.getElementById("personalInfoForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const body = {
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
        };

        const res = await fetch("/api/users/me", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          alert("Profile updated successfully!");
        } else {
          throw new Error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    });

    // Password Form
    document.getElementById("passwordForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const body = {
          currentPassword: document.getElementById("currentPassword").value,
          newPassword: document.getElementById("newPassword").value,
        };

        if (body.newPassword !== document.getElementById("confirmPassword").value) {
          alert("Passwords do not match!");
          return;
        }

        const res = await fetch("/api/users/change-password", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (res.ok) {
          alert("Password updated successfully!");
          document.getElementById("passwordForm").reset();
        } else {
          throw new Error("Failed to update password");
        }
      } catch (error) {
        console.error("Error updating password:", error);
        alert("Failed to update password. Please try again.");
      }
    });

    // Delete Account
    document.getElementById("btn-delete-account").addEventListener("click", async () => {
      if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

      try {
        const res = await fetch("/api/users/me", {
          method: "DELETE",
          credentials: "include"
        });

        if (res.ok) {
          alert("Account deleted successfully!");
          window.location.replace("index.html");
        } else {
          throw new Error("Failed to delete account");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("Failed to delete account. Please try again.");
      }
    });

    // Logout
    document.getElementById("accountLogout").addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include"
        });
        window.location.replace("index.html");
      } catch (error) {
        console.error("Error logging out:", error);
        alert("Failed to logout. Please try again.");
      }
    });
  }

  // ---------- Helper Functions ----------
  async function addToCart(productId) {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      if (res.ok) {
        alert("Added to cart successfully!");
      } else {
        throw new Error("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  }
});


function updateUserBadge(orderCount) {
  const badge = document.querySelector(".status-badge");
  const userStatus = document.getElementById("accountUserStatus");
  const statusIcon = document.querySelector(".user-status i"); // <i> inside user-status

  if (!badge || !userStatus || !statusIcon) return;

  let icon = "";
  let title = "";
  let color = "";

  if (orderCount >= 10) {
    icon = "bi bi-award";     // 🏆
    title = "Elite Member";
    color = "#d4af37";        // Premium gold
  } else if (orderCount >= 5) {
    icon = "bi bi-star-fill"; // ⭐
    title = "Gold Member";
    color = "#ffcc00";        // Bright yellow
  } else if (orderCount >= 2) {
    icon = "bi bi-shield-check"; // 🛡️
    title = "Verified Member";
    color = "#4cafef";           // Blue
  } else {
    badge.style.display = "none";
    statusIcon.className = "bi bi-person"; // fallback icon
    userStatus.textContent = "Member";
    userStatus.style.color = "";
    return;
  }

  // Update avatar badge
  badge.innerHTML = `<i class="${icon}"></i>`;
  badge.style.display = "inline-flex";
  badge.style.color = color;
  badge.setAttribute("title", title);

  // Update status section (icon + text)
  statusIcon.className = icon;
  statusIcon.style.color = color;
  userStatus.textContent = title;
  userStatus.style.color = color;
}

