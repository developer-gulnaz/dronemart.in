function updateProfileBasedOnRole() {
    const userType = sessionStorage.getItem("userType");
    const name = sessionStorage.getItem("name") || "Admin";

    const adminNameElement = document.getElementById("adminName");
    const userTypeElement = document.getElementById("userType");
    const profileIcon = document.querySelector(".profile i");
    const profileImage = document.querySelector(".profile img");

    if (adminNameElement) adminNameElement.textContent = name;
    if (userTypeElement)
        userTypeElement.textContent =
            userType === "superadmin" ? "Super Administrator" : "Administrator";

    if (profileImage) {
        if (userType === "superadmin") {
            profileImage.src = `https://ui-avatars.com/api/?name=SA&background=random`;
        } else if (userType === "admin") {
            profileImage.src = `https://ui-avatars.com/api/?name=A&background=random`;
        } else {
            profileImage.src = `https://ui-avatars.com/api/?name=G&background=random`;
        }
    }

    // Optional: keep role-specific icon badges
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

// On Page Load
document.addEventListener("DOMContentLoaded", function () {
    // Ensure session exists
    const isUserLogin = sessionStorage.getItem("userType");
    if (!isUserLogin) {
        logout();
        return;
    }
    updateProfileBasedOnRole();

    // Set admin info from sessionStorage
    const adminName = sessionStorage.getItem('name') || 'Admin';
    const userType = sessionStorage.getItem('userType') || 'Administrator';

    document.getElementById('adminName').textContent = adminName;
    document.getElementById('userType').textContent = userType;

    // Elements
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const hamburger = document.getElementById('hamburger');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');
    const logoutBtn = document.getElementById('logoutBtn');

    // Unified checkWidth function
    function checkWidth() {
        if (window.innerWidth <= 992) {
            // Mobile: hide sidebar completely
            sidebar.classList.remove('collapsed', 'active');
            mainContent.classList.remove('expanded');
            hamburger.style.display = 'block';
        } else {
            // Desktop: collapsed sidebar by default
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            hamburger.style.display = 'none';
        }
    }

    // Run on load and resize
    checkWidth();
    window.addEventListener('resize', checkWidth);

    // Desktop sidebar toggle (collapsed)
    sidebarToggle.addEventListener('click', function () {
        if (window.innerWidth > 992) {
            sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded');

            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.classList.remove('bi-arrow-left-circle');
                icon.classList.add('bi-arrow-right-circle');
            } else {
                icon.classList.remove('bi-arrow-right-circle');
                icon.classList.add('bi-arrow-left-circle');
            }
        } else {
            // Mobile back arrow closes sidebar
            sidebar.classList.remove('active');
            hamburger.style.display = 'block';
        }
    });

    // Hamburger opens sidebar on mobile
    hamburger.addEventListener('click', function () {
        sidebar.classList.add('active');
        hamburger.style.display = 'none';
    });

    // Overlay click closes sidebar on mobile
    sidebarOverlay.addEventListener('click', function () {
        sidebar.classList.remove('active');
        hamburger.style.display = 'block';
    });

    // Profile dropdown toggle
    profileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function (e) {
        if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', function () {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('adminToken');
            sessionStorage.removeItem('userType');
            sessionStorage.removeItem('name');
            window.location.href = '/admin';
        }
    });
});


// 🧩 Modern Center Dialog Box
window.showDialog = function (message, type = "info") {
    // Overlay background
    const overlay = document.createElement("div");
    overlay.className = "dialog-overlay";
    Object.assign(overlay.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.4)",
        zIndex: "9998",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: "0",
        transition: "opacity 0.3s ease",
    });

    // Dialog box
    const dialog = document.createElement("div");
    dialog.className = "dialog-box";
    dialog.textContent = message;

    const colors = {
        success: "#4caf50",
        error: "#f44336",
        info: "#2196f3",
    };

    Object.assign(dialog.style, {
        background: "#fff",
        borderRadius: "12px",
        padding: "24px 28px",
        color: "#333",
        fontSize: "16px",
        fontWeight: "500",
        maxWidth: "400px",
        width: "90%",
        textAlign: "center",
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
        transform: "scale(0.9)",
        opacity: "0",
        transition: "all 0.25s ease",
        borderTop: `6px solid ${colors[type] || colors.info}`,
    });

    // ✅ Add icon or color line
    const icon = document.createElement("div");
    icon.innerHTML =
        type === "success"
            ? "✅"
            : type === "error"
                ? "❌"
                : "ℹ️";
    Object.assign(icon.style, {
        fontSize: "28px",
        marginBottom: "10px",
    });

    const msg = document.createElement("div");
    msg.textContent = message;

    dialog.textContent = "";
    dialog.appendChild(icon);
    dialog.appendChild(msg);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    // Fade in
    setTimeout(() => {
        overlay.style.opacity = "1";
        dialog.style.opacity = "1";
        dialog.style.transform = "scale(1)";
    }, 10);

    // Auto close after 2.5s
    setTimeout(() => {
        dialog.style.opacity = "0";
        dialog.style.transform = "scale(0.9)";
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 300);
    }, 1500);
};
