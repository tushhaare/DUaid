// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.database(app);

// References
const chatbox = document.getElementById('chatbox');
const chatContainer = document.createElement('div');
chatContainer.setAttribute('id', 'chat-messages');
document.getElementById('chatbox-container').appendChild(chatContainer);
const sendBtn = document.getElementById('send-btn');

// Send Chat Message
sendBtn.addEventListener('click', () => {
    const message = chatbox.value.trim();
    if (message) {
        const timestamp = new Date().toISOString();
        db.ref('messages').push({
            username: 'Anonymous', // Replace with user authentication if needed
            message,
            timestamp
        });
        chatbox.value = '';
    } else {
        alert('Please enter a message before sending.');
    }
});

// Display Chat Messages in Real-Time
db.ref('messages').on('child_added', (snapshot) => {
    const data = snapshot.val();
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
});
