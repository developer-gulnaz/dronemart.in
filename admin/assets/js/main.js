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
// Login Form Submit Handler
// -----------------------------
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const data = await apiRequest('auth/login', 'POST', { email, password });

      // ✅ Save session info
      sessionStorage.setItem('userType', data.userType || 'admin');
      sessionStorage.setItem('name', data.email.split('@')[0] || 'Admin');

      // Redirect to dashboard
      window.location.href = 'dashboard.html';
    } catch (err) {
      alert(err.message || 'Login failed. Please try again.');
    }
  });
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

  // Clear client-side session
  sessionStorage.clear();
  window.location.href = '/admin';
}

// -----------------------------
// Update User Status Example
// -----------------------------
async function updateUserStatus(userId, statusTag) {
  try {
    const data = await apiRequest(`users/${userId}/status`, 'PATCH', { statusTag });

    console.log('User updated:', data.user);
    alert('User status updated successfully!');
  } catch (err) {
    console.error(err);
    alert('Failed to update user status.');
  }
}


