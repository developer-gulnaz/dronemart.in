document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");
  if (!slug) return;

  try {
    // -------------------------------
    // ✅ Detect product vs accessory
    // -------------------------------
    // Try product API first
    let res = await fetch(`/api/products/slug/${slug}`);
    let { product } = await res.json();

    // If not found, fallback to accessory API
    if (!product) {
      const accRes = await fetch(`/api/accessory/slug/${slug}`);
      if (!accRes.ok) throw new Error("Failed to fetch accessory data");
      const { accessory } = await accRes.json();
      product = accessory; // use same variable for UI rendering
    }

    if (!product) throw new Error("Item not found");
    populateProductUI(product);
  } catch (err) {
    console.error(err);
    alert("Unable to load product or accessory data");
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

    // Determine drone type
    const isAgricultureDrone = product.category?.toLowerCase().includes('agriculture');

    let highlights = [];

    if (isAgricultureDrone) {
      // Agriculture drone highlights
      highlights = [
        { icon: "bi bi-gear", title: "Motor Type", value: product.specs?.propulsion?.motorType },
        { icon: "bi bi-box-arrow-up", title: "Max Takeoff Weight", value: product.specs?.aircraft?.maxTakeoffWeight },
        { icon: "bi bi-droplet-half", title: "Tank Capacity", value: product.specs?.aircraft?.tankCapacity },
        { icon: "bi bi-layers-half", title: "Spraying Width", value: product.specs?.sprayingSystem?.sprayingWidth },
      ];
    } else {
      // DJI and FPV drones keep same
      highlights = [
        { icon: "bi bi-tags", title: "Brand", value: product.brand },
        { icon: "bi bi-box", title: "Category", value: product.category },
        { icon: "bi bi-battery-charging", title: "Max Flight Time", value: product.specs?.aircraft?.maxFlightTime },
        { icon: "bi bi-cpu", title: "Weight", value: product.specs?.aircraft?.weight },
      ];
    }

    // Render highlights
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

  // Flatten object -> rows
  function buildRows(obj) {
    let rows = "";
    if (!obj) return rows;
    Object.entries(obj).forEach(([k, v]) => {
      if (typeof v === "object" && !Array.isArray(v)) {
        // nested object
        rows += buildRows(v);
      } else {
        rows += renderSpecsRow(formatKey(k), v);
      }
    });
    return rows;
  }

  // Format key names to human-readable
  function formatKey(key) {
    return key
      .replace(/([A-Z])/g, " $1")   // add space before capitals
      .replace(/_/g, " ")           // underscores to spaces
      .replace(/\b\w/g, l => l.toUpperCase()); // capitalize
  }

  // Build accordion dynamically
  let accordionHTML = "";

  // Special case: camera with multiple lenses
  if (product.specs?.camera?.cameras) {
    product.specs.camera.cameras.forEach((cam, idx) => {
      accordionHTML += renderAccordionSection(
        `camera${idx}`,
        `Camera ${idx + 1}`,
        buildRows(cam)
      );
    });
  }

  // Loop all other top-level specs
  Object.entries(product.specs || {}).forEach(([section, data]) => {
    if (section === "camera" && data.cameras) return; // already handled

    const rows = buildRows(data);
    accordionHTML += renderAccordionSection(section, formatKey(section), rows);
  });

  techContainer.innerHTML = `
  <div class="accordion" id="productSpecsAccordion">
    ${accordionHTML}
  </div>
`;

  // ---------- Package / In-the-box ----------
  const mainContainer = document.getElementById("product-package-container");
  if (mainContainer) mainContainer.innerHTML = "";

  const djiBrand = "DJI";
  const specialCategories = ["Agriculture", "FPV", "Accessories"];

  if (product.brand === djiBrand) {
    // DJI style grid
    const djiContainer = document.createElement("div");
    djiContainer.innerHTML = `
    <div class="package-contents">
      <h4>In the box</h4>
      <div class="in-the-box-grid" id="in-the-box-grid"></div>
    </div>
  `;
    mainContainer.appendChild(djiContainer);

    const grid = djiContainer.querySelector(".in-the-box-grid");

    (product.inTheBox || []).forEach(item => {
      const div = document.createElement("div");
      div.classList.add("in-the-box-item");

      // Check if image exists
      const imgHTML = item.image ? `<img src="${item.image}" alt="${item.title}">` : "";

      div.innerHTML = `
    ${imgHTML}
    <div><strong>${item.title}</strong></div>
    <div>× ${item.quantity}</div>
  `;

      grid.appendChild(div);
    });


  } else if (specialCategories.includes(product.category) || product.type === "accessory") {
    // Agriculture/FPV/Accessories style list
    const specContainer = document.createElement("div");
    specContainer.innerHTML = `
    <div class="package-contents">
      <h4>Package Contents</h4>
      <ul class="contents-list" id="package-contents-list"></ul>
    </div>
  `;
    mainContainer.appendChild(specContainer);

    const ul = specContainer.querySelector("#package-contents-list");
    (product.inTheBox || []).forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="bi bi-check-circle"></i> ${item.quantity} × ${item.title}`;
      ul.appendChild(li);
    });
  }

  const featuresGrid = document.querySelector(".features-grid");
  if (Array.isArray(product.features) && product.features.length > 0) {
    featuresGrid.innerHTML = `
    <div class="package-contents">
      <h4>Features</h4>
      <ul class="contents-list"></ul>
    </div>
  `;
    mainContainer.appendChild(featuresGrid);

    const ul = featuresGrid.querySelector(".contents-list");
    product.features.forEach(feature => {
      const li = document.createElement("li");
      li.innerHTML = `<i class="bi bi-shield-check text-warning"></i> ${feature}`;
      ul.appendChild(li);
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



