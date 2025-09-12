// Function to load dashboard stats (to be integrated with your API)
async function loadDashboardStats() {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin';
      return;
    }

    // Example API call - replace with your actual endpoint
    const res = await fetch('http://localhost:5000/api/dashboard/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (res.ok) {
      const data = await res.json();
      document.getElementById('totalUsers').textContent = data.totalUsers || '0';
      document.getElementById('newLeads').textContent = data.newLeads || '0';
      document.getElementById('newOrders').textContent = data.newOrders || '0';
      document.getElementById('revenue').textContent = `$${data.revenue || '0'}`;
    }
  } catch (error) {
    console.error('Error loading dashboard stats:', error);
  }
}

// Function to populate users table (to be integrated with your API)
async function loadUsers() {
  try {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin';
      return;
    }

    const res = await fetch('http://localhost:5000/api/users/recent', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('API error:', errorData);
      alert('Failed to fetch users: ' + (errorData.message || 'Unknown error'));
      return;
    }

    const users = await res.json();

    if (!Array.isArray(users)) {
      console.error('Users data is not an array:', users);
      return;
    }

    // Log all users to console for debugging
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
      console.log("fetched userType -- "+ userType);
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

// Load users on page load
loadUsers();


// Function to update profile based on role
function updateProfileBasedOnRole() {
    const userType = localStorage.getItem('userType');
    const name = localStorage.getItem('adminName') || 'Admin';
    
    const adminNameElement = document.getElementById('adminName');
    const userTypeElement = document.getElementById('userType');
    const profileIcon = document.querySelector('.profile i');
    const profileImage = document.querySelector('.profile img');
    
    if (adminNameElement) {
        adminNameElement.textContent = name;
    }
    
    if (userTypeElement) {
        userTypeElement.textContent = userType === 'superadmin' ? 'Super Administrator' : 'Administrator';
    }
    
    // Change profile icon or badge based on role
    if (userType === 'superadmin') {
        // For superadmin - use crown icon or different color
        if (profileIcon) {
            profileIcon.classList.remove('bi-person-circle');
            profileIcon.classList.add('bi-shield-fill', 'text-warning');
        }
        // Or add a badge to the profile image
        if (profileImage) {
            profileImage.classList.add('superadmin-badge');
        }
    } else {
        // For regular admin
        if (profileIcon) {
            profileIcon.classList.remove('bi-shield-fill', 'text-warning');
            profileIcon.classList.add('bi-person-circle');
        }
        if (profileImage) {
            profileImage.classList.remove('superadmin-badge');
        }
    }
}

// Call this function when dashboard loads
document.addEventListener('DOMContentLoaded', function() {
    updateProfileBasedOnRole();
    
    // Also add role-based UI restrictions if needed
    const userType = localStorage.getItem('userType');
    
    if (userType === 'admin') {
        // Hide or disable superadmin-only features
        const superadminElements = document.querySelectorAll('.superadmin-only');
        superadminElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Disable delete buttons for regular admins
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('disabled');
        });
    }
});