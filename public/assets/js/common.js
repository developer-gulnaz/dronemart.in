document.addEventListener("DOMContentLoaded", () => {
    const headerActions = document.getElementById("header-actions");

    async function renderHeader() {
        let user = null;

        try {
            // Fetch logged-in user from server (session-based)
            const res = await fetch("/api/users/profile", {
                method: "GET",
                credentials: "include", // important: send session cookie
            });

            if (res.ok) {
                user = await res.json();
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        }

        headerActions.innerHTML = `
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

        renderCartWishlist();
    }

    async function renderCartWishlist() {
        let cartCount = 0;
        let wishlistCount = 0;

        try {
            const cartRes = await fetch("/api/cart", { credentials: "include" });
            if (cartRes.ok) {
                const cart = await cartRes.json();
                cartCount = cart.items.length || 0;
            }

            const wishlistRes = await fetch("/api/wishlist", { credentials: "include" });
            if (wishlistRes.ok) {
                const wishlist = await wishlistRes.json();
                wishlistCount = wishlist.items.length || 0;
            }
        } catch (err) {
            console.error("Error fetching cart/wishlist:", err);
        }

        headerActions.innerHTML += `
        <a href="wishlist.html" class="header-action-btn me-2">
            <i class="bi bi-heart"></i>
            <span class="badge" id="wishlistBadge">${wishlistCount}</span>
        </a>
        <a href="cart.html" class="header-action-btn">
            <i class="bi bi-cart3"></i>
            <span class="badge" id="cartBadge">${cartCount}</span>
        </a>`;
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
    };

    renderHeader();
});
