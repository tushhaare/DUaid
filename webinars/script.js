// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAMN3DLIbR62qCmxlhSg4yL0-RVFPOlB-k",
    authDomain: "webinarchats-duaid.firebaseapp.com",
    databaseURL: "https://webinarchats-duaid-default-rtdb.firebaseio.com",
    projectId: "webinarchats-duaid",
    storageBucket: "webinarchats-duaid.firebasestorage.app",
    messagingSenderId: "896959903849",
    appId: "1:896959903849:web:d5dfee182b5328b3490af8",
    measurementId: "G-07BHGP84DS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

// Form Submit Listener
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!phone || phone.length < 10 || !email.includes('@')) {
        alert('Please enter a valid phone number and email address.');
        return;
    }

    try {
        // Check if the email exists in the database
        const snapshot = await db.ref(`authorizedUsers/${email}`).get();

        if (snapshot.exists()) {
            const userData = snapshot.val();
            
            // Match the phone number
            if (userData.phone === phone && userData.granted) {
                alert('Access Granted! Redirecting...');
                
                // Hide login section and show webinar section
                document.getElementById('login-section').style.display = 'none';
                document.getElementById('webinar-section').style.display = 'block';
            } else {
                alert('Access Denied! Phone number does not match or access is not granted.');
            }
        } else {
            alert('Access Denied! Email is not authorized.');
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        alert('An error occurred while verifying your details. Please try again later.');
    }
});
