document.addEventListener("DOMContentLoaded", async () => {
    let selectedPayment = "credit-card";
    const creditCardDetails = document.getElementById("credit-card-details");
    const placeOrderBtn = document.querySelector(".place-order-btn");



    // Payment UI toggle
    const paymentOptions = document.querySelectorAll(".payment-option input[name='payment-method']");
    const upiDetails = document.getElementById("upi-details");
    const codDetails = document.getElementById("cod-details");
    initCreditCardPayment(creditCardDetails, placeOrderBtn);

    paymentOptions.forEach(option => {
        option.addEventListener("change", (e) => {
            selectedPayment = e.target.id;
            creditCardDetails.classList.add("d-none");
            upiDetails.classList.add("d-none");
            codDetails.classList.add("d-none");

            if (selectedPayment === "credit-card") {
                creditCardDetails.classList.remove("d-none");
                placeOrderBtn.textContent = "Make Payment & Confirm Order";
            }
            if (selectedPayment === "upi") {
                upiDetails.classList.remove("d-none");
                placeOrderBtn.textContent = "Make Payment & Confirm Order";
            }
            if (selectedPayment === "cod") {
                codDetails.classList.remove("d-none");
                placeOrderBtn.textContent = "Place Your Order";
            }
        });
    });

    // Fetch user profile
    let profile = {};
    try {
        const res = await fetch("/api/users/profile", { credentials: "include" });
        if (!res.ok) throw new Error("Login required");
        profile = await res.json();
    } catch (err) {
        alert("Login required!");
        window.location.href = "login.html";
        return;
    }

    // Populate profile data
    document.getElementById("first-name").value = profile.firstName || "";
    document.getElementById("last-name").value = profile.lastName || "";
    document.getElementById("email").value = profile.email || "";
    document.getElementById("phone").value = profile.mobile || "";
    document.getElementById("address").value = profile.street || "";
    document.getElementById("apartment").value = profile.apartment || "";
    document.getElementById("city").value = profile.city || "";
    document.getElementById("state").value = profile.state || "";
    document.getElementById("zip").value = profile.pincode || "";
    document.getElementById("country").value = "INDIA";

    // Fetch cart
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
              <span class="price">$${item.price}</span>
            </div>
          </div>
        </div>`;
        });
        totals.innerHTML = `
      <div class="order-subtotal d-flex justify-content-between"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
      <div class="order-shipping d-flex justify-content-between"><span>Shipping</span><span>$0.00</span></div>
      <div class="order-tax d-flex justify-content-between"><span>Tax</span><span>$0.00</span></div>
      <div class="order-total d-flex justify-content-between"><span>Total</span><span>$${subtotal.toFixed(2)}</span></div>
    `;
    }
    renderCart(cart);

    // Submit order
    document.querySelector(".checkout-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const orderError = document.getElementById("order-error");
        orderError.classList.add("d-none");
        orderError.textContent = "";

        // Required fields
        const street = document.getElementById("address").value.trim();
        const apartment = document.getElementById("apartment").value.trim();
        if (!street || !apartment) return alert("Street and Apartment are required");

        // Save address if checked
        const saveAddress = document.getElementById("save-address").checked;
        if (saveAddress) {
            await fetch("/api/users/address", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ street, apartment }),
                credentials: "include"
            });
        }

        // Prepare order items
        const orderItems = cart.map(i => ({
            product: i._id || i.product._id,
            title: i.title || i.product.title,
            price: i.price || i.product.price,
            image: i.image || i.product.image,
            quantity: i.quantity
        }));

        // Validate payment fields
        if (selectedPayment === "credit-card") {
            const cardNumber = document.getElementById("card-number").value.trim();
            const expiry = document.getElementById("expiry").value.trim();
            const cvv = document.getElementById("cvv").value.trim();
            const cardName = document.getElementById("card-name").value.trim();
            if (!cardNumber || !expiry || !cvv || !cardName) return orderError.textContent = "Complete card details";
        }
        if (selectedPayment === "upi") {
            const upiId = document.getElementById("upi-id").value.trim();
            if (!upiId) return orderError.textContent = "Enter UPI ID";
        }

        // Send order
        try {
            const orderRes = await fetch("/api/users/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    products: orderItems,
                    shippingAddress: { street, apartment, city: profile.city, state: profile.state, zip: profile.pincode, country: "INDIA" },
                    paymentMethod: selectedPayment,
                    total: orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0)
                })
            });
            const order = await orderRes.json();
            if (order._id) {
                // Redirect to order confirmation
                window.location.href = `/order-confirmation.html?orderId=${order._id}`;
            } else {
                throw new Error(order.message || "Order failed");
            }
        } catch (err) {
            // Show error and stay on same page with form data
            orderError.textContent = err.message || "Order failed, try again";
            orderError.classList.remove("d-none");
        }
    });
});


// ------------------- Payment Logic Functions -------------------

// 1️⃣ Detect Card Type
function detectCardType(number) {
    const re = {
        visa: /^4/,
        mastercard: /^5[1-5]/,
        amex: /^3[47]/,
        rupay: /^6(?:0|5)/,
        discover: /^6(?:011|5)/,
    };
    if (re.visa.test(number)) return "visa";
    if (re.mastercard.test(number)) return "mastercard";
    if (re.amex.test(number)) return "amex";
    if (re.rupay.test(number)) return "rupay";
    if (re.discover.test(number)) return "discover";
    return "";
}

// 2️⃣ Save Card Function (formatted for your user model)
async function saveCard(cardData) {
    const payload = {
        type: "card",
        details: {
            cardNumber: maskCardNumber(cardData.cardNumber), // mask sensitive data
            expiry: cardData.expiry,
            cardName: cardData.cardName,
            scheme: cardData.type // Visa, MasterCard, Rupay, etc.
        }
    };

    try {
        const res = await fetch("/api/users/payment-methods", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to save card");
        alert("Card saved successfully!");
        return true;
    } catch (err) {
        alert(err.message);
        return false;
    }
}

// Helper: mask card number (show only last 4 digits)
function maskCardNumber(number) {
    return number.replace(/\d(?=\d{4})/g, "*");
}


// 3️⃣ Initialize Card Input (dynamic icon + save button)
function initCreditCardPayment(creditCardDetails, placeOrderBtn) {
    const cardNumberInput = document.getElementById("card-number");

    // Card icon container
    const cardIconContainer = document.createElement("span");
    cardIconContainer.style.marginLeft = "10px";
    cardIconContainer.style.fontSize = "24px";
    cardNumberInput.parentNode.appendChild(cardIconContainer);

    // Map card type to icons (use emojis or img URLs)
    const cardIcons = {
        visa: "💳 Visa",
        mastercard: "💳 MasterCard",
        amex: "💳 Amex",
        rupay: "💳 Rupay",
        discover: "💳 Discover"
    };

    cardNumberInput.addEventListener("input", () => {
        const cardType = detectCardType(cardNumberInput.value);
        cardIconContainer.textContent = cardIcons[cardType] || "";
    });

    // Save Card button
    const saveCardBtn = document.createElement("button");
    saveCardBtn.type = "button";
    saveCardBtn.className = "btn btn-outline-primary mt-2";
    saveCardBtn.textContent = "Add Card";
    creditCardDetails.appendChild(saveCardBtn);

    saveCardBtn.addEventListener("click", async () => {
        const cardData = {
            cardNumber: cardNumberInput.value.trim(),
            expiry: document.getElementById("expiry").value.trim(),
            cvv: document.getElementById("cvv").value.trim(),
            cardName: document.getElementById("card-name").value.trim(),
            type: detectCardType(cardNumberInput.value.trim()),
        };

        if (!cardData.cardNumber || !cardData.expiry || !cardData.cvv || !cardData.cardName || !cardData.type) {
            return alert("Complete card details with valid card type to save.");
        }

        const saved = await saveCard(cardData);
        if (saved) placeOrderBtn.textContent = "Use Saved Card & Confirm Order";
    });
}
