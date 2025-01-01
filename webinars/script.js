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
