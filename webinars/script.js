document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!phone || phone.length < 10 || !email.includes('@')) {
        alert('Please enter a valid phone number and email address.');
        return;
    }

    try {
        // Fetch user data from the local JSON file
        const response = await fetch('./webinars/users.json');
        const data = await response.json();

        // Check if the email and phone match any authorized user
        const user = data.authorizedUsers.find(
            u => u.Email === email && u.Phone === phone
        );

        if (user && user.Granted) {
            alert('Access Granted!');
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('webinar-section').style.display = 'block';
        } else {
            alert('Access Denied! Incorrect details or access not granted.');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        alert('An error occurred. Please try again later.');
    }
});
