document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector("#productsTable tbody");
    const searchKeyword = document.getElementById('searchKeyword');

    let products = [];
    

    // =============================
    // ✅ Load Products
    // =============================
    async function loadProducts() {
        try {
            const res = await fetch(`/api/products`, { credentials: "include" });
            if (res.status === 401) {
                logout();
                return;
            }
            if (!res.ok) throw new Error("Failed to fetch products");
            products = await res.json();

            renderProductsTable(products);
        } catch (err) {
            console.error(err);
            alert("Error fetching products. Check console.");
        }
    }

    // -----------------------------
    // ✅ Render Table (Reusable)
    // -----------------------------
    function renderProductsTable(rows) {
        tbody.innerHTML = "";

        if (!rows || rows.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center">No products found</td></tr>`;
            return;
        }

        rows.forEach((product, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${product.title}</td>
                <td>${product.brand || "-"}</td>
                <td>${product.category || "-"}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.featured ? "Yes" : "No"}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-2 edit-btn" data-id="${product._id}">
                        <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button class="btn btn-sm btn-danger me-2 delete-btn" data-id="${product._id}">
                        <i class="bi bi-trash"></i> Delete
                    </button>
                    <button class="btn btn-sm btn-warning stock-btn" data-id="${product._id}" data-stock="${product.stock}">
                        <i class="bi bi-box-seam"></i> Update Stock
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });

        attachProductActions(); // reattach events after rendering
    }

    // -----------------------------
    // ✅ Setup Filters
    // -----------------------------
    function setupFilters() {
        if (!searchKeyword || !Array.isArray(products)) {
            console.error("Missing search input or products array");
            return;
        }

        const brandFilter = document.getElementById('brandFilter'); // get brand dropdown

        function filterProducts() {
            const keyword = searchKeyword.value.toLowerCase().trim();
            const selectedBrand = brandFilter.value; // e.g., 'DJI', 'EFT', or 'all'

            const filtered = products.filter(p => {
                const title = (p.title || "").toLowerCase();
                const brand = (p.brand || "").toLowerCase();

                const matchesKeyword = title.includes(keyword) || brand.includes(keyword);
                const matchesBrand = selectedBrand === "all" || brand === selectedBrand.toLowerCase();

                return matchesKeyword && matchesBrand;
            });

            renderProductsTable(filtered);
        }

        searchKeyword.addEventListener("input", filterProducts);
        brandFilter.addEventListener("change", filterProducts); // filter on brand change
    }


    // =============================
    // ✅ Attach Actions
    // =============================
    function attachProductActions() {
        setupEditButtons();
        setupDeleteButtons();
        setupStockButtons();
    }

    // =============================
    // ✅ Edit Product
    // =============================
    function setupEditButtons() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = `updateProduct.html?id=${btn.dataset.id}`;
            });
        });
    }

    // =============================
    // ✅ Delete Product
    // =============================
    function setupDeleteButtons() {
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                if (!confirm("Are you sure you want to delete this product?")) return;
                try {
                    const res = await fetch(`/api/products/${btn.dataset.id}`, {
                        method: "DELETE",
                        credentials: "include"
                    });
                    if (!res.ok) throw new Error("Failed to delete product");
                    await loadProducts(); // Reload after deletion
                } catch (err) {
                    console.error(err);
                    alert("Failed to delete product. Check console.");
                }
            });
        });
    }

    const modal = new bootstrap.Modal(document.getElementById('updateStockModal'));
    const stockInput = document.getElementById('stockInput');
    const saveBtn = document.getElementById('saveStockBtn');

    let selectedProductId = null;

    // Setup buttons
    function setupStockButtons() {
        document.querySelectorAll(".stock-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                selectedProductId = btn.dataset.id;
                const currentStock = btn.dataset.stock;

                // Set current stock in input
                stockInput.value = currentStock;

                // Open modal
                modal.show();
            });
        });
    }

    // Save stock
    saveBtn.addEventListener("click", async () => {
        const newStock = parseInt(stockInput.value);
        if (isNaN(newStock) || newStock < 0) return alert("Please enter a valid stock quantity.");

        try {
            saveBtn.disabled = true;
            saveBtn.textContent = 'Saving...';

            const res = await fetch(`/api/products/${selectedProductId}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stock: newStock })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            alert("✅ Stock updated successfully!");
            modal.hide();
            await loadProducts();

            const btn = document.querySelector(`.stock-btn[data-id="${selectedProductId}"]`);
            if (btn) btn.dataset.stock = newStock;

        } catch (err) {
            console.error(err);
            alert("❌ Failed to update stock.");
        } finally {
            saveBtn.disabled = false;
            saveBtn.textContent = 'Save';
        }
    });

    // =============================
    // ✅ Initial Load
    // =============================
    await loadProducts();
    setupFilters();
});
