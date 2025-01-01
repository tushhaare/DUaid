// Hardcoded user data
const authorizedUsers = [
[{ Phone: "9468538013", Email: "jainj0624@gmail.com", Granted: true },
]
 document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!phone || phone.length < 10 || !email.includes('@')) {
        alert('Please enter a valid phone number and email address.');
        return;
    }

    // Check if the email and phone match any authorized user
    const user = authorizedUsers.find(
        u => u.Email === email && u.Phone === phone
    );

    if (user && user.Granted) {
        alert('Access Granted!');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('webinar-section').style.display = 'block';
    } else {
        alert('Access Denied! Incorrect details or access not granted.');
    }
});
