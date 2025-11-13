document.addEventListener("DOMContentLoaded", async () => {
  // ==========================================================
  // 1️⃣ INITIALIZATION
  // ==========================================================
  try {
    const profileRes = await fetch("/api/users/profile", { credentials: "include" });
    if (!profileRes.ok) throw new Error("Not logged in");

    const profile = await profileRes.json();
    populateProfile(profile);

    // Load dynamic sections
    await Promise.all([
      loadOrders(),
      loadWishlist(),
      loadPaymentMethods(),
      loadReviews(),
    ]);

    setupEventListeners();
  } catch (err) {
    console.error("Error loading account data:", err);
    window.location.replace("login.html");
  }

  // ==========================================================
  // 2️⃣ PROFILE POPULATION
  // ==========================================================
  function populateProfile(profile) {
    document.getElementById("accountUserName").textContent =
      `${profile.firstName} ${profile.lastName}` || "User";
    document.getElementById("accountUserStatus").textContent =
      profile.membership || "Member";
    document.getElementById("firstName").value = profile.firstName || "";
    document.getElementById("lastName").value = profile.lastName || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("mobile").value = profile.mobile || "";
  }

  // ==========================================================
  // 3️⃣ DATA LOADERS
  // ==========================================================
  async function loadOrders() {
    try {
      const res = await fetch("/api/orders/my", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");

      const orders = await res.json();
      const ordersGrid = document.getElementById("ordersGrid");
      const ordersEmpty = document.getElementById("ordersEmpty");

      ordersGrid.innerHTML = "";
      document.getElementById("orderCount").textContent = orders.length;
      updateUserBadge(orders.length);

      ordersEmpty?.classList.toggle("d-none", orders.length > 0);

      orders.forEach((order) => {
        const orderCard = document.createElement("div");
        orderCard.classList.add("order-card");
        orderCard.innerHTML = `
          <a href="orderDetails.html?orderId=${order._id}" class="order-link" style="text-decoration:none; color:inherit;">
            <div class="order-header">
              <div class="order-id"><span class="label">Order ID:</span> ${order._id}</div>
              <div class="order-date">${new Date(order.createdAt).toLocaleString()}</div>
            </div>
            <div class="order-content">
              <div class="product-grid">
                ${(order.products || [])
            .map((p) => `<img src="${p.image}" alt="${p.title}" loading="lazy">`)
            .join("")}
              </div>
              <div class="order-info">
                <div class="info-row"><span>Payment Type</span> <span class="status ${order.paymentMethod?.toLowerCase()}">${order.paymentMethod || "--"}</span></div>
                <div class="info-row"><span>Order Status</span> <span class="status ${order.status?.toLowerCase()}">${order.status || "--"}</span></div>
                <div class="info-row"><span>Items</span> ${order.items?.length || 0}</div>
                <div class="info-row"><span>Total</span> <span class="price">₹${(order.total || 0).toFixed(2)}</span></div>
              </div>
            </div>
          </a>`;
        ordersGrid.appendChild(orderCard);
      });
    } catch (err) {
      console.error("Error loading orders:", err);
      document.getElementById("ordersGrid").innerHTML = `<div class="error-message">Failed to load orders</div>`;
    }
  }

  async function loadWishlist() {
    try {
      const res = await fetch("/api/wishlist", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch wishlist");

      const wishlist = await res.json();
      const container = document.getElementById("wishlistContainer");
      const empty = document.getElementById("wishlistEmpty");
      const count = document.getElementById("wishlistCountSidebar");

      container.innerHTML = "";
      count.textContent = wishlist.items.length;
      empty.classList.toggle("d-none", wishlist.items.length > 0);

      wishlist.items.forEach((item) => {
        const card = document.createElement("div");
        card.classList.add("wishlist-item");
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
          </div>`;

        container.appendChild(card);

        card.querySelector(".btn-remove").addEventListener("click", (e) => {
          window.removeFromWishlist(item.product, e.currentTarget);
        });

        card.querySelector(".btn-add-cart").addEventListener("click", async () => {
          try {
            await window.addToCart(
              { _id: item.product, title: item.title, price: item.price, image: item.image },
              1
            );
            window.removeFromWishlist(item.product, card.querySelector(".btn-add-cart"));
          } catch (err) {
            console.error("Add to cart from wishlist error:", err);
          }
        });
      });
    } catch (err) {
      console.error("Error loading wishlist:", err);
      document.getElementById("wishlistContainer").innerHTML = `<div class="error-message">Failed to load wishlist</div>`;
    }
  }

  async function loadPaymentMethods() {
    try {
      const res = await fetch("/api/wallet", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch payment methods");

      const methods = await res.json();
      const container = document.getElementById("paymentMethodsContainer");
      const empty = document.getElementById("paymentEmpty");

      container.innerHTML = "";
      empty.classList.toggle("d-none", methods.length > 0);

      methods.forEach((m) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4");
        card.innerHTML = `
          <div class="payment-card">
            <i class="bi bi-credit-card"></i>
            <p>${m.type} - **** ${m.last4}</p>
          </div>`;
        container.appendChild(card);
      });
    } catch (err) {
      console.error("Error loading payment methods:", err);
      document.getElementById("paymentMethodsContainer").innerHTML = `<div class="error-message">Failed to load payment methods</div>`;
    }
  }

  async function loadReviews() {
    try {
      const res = await fetch("/api/reviews/my", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch reviews");

      const reviews = await res.json();
      const container = document.getElementById("reviewsContainer");
      const empty = document.getElementById("reviewsEmpty");

      container.innerHTML = "";
      empty.classList.toggle("d-none", reviews.length > 0);

      reviews.forEach((rev) => {
        const card = document.createElement("div");
        card.classList.add("col-md-6");
        card.innerHTML = `
          <div class="review-card">
            <h4>${rev.productTitle}</h4>
            <div class="stars">${"★".repeat(rev.rating)}${"☆".repeat(5 - (rev.rating || 0))}</div>
            <p>${rev.comment}</p>
          </div>`;
        container.appendChild(card);
      });
    } catch (err) {
      console.error("Error loading reviews:", err);
      document.getElementById("reviewsContainer").innerHTML = `<div class="error-message">Failed to load reviews</div>`;
    }
  }

  // ==========================================================
  // 4️⃣ EVENT HANDLERS
  // ==========================================================
  function setupEventListeners() {
    setupProfileForm();
    setupPasswordForm();
    setupAccountActions();
  }

  // ---------- Profile Update ----------
  function setupProfileForm() {
    document.getElementById("personalInfoForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const body = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          mobile: mobile.value,
        };

        const res = await fetch("/api/users/me", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.ok) {
          window.showMessageDialog("Profile updated successfully!", "success");
        }
      } catch (err) {
        console.error("Error updating profile:", err);
        window.showMessageDialog("Failed to update profile. Please try again.", "error");

      }
    });
  }

  // ---------- Password Update ----------
  function setupPasswordForm() {
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const updateBtn = document.getElementById("updateBtn");
    const passwordMessage = document.getElementById("passwordMessage");
    const statusMsg = document.getElementById("statusMsg");

    function validateForm() {
      const currentVal = currentPassword.value.trim();
      const newVal = newPassword.value.trim();
      const confirmVal = confirmPassword.value.trim();

      passwordMessage.textContent = "";
      newPassword.classList.remove("is-valid", "is-invalid");
      confirmPassword.classList.remove("is-valid", "is-invalid");
      updateBtn.disabled = true;

      if (!currentVal || !newVal || !confirmVal) return;

      if (newVal.length < 8) {
        passwordMessage.textContent = "Password must be at least 8 characters.";
        passwordMessage.style.color = "red";
        newPassword.classList.add("is-invalid");
        return;
      }

      if (newVal !== confirmVal) {
        passwordMessage.textContent = "Passwords do not match.";
        passwordMessage.style.color = "red";
        newPassword.classList.add("is-invalid");
        confirmPassword.classList.add("is-invalid");
        return;
      }

      passwordMessage.textContent = "Passwords match ✔";
      passwordMessage.style.color = "green";
      newPassword.classList.add("is-valid");
      confirmPassword.classList.add("is-valid");
      updateBtn.disabled = false;
    }

    [currentPassword, newPassword, confirmPassword].forEach((el) =>
      el.addEventListener("input", validateForm)
    );

    document.getElementById("passwordForm").addEventListener("submit", async (e) => {
      e.preventDefault();
      statusMsg.textContent = "Updating...";
      statusMsg.style.color = "gray";

      try {
        const res = await fetch("/api/users/change-password", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          window.showMessageDialog("Password updated successfully!", "success");
          statusMsg.textContent = "";
          document.getElementById("passwordForm").reset();
          updateBtn.disabled = true;
          newPassword.classList.remove("is-valid");
          confirmPassword.classList.remove("is-valid");
          passwordMessage.textContent = "";
        } else {
          statusMsg.textContent = data.message || "Failed to update password.";
          statusMsg.style.color = "red";
        }
      } catch (err) {
        console.error("Error updating password:", err);
        statusMsg.textContent = "An error occurred. Please try again.";
        statusMsg.style.color = "red";
      }
    });
  }

  // ---------- Account Actions ----------
  function setupAccountActions() {
    document.getElementById("btn-delete-account").addEventListener("click", async () => {
      if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;

      try {
        const res = await fetch("/api/users/me", {
          method: "DELETE",
          credentials: "include",
        });

        if (res.ok) {
          window.location.replace("/index.html");
        } else {
          console.error("Failed to delete account");
        }
      } catch (err) {
        console.error("Error deleting account:", err);
      }
    });


    document.getElementById("accountLogout").addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
        window.location.replace("index.html");
      } catch (err) {
        console.error("Error logging out:", err);
        alert("Failed to logout. Please try again.");
      }
    });
  }

  // ==========================================================
  // 5️⃣ UTILITIES
  // ==========================================================
  function updateUserBadge(orderCount) {
    const badge = document.querySelector(".status-badge");
    const userStatus = document.getElementById("accountUserStatus");
    const statusIcon = document.querySelector(".user-status i");

    if (!badge || !userStatus || !statusIcon) return;

    let icon = "", title = "", color = "";

    if (orderCount >= 10) {
      icon = "bi bi-award";
      title = "Elite Member";
      color = "#d4af37";
    } else if (orderCount >= 5) {
      icon = "bi bi-star-fill";
      title = "Gold Member";
      color = "#ffcc00";
    } else if (orderCount >= 2) {
      icon = "bi bi-shield-check";
      title = "Verified Member";
      color = "#4cafef";
    } else {
      badge.style.display = "none";
      statusIcon.className = "bi bi-person";
      userStatus.textContent = "Member";
      userStatus.style.color = "";
      return;
    }

    badge.innerHTML = `<i class="${icon}"></i>`;
    badge.style.display = "inline-flex";
    badge.style.color = color;
    badge.setAttribute("title", title);

    statusIcon.className = icon;
    statusIcon.style.color = color;
    userStatus.textContent = title;
    userStatus.style.color = color;
  }
});
