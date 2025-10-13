let allRepairs = [];
let currentRepairId = null;

// -----------------------------
// Load Repairs
// -----------------------------
async function loadRepairs() {
    try {
        const res = await fetch(`/api/repairs`, { credentials: "include" });
        if (res.status === 401) return logout();
        allRepairs = await res.json();
        renderRepairsTable(allRepairs);
    } catch (err) {
        console.error("Error loading repairs:", err);
        window.showDialog("Failed to load repair requests.", "error");
    }
}

// -----------------------------
// Format Date
// -----------------------------
function formatDate(dateString) {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
        day: "2-digit", month: "2-digit", year: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true
    }).format(date).replace(",", "");
}

// -----------------------------
// Render Repairs Table
// -----------------------------
function renderRepairsTable(repairs) {
    const tbody = document.querySelector("#repairsTable tbody");
    tbody.innerHTML = "";

    if (!repairs.length) {
        tbody.innerHTML = `<tr><td colspan="9" class="text-center">No repair requests found</td></tr>`;
        return;
    }

    repairs.forEach((repair, idx) => {
        const formattedDate = formatDate(repair.createdAt);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${idx + 1}</td>
            <td>${formattedDate}</td>
            <td>${repair.name}</td>
            <td>${repair.email}</td>
            <td>${repair.phone}</td>
            <td>${repair.brand}</td>
            <td>${repair.modelName || "-"}</td>
            <td>
                <span class="badge ${getStatusBadgeClass(repair.status)}">
                    ${repair.status?.charAt(0).toUpperCase() + repair.status?.slice(1)}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-outline-primary update-status-btn" data-id="${repair._id}">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-sm btn-outline-info view-btn" data-id="${repair._id}">
                    <i class="bi bi-eye"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    setupStatusUpdate();
}

// -----------------------------
// Status Badge Color
// -----------------------------
function getStatusBadgeClass(status) {
    switch (status) {
        case "new": return "bg-warning text-dark";
        case "connected": return "bg-info text-white";
        case "in-progress": return "bg-primary text-white";
        case "resolved": return "bg-success text-white";
        default: return "bg-secondary text-white";
    }
}

// -----------------------------
// Setup Status Update Modal
// -----------------------------
function setupStatusUpdate() {
    const modalEl = document.getElementById('updateRepairStatusModal');
    const repairStatusModal = new bootstrap.Modal(modalEl);

    const statusSelect = document.getElementById("repairStatusSelect");
    const notesInput = document.getElementById("adminNotesInput");

    document.querySelectorAll(".update-status-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const repairId = btn.dataset.id;
            currentRepairId = repairId;

            const repair = allRepairs.find(r => r._id === repairId);
            if (!repair) return;

            // Fill current values
            statusSelect.value = repair.status || "new";
            notesInput.value = repair.adminNotes || "";

            const badge = document.getElementById("modalCurrentStatusBadge");
            badge.textContent = repair.status?.charAt(0).toUpperCase() + repair.status?.slice(1);
            badge.className = "badge " + getStatusBadgeClass(repair.status);

            repairStatusModal.show();
        });
    });

    const viewRepairModalEl = document.getElementById('viewRepairModal');
    const viewRepairModal = new bootstrap.Modal(viewRepairModalEl);

    const statusBadge = document.getElementById("modalViewStatusBadge");
    const adminNotesEl = document.getElementById("modalAdminNotes");
    const attachmentsContainer = document.getElementById("modalAttachmentsContainer");

    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const repairId = btn.dataset.id;
            const repair = allRepairs.find(r => r._id === repairId);
            if (!repair) return;

            // Status
            statusBadge.textContent = repair.status?.charAt(0).toUpperCase() + repair.status?.slice(1);
            statusBadge.className = "badge " + getStatusBadgeClass(repair.status);

            // Admin Notes
            adminNotesEl.textContent = repair.adminNotes || "No notes yet.";

            // Attachments
            attachmentsContainer.innerHTML = "";
            if (repair.attachments && repair.attachments.length > 0) {
                repair.attachments.forEach((att, index) => {
                    const activeClass = index === 0 ? "active" : "";
                    const img = document.createElement("div");
                    img.className = `carousel-item ${activeClass}`;
                    img.innerHTML = `<img src="${att.url}" class="d-block w-100 rounded" alt="Attachment ${index + 1}">`;
                    attachmentsContainer.appendChild(img);
                });
            } else {
                attachmentsContainer.innerHTML = `<div class="carousel-item active"><p class="text-center">No attachments</p></div>`;
            }

            viewRepairModal.show();
        });
    });

    // Save updated status
    document.getElementById("saveRepairStatusBtn").addEventListener("click", async () => {
        if (!currentRepairId) return;

        const newStatus = statusSelect.value;
        const newNotes = notesInput.value;

        try {
            const res = await fetch(`/api/repairs/${currentRepairId}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus, adminNotes: newNotes }),
                credentials: "include",
            });

            if (!res.ok) throw new Error("Failed to update repair");
            const data = await res.json();

            // Update local cache
            const idx = allRepairs.findIndex(r => r._id === currentRepairId);
            if (idx !== -1) allRepairs[idx] = data.repair;

            renderRepairsTable(allRepairs);
            repairStatusModal.hide();
        } catch (err) {
            console.error(err);
            alert("Failed to update repair status.");
        }
    });
}

// -----------------------------
// Filters (Optional)
// -----------------------------
function setupFilters() {
    const keywordInput = document.getElementById("searchKeyword");
    const statusFilter = document.getElementById("statusFilter");

    function filterRepairs() {
        const keyword = keywordInput.value.toLowerCase();
        const status = statusFilter.value.toLowerCase();

        const filtered = allRepairs.filter(r => {
            const matchesKeyword =
                r.name.toLowerCase().includes(keyword) ||
                r.email.toLowerCase().includes(keyword) ||
                r.phone.toLowerCase().includes(keyword) ||
                r.brand.toLowerCase().includes(keyword) ||
                (r.modelName || "").toLowerCase().includes(keyword);

            const matchesStatus = status === "all" || r.status.toLowerCase() === status;

            return matchesKeyword && matchesStatus;
        });

        renderRepairsTable(filtered);
    }

    keywordInput.addEventListener("input", filterRepairs);
    statusFilter.addEventListener("change", filterRepairs);
}

// -----------------------------
// Init
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("userType")) return logout();
    loadRepairs();
    setupFilters();
});
