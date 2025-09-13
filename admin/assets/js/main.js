// Optional: reusable API function for login (no token needed)
async function apiRequestLogin(endpoint, body) {
    const api_url = "/api/" + endpoint; // production path
    // const api_url = "http://localhost:5000/api/" + endpoint; // local testing

    try {
        const res = await fetch(api_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

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

// Login form submit handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    try {
        const data = await apiRequestLogin('auth/login', { email, password });

        if (data.token) {
            // Save data to localStorage
            localStorage.setItem('adminToken', data.token);
            localStorage.setItem('userType', data.userType || 'admin');
            localStorage.setItem('adminName', data.name || 'Admin');

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (err) {
        alert('Server error. Please try again later.');
    }
});
