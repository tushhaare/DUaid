// Import Firebase (if using npm)
// import { initializeApp } from "firebase/app";
// import { getDatabase, ref, get } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";

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

// Initialize Firebase (only once)
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Form Submit Listener
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();

    // Basic validation for phone and email
    if (!phone || phone.length < 10 || !email.includes('@')) {
        alert('Please enter a valid phone number and email address.');
        return;
    }

    try {
        // Encode email to match Firebase key requirements
        const encodedEmail = email.replace(/\./g, ','); // Replace '.' with ','

        // Check if the email exists in the database
        const snapshot = await get(ref(db, `authorizedUsers/${encodedEmail}`));

        if (snapshot.exists()) {
            const userData = snapshot.val();

            // Match the phone number and granted access
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
