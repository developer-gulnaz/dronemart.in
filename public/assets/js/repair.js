document.addEventListener('DOMContentLoaded', async () => {
    let profile;
    try {
        const profileRes = await fetch("/api/users/profile", { credentials: "include" });
        if (!profileRes.ok) throw new Error("Not logged in");
        profile = await profileRes.json();
    } catch (err) {
        console.error("Failed to fetch profile:", err);      
        profile = {};
    }

    const form = document.getElementById('droneRepairForm');
    const submitBtn = form.querySelector('button[type="button"], button[type="submit"]');
    const confirmModal = document.getElementById('confirmModal');

    // --------------------------
    // 🔹 Autofill fields
    // --------------------------
    if (profile) {
        if (profile.firstName) form.querySelector('input[name="name"]').value = profile.firstName + " " + profile.lastName;
        if (profile.email) form.querySelector('input[name="email"]').value = profile.email;
        if (profile.mobile) form.querySelector('input[name="phone"]').value = profile.mobile;
        if (profile.city) form.querySelector('input[name="city"]').value = profile.city;
        if (profile.state) form.querySelector('select[name="state"]').value = profile.state;
    }

    // --------------------------
    // 🔹 Submit form
    // --------------------------
    async function submitForm(event) {
        event.preventDefault();

        const fd = new FormData(form);

        // Validate required fields
        const requiredFields = ['name', 'email', 'phone', 'state', 'brand', 'modelName', 'description'];
        for (const field of requiredFields) {
            if (!fd.get(field)) {
                window.showMessageDialog(`Please fill in the ${field} field.`, "error");
                return;
            }
        }

        // Limit uploads
        const files = form.querySelector('input[name="attachments"]').files;
        if (files.length > 5) {
            alert('You can upload a maximum of 5 files.');
            return;
        }

        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Submitting...';

            const res = await fetch('/api/repairs', {
                method: 'POST',
                body: fd
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to submit request.');

            // Success
            window.showMessageDialog("✅ Repair request submitted successfully! ID: " + (data.repair?._id || ""), "success");
            form.reset();

        } catch (err) {
            console.error('Repair form submission failed:', err);
            alert('❌ Error: ' + err.message);
            window.showMessageDialog(`❌ Error: ` + err.message, "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Request';
        }
    }

    // --------------------------
    // 🔘 Attach submit handlers
    // --------------------------
    form.addEventListener('submit', submitForm);

    const manualBtn = form.querySelector('button[type="button"]');
    if (manualBtn) {
        manualBtn.addEventListener('click', () => {
            form.requestSubmit(); // Trigger submit event
        });
    }
});
