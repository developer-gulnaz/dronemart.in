// ✅ API Base URL (change in one place for local/prod)
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "/api";

document.addEventListener("DOMContentLoaded", () => {
  const name = localStorage.getItem("name");
  const userType = localStorage.getItem("userType");
  const profileImg = document.querySelector("#profileToggle img");

  if (userType === "superadmin") {
    adminName.textContent = name || "Super Admin"; // from DB or fallback
    userType.textContent = "Super Admin";
    profileImg.src = `https://ui-avatars.com/api/?name=SA&background=random`;
  } else if (userType === "admin") {
    adminName.textContent = name || "Admin"; // from DB or fallback
    userType.textContent = "Admin";
    profileImg.src = `https://ui-avatars.com/api/?name=A&background=random`;
  } else {
    adminName.textContent = name || "User";
    userType.textContent = "Guest";
    profileImg.src = `https://ui-avatars.com/api/?name=G&background=random`;
  }
});

// Function to load dashboard status (from API)
async function loadDashboardstatus() {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin";
      return;
    }

    const res = await fetch(`${API_BASE_URL}/users/dashboard/status`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const data = await res.json();
      document.getElementById("totalUsers").textContent = data.totalUsers || "0";
      document.getElementById("newLeads").textContent = data.newLeads || "0";
      document.getElementById("newOrders").textContent = data.newOrders || "0";
      document.getElementById("revenue").textContent = `$${data.revenue || "0"}`;
    }
  } catch (error) {
    console.error("Error loading dashboard status:", error);
  }
}

// Function to populate users table (recent users)
async function loadUsers() {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin";
      return;
    }

    const res = await fetch(`${API_BASE_URL}/users/recent`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API error:", errorData);
      alert("Failed to fetch users: " + (errorData.message || "Unknown error"));
      return;
    }

    const users = await res.json();

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
      const userType = localStorage.getItem("userType");

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
        <td>${user.name || "-"}</td>
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

// Load users & dashboard stats on page load
document.addEventListener("DOMContentLoaded", function () {
  loadDashboardstatus();
  loadUsers();
  updateProfileBasedOnRole();

  // Role-based UI restrictions
  const userType = localStorage.getItem("userType");
  if (userType === "admin") {
    document.querySelectorAll(".superadmin-only").forEach((el) => {
      el.style.display = "none";
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.disabled = true;
      btn.classList.add("disabled");
    });
  }
});

// Function to update profile based on role
function updateProfileBasedOnRole() {
  const userType = localStorage.getItem("userType");
  const name = localStorage.getItem("name") || "Admin";

  const adminNameElement = document.getElementById("adminName");
  const userTypeElement = document.getElementById("userType");
  const profileIcon = document.querySelector(".profile i");
  const profileImage = document.querySelector(".profile img");

  if (adminNameElement) adminNameElement.textContent = name;
  if (userTypeElement)
    userTypeElement.textContent =
      userType === "superadmin" ? "Super Administrator" : "Administrator";

  if (userType === "superadmin") {
    if (profileIcon) {
      profileIcon.classList.remove("bi-person-circle");
      profileIcon.classList.add("bi-shield-fill", "text-warning");
    }
    if (profileImage) profileImage.classList.add("superadmin-badge");
  } else {
    if (profileIcon) {
      profileIcon.classList.remove("bi-shield-fill", "text-warning");
      profileIcon.classList.add("bi-person-circle");
    }
    if (profileImage) profileImage.classList.remove("superadmin-badge");
  }
}
