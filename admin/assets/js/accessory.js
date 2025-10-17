document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector("#AccessoriesTable tbody");
    const searchKeyword = document.getElementById('searchKeyword'); // your text input
    const typeFilter = document.getElementById('typeFilter'); // your brand dropdown

    let accessories = [];

    // =============================
    // ✅ Load Accessories
    // =============================
    async function loadAccessories() {
        try {
            const res = await fetch(`/api/accessory/all`, { credentials: "include" });
            if (res.status === 401) {
                logout();
                return;
            }
            if (!res.ok) throw new Error("Failed to fetch Accessories");

            accessories = await res.json();

            // Populate brand dropdown dynamically
            populatetypeFilterFromAccessories(accessories);

            renderAccessoriesTable(accessories);
        } catch (err) {
            console.error(err);
            alert("Error fetching Accessories. Check console.");
        }
    }

    // -----------------------------
    // ✅ Render Table (Reusable)
    // -----------------------------
    function renderAccessoriesTable(rows) {
        tbody.innerHTML = "";

        if (!rows || rows.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" class="text-center">No Accessories found</td></tr>`;
            return;
        }

        rows.forEach((accessory, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${index + 1}</td>
                <td style="width: 220px;">${accessory.title}</td>
                <td>${accessory.type || "-"}</td>
                <td>${accessory.price}</td>
                <td>${accessory.stock}</td>
                <td>
                    <button class="btn btn-sm btn-primary me-2 edit-btn" data-id="${accessory._id}">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-sm btn-danger me-2 delete-btn" data-id="${accessory._id}">
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-warning stock-btn" data-id="${accessory._id}" data-stock="${accessory.stock}">
                        <i class="bi bi-box-seam"></i>
                    </button>
                </td>
            `;

            tbody.appendChild(row);
        });

        attachAccessoryActions(); // reattach events after rendering
    }

    // -----------------------------
    // ✅ Populate Brand Dropdown
    // -----------------------------
    function populatetypeFilterFromAccessories(accessories) {
        if (!typeFilter) return;

        // Clear existing options
        typeFilter.innerHTML = `<option value="all">All Accessories</option>`;

        // Get unique type
        const type = [...new Set(accessories.map(a => a.type).filter(t => t))];

        type.forEach(t => {
            const option = document.createElement("option");
            option.value = t;
            option.textContent = t;
            typeFilter.appendChild(option);
        });
    }

    // -----------------------------
    // ✅ Setup Filters
    // -----------------------------
    function setupFilters() {
        if (!searchKeyword || !typeFilter) {
            console.error("Missing search input or brand filter");
            return;
        }

        function filterAccessories() {
            const keyword = searchKeyword.value.toLowerCase().trim();
            const selectedBrand = typeFilter.value;

            const filtered = accessories.filter(a => {
                const title = (a.title || "").toLowerCase();
                const type = (a.type || "").toLowerCase();

                const matchesKeyword = title.includes(keyword) || type.includes(keyword);
                const matchesBrand = selectedBrand === "all" || type === selectedBrand.toLowerCase();

                return matchesKeyword && matchesBrand;
            });

            renderAccessoriesTable(filtered);
        }

        searchKeyword.addEventListener("input", filterAccessories);
        typeFilter.addEventListener("change", filterAccessories);
    }

    // =============================
    // ✅ Attach Actions
    // =============================
    function attachAccessoryActions() {
        setupEditButtons();
        setupDeleteButtons();
        setupStockButtons();
    }

    // =============================
    // ✅ Edit accessory
    // =============================
    function setupEditButtons() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = `updateAccessory.html?id=${btn.dataset.id}`;
            });
        });
    }

    // =============================
    // ✅ Delete accessory
    // =============================
    function setupDeleteButtons() {
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", async () => {
                if (!confirm("Are you sure you want to delete this accessory?")) return;
                try {
                    const res = await fetch(`/api/accessory/${btn.dataset.id}`, {
                        method: "DELETE",
                        credentials: "include"
                    });
                    if (!res.ok) throw new Error("Failed to delete accessory");
                    await loadAccessories(); // Reload after deletion
                } catch (err) {
                    console.error(err);
                    alert("Failed to delete accessory. Check console.");
                }
            });
        });
    }

    const modal = new bootstrap.Modal(document.getElementById('updateStockModal'));
    const stockInput = document.getElementById('stockInput');
    const saveBtn = document.getElementById('saveStockBtn');

    let selectedAccessoryId = null;

    // Setup buttons
    function setupStockButtons() {
        document.querySelectorAll(".stock-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                selectedAccessoryId = btn.dataset.id;
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

            const res = await fetch(`/api/accessory/${selectedAccessoryId}/stock`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ stock: newStock })
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message);

            alert("✅ Stock updated successfully!");
            modal.hide();
            await loadAccessories();

            const btn = document.querySelector(`.stock-btn[data-id="${selectedAccessoryId}"]`);
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
    await loadAccessories();
    setupFilters();
});
