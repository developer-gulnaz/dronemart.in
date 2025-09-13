
const api_url = "/api/"; //  production
// const api_url = "http://localhost:5000/api/"; // local 

async function apiRequest(endpoint, method = 'GET', body = null) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = '/admin';
        return;
    }

    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    if (body) options.body = JSON.stringify(body);

    try {
        const res = await fetch(api_url + endpoint, options);

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `API error: ${res.status}`);
        }

        return await res.json();
    } catch (err) {
        console.error(`Error calling ${endpoint}:`, err);
        throw err;
    }
}

// ==============================
// Load Dashboard Stats
// ==============================
async function loadDashboardStats() {
    try {
        const data = await apiRequest('dashboard/stats');
        if (!data) return;

        document.getElementById('totalUsers').textContent = data.totalUsers || '0';
        document.getElementById('newLeads').textContent = data.newLeads || '0';
        document.getElementById('newOrders').textContent = data.newOrders || '0';
        document.getElementById('revenue').textContent = `$${data.revenue || '0'}`;
    } catch (error) {
        console.error('Error loading dashboard stats:', error);
    }
}

// ==============================
// Load Users Table
// ==============================
async function loadUsers() {
    try {
        const users = await apiRequest('users/recent');
        if (!Array.isArray(users)) {
            console.error('Users data is not an array:', users);
            return;
        }

        console.log("Recent Users from DB:", users);

        const tbody = document.querySelector('#usersTable tbody');
        tbody.innerHTML = '';

        if (users.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" class="text-center">No users found</td></tr>`;
            return;
        }

        users.forEach((user, index) => {
            const row = document.createElement('tr');
            const srNo = index + 1;
            const userType = localStorage.getItem('userType');

            let actions = `
                <button class="btn btn-sm btn-outline-primary me-2 edit-btn" data-id="${user._id}">
                    <i class="bi bi-pencil-square"></i>
                </button>
            `;

            if (userType === 'superadmin') {
                actions += `
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-id="${user._id}">
                        <i class="bi bi-trash"></i>
                    </button>
                `;
            }

            row.innerHTML = `
                <td>${srNo}</td>
                <td>${user.name || '-'}</td>
                <td>${user.email || '-'}</td>
                <td>${user.mobile || '-'}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>${actions}</td>
            `;

            tbody.appendChild(row);

            // Fade-in animation
            setTimeout(() => row.classList.add('show'), 100 * index);
        });

    } catch (err) {
        console.error('Error fetching users:', err);
        alert('Error fetching users. Check console for details.');
    }
}

// ==============================
// Update Profile Based on Role
// ==============================
function updateProfileBasedOnRole() {
    const userType = localStorage.getItem('userType');
    const name = localStorage.getItem('adminName') || 'Admin';
    
    const adminNameElement = document.getElementById('adminName');
    const userTypeElement = document.getElementById('userType');
    const profileIcon = document.querySelector('.profile i');
    const profileImage = document.querySelector('.profile img');
    
    if (adminNameElement) adminNameElement.textContent = name;
    if (userTypeElement) userTypeElement.textContent = userType === 'superadmin' ? 'Super Administrator' : 'Administrator';
    
    if (userType === 'superadmin') {
        if (profileIcon) {
            profileIcon.classList.remove('bi-person-circle');
            profileIcon.classList.add('bi-shield-fill', 'text-warning');
        }
        if (profileImage) profileImage.classList.add('superadmin-badge');
    } else {
        if (profileIcon) {
            profileIcon.classList.remove('bi-shield-fill', 'text-warning');
            profileIcon.classList.add('bi-person-circle');
        }
        if (profileImage) profileImage.classList.remove('superadmin-badge');
    }
}

// ==============================
// Role-based UI restrictions
// ==============================
function applyRoleRestrictions() {
    const userType = localStorage.getItem('userType');

    if (userType === 'admin') {
        // Hide superadmin-only elements
        const superadminElements = document.querySelectorAll('.superadmin-only');
        superadminElements.forEach(el => el.style.display = 'none');

        // Disable delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
    }
}

// ==============================
// Initialize
// ==============================
document.addEventListener('DOMContentLoaded', function() {
    updateProfileBasedOnRole();
    applyRoleRestrictions();
    loadDashboardStats();
    loadUsers();
});
