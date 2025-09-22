document.addEventListener("DOMContentLoaded", async () => {
    const placeOrderBtn = document.querySelector(".place-order-btn");
    const orderError = document.getElementById("order-error");

    // Payment toggle
    const paymentOptions = document.querySelectorAll(".payment-option input[name='payment-method']");
    const payuDetails = document.getElementById("payment-payu");
    const codDetails = document.getElementById("payment-cod");
    let selectedPayment = "payu";

    paymentOptions.forEach(option => {
        option.addEventListener("change", e => {
            selectedPayment = e.target.value;
            payuDetails.classList.add("d-none");
            codDetails.classList.add("d-none");
            if (selectedPayment === "payu") payuDetails.classList.remove("d-none");
            if (selectedPayment === "cod") codDetails.classList.remove("d-none");
            placeOrderBtn.textContent = selectedPayment === "cod" ? "Place Your Order" : "Make Payment & Confirm Order";
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
    document.getElementById("last-name").value = profile.lastName || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("phone").value = profile.mobile || "";
    document.getElementById("address").value = profile.street || "";
    document.getElementById("apartment").value = profile.apartment || "";
    document.getElementById("city").value = profile.city || "";
    document.getElementById("state").value = profile.state || "";
    document.getElementById("pincode").value = profile.pincode || "";
    document.getElementById("country").value = "INDIA";

    // ---------------- Load cart ----------------
    let cart = [];
    try {
        const cartRes = await fetch("/api/cart", { credentials: "include" });
        if (!cartRes.ok) throw new Error("Cart fetch failed");
        cart = (await cartRes.json()).items || [];
    } catch (err) {
        alert("Cart is empty or fetch failed");
        return;
    }

    // Render order summary
    const summary = document.querySelector(".order-items");
    const totals = document.querySelector(".order-totals");
    function renderCart(cart) {
        summary.innerHTML = "";
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            summary.innerHTML += `
        <div class="order-item">
          <div class="order-item-image">
            <img src="${item.image}" alt="${item.title}" class="img-fluid">
          </div>
          <div class="order-item-details">
            <h4>${item.title}</h4>
            <div class="order-item-price">
              <span class="quantity">${item.quantity} ×</span>
              <span class="price">₹${item.price}</span>
            </div>
          </div>
        </div>`;
        });
        totals.innerHTML = `
      <div class="order-subtotal d-flex justify-content-between"><span>Subtotal</span><span>₹${subtotal.toFixed(2)}</span></div>
      <div class="order-shipping d-flex justify-content-between"><span>Shipping</span><span>₹0.00</span></div>
      <div class="order-total d-flex justify-content-between"><span>Total</span><span>₹${subtotal.toFixed(2)}</span></div>
    `;
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

        const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
        const totalAmountNumber = Number(totalAmount.toFixed(2));

        try {
            if (selectedPayment === "cod") {
                const codRes = await fetch("/api/orders/cod", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ items: cart, totalAmount: totalAmountNumber })
                });
                const codData = await codRes.json();
                if (codData.orderId) {
                    window.location.href = `/order-details.html?orderId=${codData.orderId}`;
                }
                return;
            }

            // ---------------- PayU payment ----------------
            const payuRes = await fetch("/api/orders/payu/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    items: cart,
                    totalAmount: totalAmountNumber,
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
