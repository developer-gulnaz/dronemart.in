// -----------------------------
// Universal API Request Helper
// -----------------------------
const api_url = window.location.hostname === "localhost"
  ? `http://${window.location.hostname}:5000/api`
  : "/api";

async function apiRequest(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ send/receive session cookie
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(`${api_url}/${endpoint}`, options);
    const data = await res.json().catch(() => ({}));

    if (res.status === 401) {
      logout();
      return;
    }

    if (!res.ok) {
      throw new Error(data.message || `API error: ${res.status}`);
    }

    return data;
  } catch (err) {
    console.error(`Error calling ${endpoint}:`, err);
    throw err;
  }
}

// -----------------------------
// Load Dashboard Status
// -----------------------------
async function loadDashboardStatus() {
  try {
    const data = await apiRequest('users/dashboard/status', 'GET');
    if (!data) return;

    document.getElementById("totalUsers").textContent = data.totalUsers || "0";
    document.getElementById("newLeads").textContent = data.newLeads || "0";
    document.getElementById("newOrders").textContent = data.newOrders || "0";
    document.getElementById("revenue").textContent = `₹${data.revenue || "0"}`;
  } catch (err) {
    console.error("Error loading dashboard status:", err);
  }
}

// -----------------------------
// Load Recent Users Table
// -----------------------------
async function loadUsers() {
  try {
    const users = await apiRequest('users/recent', 'GET');
    if (!Array.isArray(users)) {
      console.error("Users data is not an array:", users);
      return;
    }

    console.log("Recent Users from DB:", users);
    const tbody = document.querySelector("#usersTable tbody");
    tbody.innerHTML = "";

    if (users.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" class="text-center">No users found</td></tr>`;
      return;
    }

    users.forEach((user, index) => {
      const row = document.createElement("tr");
      const srNo = index + 1;
      const userType = sessionStorage.getItem("userType");

      let actions = `
        <button class="btn btn-sm btn-outline-primary me-2 edit-btn" data-id="${user._id}">
          <i class="bi bi-pencil-square"></i>
        </button>
      `;

      if (userType === "superadmin") {
        actions += `
          <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${user._id}">
            <i class="bi bi-trash"></i>
          </button>
        `;
      }

      row.innerHTML = `
        <td>${srNo}</td>
        <td>${user.firstName + " " + user.lastName || "-"}</td>
        <td>${user.email || "-"}</td>
        <td>${user.mobile || "-"}</td>
        <td>${new Date(user.createdAt).toLocaleDateString()}</td>
        <td>${actions}</td>
      `;

      tbody.appendChild(row);

      // Fade-in animation
      setTimeout(() => row.classList.add("show"), 100 * index);
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    alert("Error fetching users. Check console for details.");
  }
}

// -----------------------------
// Logout Function
// -----------------------------
async function logout() {
  try {
    await apiRequest('auth/logout', 'POST');
  } catch (err) {
    console.error("Logout API failed:", err);
  }

  sessionStorage.clear();
  window.location.href = "/admin";
}

// -----------------------------
// On Page Load
// -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Ensure session exists
  const userType = sessionStorage.getItem("userType");
  if (!userType) {
    logout();
    return;
  }

  loadDashboardStatus();
  loadUsers();

  // Role-based UI restrictions
  if (userType === "admin") {
    document.querySelectorAll(".superadmin-only").forEach((el) => {
      el.style.display = "none";
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled");
    });
  }

  // Attach logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
  }
});
