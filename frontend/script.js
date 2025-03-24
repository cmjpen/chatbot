let chatBox = document.getElementById("chat-box");
let userInput = document.getElementById("user-input");

// Generate a session ID if one doesn't already exist in localStorage
function getSessionId() {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      // Create a simple session id (could be replaced with a more robust solution)
      sessionId = Date.now().toString() + Math.random().toString(36).substring(2);
      localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  }
  
const sessionId = getSessionId();
const sendBtn = document.getElementById("send-btn");

async function sendMessage() {
    let input = userInput.value.trim();
    if (input === "") return;

    // Display user message
    addMessage("user", input);
    userInput.value = "";

    // Fetch response from backend
    let response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            messages: [{ role: "user", content: input }], 
            session_id: sessionId 
        })
    });

    let data = await response.json();
    addMessage("bot", data.response);
}

// Function to add messages
function addMessage(role, text) {
    let messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role === "user" ? "user-message" : "bot-message");
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);

    // Auto-scroll to latest message
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to resize the textarea to fit content
function resizeTextarea() {
    // Reset the height to auto so it adjusts based on the content
    userInput.style.height = "auto"; 

    // Only increase the height if the content exceeds the current height
    if (userInput.scrollHeight > userInput.clientHeight) {
        userInput.style.height = userInput.scrollHeight + "px"; // Set height to scrollHeight
    }
}

// Listen for input event to resize the textarea dynamically
userInput.addEventListener("input", resizeTextarea);

// Allow sending message with Enter key
function handleKeyPress(event) {
    if (event.key === "Enter") sendMessage();
}

// Add event listener for handling Shift + Enter
userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();  // Prevent default Enter behavior (sending the message)
        sendMessage(); // Send message
    }
});
