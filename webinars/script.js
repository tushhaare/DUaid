document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!phone || !email) {
        alert('Please provide valid phone and email.');
        return;
    }

    try {
        const response = await fetch('users.json');
        const data = await response.json();

        const user = data.authorizedUsers.find(u => u.email === email && u.phone === phone);

        if (user && user.granted) {
            alert('Access Granted!');
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('webinar-section').style.display = 'block';
        } else {
            alert('Access Denied! Incorrect credentials or access not granted.');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        alert('An error occurred. Please try again later.');
    }
});
