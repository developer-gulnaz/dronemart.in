document.addEventListener("DOMContentLoaded", () => {
    const headerActions = document.getElementById("header-actions");

    async function renderHeader() {
        let user = null;

        try {
            const res = await fetch("/api/users/profile", {
                method: "GET",
                credentials: "include",
            });
            if (res.ok) user = await res.json();
        } catch (err) {
            console.error("Error fetching profile:", err);
        }

        // Clear previous content first
        headerActions.innerHTML = '';

        // Add account dropdown
        const accountHTML = `
        <div class="dropdown account-dropdown">
            <button class="header-action-btn" data-bs-toggle="dropdown">
                <i class="bi bi-person"></i>
            </button>
            <div class="dropdown-menu">
                ${user ? `
                <div class="dropdown-header">
                    <h6>Welcome, ${user.firstName}</h6>
                    <p class="mb-0">Access account & manage orders</p>
                </div>
                <div class="dropdown-body">
                    <a class="dropdown-item d-flex align-items-center" href="account.html">
                        <i class="bi bi-person-circle me-2"></i> My Profile
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="account.html">
                        <i class="bi bi-bag-check me-2"></i> My Orders
                    </a>
                    <a class="dropdown-item d-flex align-items-center" href="wishlist.html">
                        <i class="bi bi-heart me-2"></i> My Wishlist
                    </a>
                </div>
                <div class="dropdown-footer">
                    <button id="logoutBtn" class="btn btn-outline-danger w-100">Logout</button>
                </div>
                ` : `
                <div class="dropdown-footer">
                    <a href="login.html" class="btn btn-primary w-100 mb-2">Sign In</a>
                    <a href="register.html" class="btn btn-outline-primary w-100">Register</a>
                </div>
                `}
            </div>
        </div>`;

        headerActions.innerHTML = accountHTML;

        // Now render cart/wishlist badges
        await renderCartWishlist();
    }


    async function renderCartWishlist() {
        let cartCount = 0;
        let wishlistCount = 0;

        try {
            const [cartRes, wishlistRes] = await Promise.all([
                fetch("/api/cart", { credentials: "include" }),
                fetch("/api/wishlist", { credentials: "include" })
            ]);

            if (cartRes.ok) {
                const cart = await cartRes.json();
                cartCount = cart.items.length || 0;
            }

            if (wishlistRes.ok) {
                const wishlist = await wishlistRes.json();
                wishlistCount = wishlist.items.length || 0;
            }
        } catch (err) {
            console.error("Error fetching cart/wishlist:", err);
        }

        // Always replace the badges, don't append
        const existingCartBadge = document.getElementById("cartBadge");
        const existingWishlistBadge = document.getElementById("wishlistBadge");
        const repairButton = document.getElementById("btn-repair");

        if (existingWishlistBadge) {
            existingWishlistBadge.textContent = wishlistCount;
        } else {
            headerActions.innerHTML += `
        <a href="wishlist.html" class="header-action-btn me-2">
            <i class="bi bi-heart"></i>
            <span class="badge" id="wishlistBadge">${wishlistCount}</span>
        </a>`;
        }

        if (existingCartBadge) {
            existingCartBadge.textContent = cartCount;
        } else {
            headerActions.innerHTML += `
        <a href="cart.html" class="header-action-btn">
            <i class="bi bi-cart3"></i>
            <span class="badge" id="cartBadge">${cartCount}</span>
        </a>`;
        }
        // Add Repair button after the cart
        if (!repairButton) {
            headerActions.innerHTML += `
        <span class="btn-repair"><a href="repair.html">Repair</a></span>
        <i class="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>`;

            const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
            if (mobileNavToggleBtn) {
                mobileNavToggleBtn.addEventListener('click', () => {
                    document.body.classList.toggle('mobile-nav-active');
                    mobileNavToggleBtn.classList.toggle('bi-list');
                    mobileNavToggleBtn.classList.toggle('bi-x');
                });
            }
        }

    }

    // Logout handler
    headerActions.addEventListener("click", async (e) => {
        if (e.target && e.target.id === "logoutBtn") {
            try {
                await fetch("/api/users/logout", {
                    method: "POST",
                    credentials: "include"
                });
            } catch (err) {
                console.error("Logout API error:", err);
            }

            window.location.replace("/"); // redirect to homepage
        }
    });

    // Badge update functions
    window.updateCartBadge = (count) => {
        const cartBadge = document.getElementById("cartBadge");
        if (cartBadge) cartBadge.textContent = count;
    };

    window.updateWishlistBadge = (count) => {
        const wishlistBadge = document.getElementById("wishlistBadge");
        if (wishlistBadge) wishlistBadge.textContent = count;
        // Sidebar badge
        const wishlistSidebarBadge = document.getElementById("wishlistCountSidebar");
        if (wishlistSidebarBadge) wishlistSidebarBadge.textContent = count;
    };


    renderHeader();
});


// 🌍 Global: remove item from wishlist
window.removeFromWishlist = async function (productId, triggerEl = null) {
    if (!productId) return;

    try {
        const delRes = await fetch(`/api/wishlist/${productId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (delRes.ok) {
            // Remove from DOM if trigger element is given
            if (triggerEl) {
                triggerEl.closest(".wishlist-item")?.remove();
            }

            // Update wishlist badge
            const res = await fetch("/api/wishlist", { credentials: "include" });
            if (res.ok) {
                const wishlist = await res.json();
                window.updateWishlistBadge(wishlist.items.length || 0);
            }
        } else {
            const errData = await delRes.json();
            alert(errData.message || "Failed to remove item from wishlist");
        }
    } catch (err) {
        console.error("Wishlist remove error:", err);
        alert("Something went wrong. Please try again.");
    }
};

