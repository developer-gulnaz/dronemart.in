document.addEventListener("DOMContentLoaded", async () => {
    const placeOrderBtn = document.querySelector(".place-order-btn");
    const orderError = document.getElementById("order-error");

    // Payment toggle
    const paymentOptions = document.querySelectorAll(".payment-option input[name='payment-method']");
    const payuDetails = document.getElementById("payment-payu");
    const codDetails = document.getElementById("payment-cod");
    const bankDetails = document.getElementById("payment-bank");
    let selectedPayment = "bank"; // default checked option

    paymentOptions.forEach(option => {
        option.addEventListener("change", e => {
            selectedPayment = e.target.value;

            // Hide all payment info sections
            payuDetails.classList.add("d-none");
            codDetails.classList.add("d-none");
            bankDetails.classList.add("d-none");

            // Show the selected one
            if (selectedPayment === "payu") payuDetails.classList.remove("d-none");
            if (selectedPayment === "cod") codDetails.classList.remove("d-none");
            if (selectedPayment === "bank") bankDetails.classList.remove("d-none");

            // Change button text accordingly
            placeOrderBtn.textContent =
                selectedPayment === "cod"
                    ? "Place Your Order (Pay Later)"
                    : selectedPayment === "bank"
                        ? "Confirm Order (Bank Transfer)"
                        : "Make Payment & Confirm Order";

            renderCart(cart); // re-render totals
        });
    });

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

    document.getElementById("first-name").value = profile.firstName || "";
    document.getElementById("phone").value = profile.mobile || "";
    document.getElementById("address").value = profile.street || "";
    document.getElementById("apartment").value = profile.apartment || "";
    document.getElementById("city").value = profile.city || "";
    document.getElementById("state").value = profile.state || "";
    document.getElementById("pincode").value = profile.pincode || "";

    // ---------------- Load cart ----------------
    const isBuyNow = new URLSearchParams(window.location.search).get("buyNow") === "true";
    let cart = [];

    try {
        let res;
        if (isBuyNow) {
            res = await fetch("/api/checkout", { credentials: "include" });
        } else {
            res = await fetch("/api/cart", { credentials: "include" });
        }
        if (!res.ok) throw new Error("Cart fetch failed");
        const data = await res.json();
        cart = data.items || [];

        if (!cart.length) throw new Error("No items to checkout");
    } catch (err) {
        alert(err.message);
        return;
    }

    // ---------------- Render Order Summary ----------------
    const summary = document.querySelector(".order-items");
    const totals = document.querySelector(".order-totals");
    const itemCount = document.querySelector(".item-count");

    function renderCart(cart) {
        summary.innerHTML = "";
        let subtotal = 0;
        let totalItems = 0;

        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;

            summary.innerHTML += `
                <div class="order-item d-flex align-items-center mb-2">
                    <div class="order-item-image me-3" style="width:60px;height:60px;">
                        <img src="${item.image}" alt="${item.title}" class="img-fluid rounded" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div class="order-item-details">
                        <h5 class="mb-1">${item.title}</h5>
                        <div class="order-item-price text-muted small">
                            <span>${item.quantity} × ₹${item.price}</span>
                        </div>
                    </div>
                </div>`;
        });

        // ---------------- Payment-based Charges ----------------
        let otherLabel = "";
        let finalAmount = 0;
        let total = subtotal;
        let advance = 0;
        let remaining = 0;
        let payLaterCharge = 0;

        if (selectedPayment === "payu") {
            // 💳 PayU (2% fee)
            otherLabel = "Payment Gateway Fee (2%)";
            finalAmount = subtotal * 0.02;
            total += finalAmount;

        } else if (selectedPayment === "cod") {
            // 🚚 COD (Cash on Delivery)
            const advancePerItem = 3000;
            const payLaterChargeRate = 0.02; // 2%

            // Calculate
            advance = advancePerItem * totalItems;
            payLaterCharge = subtotal * payLaterChargeRate;

            // Only advance now
            finalAmount = advance;

            // Remaining + pay later charge
            remaining = subtotal - advance + payLaterCharge;

            // Full payable (subtotal + 2% pay later charge)
            total = subtotal + payLaterCharge;

            otherLabel = "Advance Payment";

        } else {
            // 🏦 Bank Transfer
            otherLabel = "No Extra Charges (Bank Transfer)";
        }

        // ---------------- Render Totals ----------------
        let totalsHTML = `
    <div class="order-subtotal d-flex justify-content-between">
        <span>Subtotal</span>
        <span>₹${subtotal.toFixed(2)}</span>
    </div>`;

        if (selectedPayment === "cod") {
            totalsHTML += `
    <div class="order-payment-charge d-flex justify-content-between">
        <span>${otherLabel}</span>
        <span>₹${advance.toFixed(2)}</span>
    </div>
    <div class="order-payment-charge d-flex justify-content-between">
        <span>Pay Later Charges</span>
        <span>₹${payLaterCharge.toFixed(2)}</span>
    </div>
    <div class="order-payment-charge d-flex justify-content-between fw-bold p-2 rounded"
         style="background:#cbe3faff; border:1px solid #cbe3faff; color:#000;">
        <span>Remaining at Delivery</span>
        <span>₹${remaining.toFixed(2)}</span>
    </div>`;
        } else if (finalAmount > 0) {
            totalsHTML += `
    <div class="order-payment-charge d-flex justify-content-between">
        <span>${otherLabel}</span>
        <span>₹${finalAmount.toFixed(2)}</span>
    </div>`;
        } else {
            totalsHTML += `
    <div class="order-payment-charge d-flex justify-content-between text-success">
        <span>${otherLabel}</span>
        <span>₹0.00</span>
    </div>`;
        }

        totalsHTML += `
    <hr class="my-2">
    <div class="order-total d-flex justify-content-between fw-bold fs-5">
        <span>${selectedPayment === "cod" ? "Pay Now (Advance)" : "Total"}</span>
        <span>₹${finalAmount.toFixed(2)}</span>
    </div>`;

        totals.innerHTML = totalsHTML;
        itemCount.textContent = `(${totalItems} item${totalItems > 1 ? "s" : ""})`;

    }

    renderCart(cart);

    // ---------------- Submit checkout ----------------
    document.querySelector(".checkout-form").addEventListener("submit", async e => {
        e.preventDefault();
        orderError.classList.add("d-none");
        orderError.textContent = "";

        const items = cart.map(i => ({
            product: i._id || i.product._id,
            title: i.title || i.product.title,
            price: i.price || i.product.price,
            image: i.image || i.product.image,
            quantity: i.quantity
        }));

        const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        let totalAmount = subtotal;

        if (selectedPayment === "payu") totalAmount += subtotal * 0.02;
        if (selectedPayment === "cod") totalAmount = 3000 * items.reduce((n, i) => n + i.quantity, 0); // Advance only

        try {
            let res, data;
            if (selectedPayment === "cod") {
                res = await fetch("/api/orders/cod", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ items, totalAmount })
                });
                data = await res.json();
                if (data.orderId) window.location.href = `/orderDetails.html?orderId=${data.orderId}`;
                return;
            }

            if (selectedPayment === "bank") {
                res = await fetch("/api/orders/bank", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ items, totalAmount })
                });
                data = await res.json();
                if (data.orderId) window.location.href = `/orderDetails.html?orderId=${data.orderId}`;
                return;
            }

            // PayU
            const payuRes = await fetch("/api/orders/payu/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    items,
                    totalAmount,
                    productinfo: "DroneMart Order",
                    firstname: profile.firstName,
                    email: profile.email,
                    phone: profile.mobile
                })
            });
            const { payuForm } = await payuRes.json();
            document.body.insertAdjacentHTML("beforeend", payuForm);
            document.getElementById("payuForm").submit();

        } catch (err) {
            orderError.textContent = err.message || "Order failed. Try again.";
            orderError.classList.remove("d-none");
        }
    });
});
