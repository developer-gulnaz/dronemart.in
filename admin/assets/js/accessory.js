document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector("#AccessoriesTable tbody");

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
            const accessories = await res.json();
            console.log("Accessory " + accessories.data);
            tbody.innerHTML = "";

            if (accessories.length === 0) {
                tbody.innerHTML = `<tr><td colspan="7" class="text-center">No Accessories found</td></tr>`;
                return;
            }

            accessories.forEach((accessory, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td style="width: 220px;">${accessory.title}</td>
                    <td>${accessory.brand + " - " + accessory.category || "-"}</td>
                    <td>${accessory.price}</td>
                    <td>${accessory.stock}</td>
                    <td>
                        <button class="btn btn-sm btn-primary me-2 edit-btn" data-id="${accessory._id}">
                            <i class="bi bi-pencil-square"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger me-2 delete-btn" data-id="${accessory._id}">
                            <i class="bi bi-trash"></i> Delete
                        </button>
                        <button class="btn btn-sm btn-warning stock-btn" data-id="${accessory._id}" data-stock="${accessory.stock}">
                            <i class="bi bi-box-seam"></i> Update Stock
                        </button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            attachAccessoryActions(); // Attach events after rows are created
        } catch (err) {
            console.error(err);
            alert("Error fetching Accessories. Check console.");
        }
    }

    // =============================
    // ✅ Attach Actions
    // =============================
    function attachAccessoryActions() {
        setupEditButtons();
        setupDeleteButtons();
        setupStockButtons();
        // Future features can be added here as separate functions
    }

    // =============================
    // ✅ Edit accessory
    // =============================
    function setupEditButtons() {
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                window.location.href = `updateaccessory.html?id=${btn.dataset.id}`;
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
                    const res = await fetch(`/api/Accessories/${btn.dataset.id}`, {
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

    // =============================
    // ✅ Update Stock
    // =============================
    function setupStockButtons() {
        document.querySelectorAll(".stock-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const accessoryId = btn.dataset.id;
                const currentStock = btn.dataset.stock;
                // Redirect to update-accessory page with stock query
                window.location.href = `updateaccessory.html?id=${accessoryId}&stock=${currentStock}`;
            });
        });
    }

    // =============================
    // ✅ Initial Load
    // =============================
    await loadAccessories();

    // =============================
    // Future features can be initialized here
    // =============================
});
