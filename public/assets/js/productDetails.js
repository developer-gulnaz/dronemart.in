document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  if (!slug) return;

  try {
    const res = await fetch(`/api/products/slug/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch product data");
    const { product } = await res.json();
    if (!product) throw new Error("Product not found");

    populateProductUI(product);
  } catch (err) {
    console.error(err);
    alert("Unable to load product data");
  }
});

function populateProductUI(product) {
  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount || 0);

  // ---------- Main Image ----------
  const mainImg = document.getElementById("main-product-image");
  if (mainImg) mainImg.src = product.image || "";

  // ---------- Thumbnails ----------
  const thumbnailGrid = document.querySelector(".thumbnail-grid");
  if (thumbnailGrid) {
    thumbnailGrid.innerHTML = "";
    (product.thumbnails || []).forEach((img, i) => {
      const thumb = document.createElement("div");
      thumb.className = `thumbnail-wrapper thumbnail-item ${i === 0 ? "active" : ""}`;
      thumb.dataset.image = img;
      thumb.innerHTML = `<img src="${img}" alt="View ${i + 1}" class="img-fluid">`;
      thumbnailGrid.appendChild(thumb);
    });
  }

  // ---------- Name & Badge ----------
  document.querySelector(".product-name").textContent = product.title || "-";
  document.querySelector(".badge-category").textContent = product.badge || "";

  // ---------- Pricing ----------
  const salePriceEl = document.querySelector(".sale-price");
  const regularPriceEl = document.querySelector(".regular-price");
  const saveAmountEl = document.querySelector(".save-amount");
  const discountPercentEl = document.querySelector(".discount-percent");

  if (salePriceEl) salePriceEl.textContent = formatINR(product.salePrice);
  if (product.price && product.salePrice < product.price) {
    const discount = product.price - product.salePrice;
    const percent = ((discount / product.price) * 100).toFixed(0);
    if (regularPriceEl) regularPriceEl.textContent = formatINR(product.price);
    if (saveAmountEl) saveAmountEl.textContent = `Save ${formatINR(discount)}`;
    if (discountPercentEl) discountPercentEl.textContent = `(${percent}% off)`;
  } else {
    if (regularPriceEl) regularPriceEl.style.display = "none";
    if (saveAmountEl) saveAmountEl.style.display = "none";
    if (discountPercentEl) discountPercentEl.style.display = "none";
  }

  // ---------- Stock ----------
  const stockText = document.querySelector(".stock-text");
  const quantityInput = document.querySelector(".quantity-input");
  const quantityLeft = document.querySelector(".quantity-left");

  if (product.stock > 0) {
    if (stockText) stockText.textContent = "Available";
    if (quantityInput) {
      quantityInput.disabled = false;
      quantityInput.max = product.stock;
    }
    if (quantityLeft) quantityLeft.textContent = `Only ${product.stock} items remaining`;
  } else {
    if (stockText) stockText.textContent = "Out of stock";
    if (quantityInput) quantityInput.disabled = true;
    if (quantityLeft) quantityLeft.textContent = "Currently unavailable";
  }

  // ---------- Action buttons ----------
  const addToCartBtn = document.querySelector(".primary-action");
  const buyNowBtn = document.querySelector(".secondary-action");
  const wishlistBtn = document.querySelector(".icon-action.wishlist-btn");

  if (addToCartBtn) addToCartBtn.onclick = () => window.addToCart(product);
  if (buyNowBtn) buyNowBtn.onclick = () => window.buyNow?.(product);
  if (wishlistBtn) wishlistBtn.onclick = () => window.addToWishlist(product);

  // ---------- Overview ----------
  const overviewDesc = document.querySelector("#product-overview .content-section p");
  if (overviewDesc) overviewDesc.textContent = product.description || "-";

  const highlightsGrid = document.querySelector(".highlights-grid");
  if (highlightsGrid) {
    highlightsGrid.innerHTML = "";
    const highlights = [
      { icon: "bi bi-tags", title: "Brand", value: product.brand },
      { icon: "bi bi-box", title: "Category", value: product.category },
      { icon: "bi bi-battery-charging", title: "Max Flight Time", value: product.specs?.aircraft?.maxFlightTime },
      { icon: "bi bi-cpu", title: "Weight", value: product.specs?.aircraft?.weight },
    ];

    highlights.forEach(h => {
      if (h.value) {
        const card = document.createElement("div");
        card.className = "highlight-card";
        card.innerHTML = `
          <i class="${h.icon}"></i>
          <h5>${h.title}</h5>
          <p>${h.value}</p>
        `;
        highlightsGrid.appendChild(card);
      }
    });
  }

  // ---------- Technical Specs Accordion (always expanded) ----------
  const techContainer = document.querySelector("#technical-specs");
  if (!techContainer) return;

  function renderSpecsRow(name, value) {
    return value ? `
    <div class="spec-row">
      <span class="spec-key">${name}</span>
      <span class="spec-value">${value}</span>
    </div>
  ` : "";
  }

  function renderAccordionSection(id, title, rowsHTML) {
    if (!rowsHTML.trim()) return "";
    return `
    <div class="accordion-item">
      <h4 class="accordion-header">
        <button class="accordion-button" type="button">
          ${title}
        </button>
      </h4>
      <div id="${id}" class="accordion-collapse show">
        <div class="accordion-body">
          <div class="spec-table">
            ${rowsHTML}
          </div>
        </div>
      </div>
    </div>
  `;
  }

  // Aircraft
  const ac = product.specs?.aircraft || {};
  const aircraftRows = `
  ${renderSpecsRow("Weight", ac.weight)}
  ${renderSpecsRow("Max Flight Time", ac.maxFlightTime)}
  ${renderSpecsRow("Max Acceleration", ac.maxAccelerationSpeed)}
  ${renderSpecsRow("Folded (w/o propellers)", ac.dimensions?.foldedWithoutPropellers)}
  ${renderSpecsRow("Unfolded (w/ propellers)", ac.dimensions?.unfoldedWithPropellers)}
`;

  // Camera
  const cameras = product.specs?.camera?.cameras || [product.specs?.camera];
  let cameraSections = "";
  cameras.forEach((cam, idx) => {
    if (!cam) return;
    const camRows = `
    ${renderSpecsRow("Type", cam.type)}
    ${renderSpecsRow("Sensor", cam.sensor)}
    ${renderSpecsRow("Pixels", cam.effectivePixels)}
    ${renderSpecsRow("FOV", cam.fov)}
    ${renderSpecsRow("Aperture", cam.aperture)}
    ${renderSpecsRow("Focus Range", cam.focusRange)}
    ${renderSpecsRow("Max Image Size", cam.maxImageSize)}
    ${renderSpecsRow("Still Modes", cam.stillModes ? Object.values(cam.stillModes).join(", ") : "-")}
  `;
    cameraSections += renderAccordionSection(
      cameras.length > 1 ? `camera${idx}` : "camera",
      cameras.length > 1 ? `Camera ${idx + 1}` : "Camera Specifications",
      camRows
    );
  });

  // Video
  const cam = product.specs?.camera || {};
  const videoRows = `
  ${renderSpecsRow("Video Resolution", cam.videoResolution)}
  ${renderSpecsRow("Max Bitrate", cam.maxVideoBitrate)}
  ${renderSpecsRow("Image Format", cam.imageFormat)}
`;

  // Gimbal
  const g = product.specs?.gimbal || {};
  const gimbalRows = `
  ${renderSpecsRow("Stabilization", g.stabilization)}
  ${renderSpecsRow("Tilt Range", g.mechanicalRange?.tilt)}
  ${renderSpecsRow("Roll Range", g.mechanicalRange?.roll)}
  ${renderSpecsRow("Pan Range", g.mechanicalRange?.pan)}
  ${renderSpecsRow("Controllable Tilt", g.controllableRange?.tilt)}
  ${renderSpecsRow("Angular Vibration", g.angularVibrationRange)}
`;

  // Render all sections expanded
  techContainer.innerHTML = `
  <div class="accordion" id="productSpecsAccordion">
    ${renderAccordionSection("aircraft", "Aircraft Specifications", aircraftRows)}
    ${cameraSections}
    ${renderAccordionSection("video", "Video", videoRows)}
    ${renderAccordionSection("gimbal", "Gimbal", gimbalRows)}
  </div>
`;


  // ---------- In The Box ----------
  const gridContainer = document.getElementById("in-the-box-grid");
  if (gridContainer) {
    gridContainer.innerHTML = ""; // Clear previous content
    (product.inTheBox || []).forEach(item => {
      const div = document.createElement("div");
      div.classList.add("in-the-box-item");
      div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div><strong>${item.title}</strong></div>
      <div>× ${item.quantity}</div>
    `;
      gridContainer.appendChild(div);
    });
  }

}

// ---------- Thumbnail Click ----------
document.addEventListener("click", function (e) {
  const thumb = e.target.closest(".thumbnail-wrapper");
  if (!thumb) return;

  const mainImg = document.getElementById("main-product-image");
  if (mainImg) mainImg.src = thumb.dataset.image;

  document.querySelectorAll(".thumbnail-wrapper").forEach(el => el.classList.remove("active"));
  thumb.classList.add("active");
});



