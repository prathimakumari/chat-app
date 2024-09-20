document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("clear-btn").addEventListener("click", clearChat);
document.getElementById("save-btn").addEventListener("click", saveChat);
document
  .getElementById("media-input")
  .addEventListener("change", handleMediaUpload);

document
  .getElementById("message-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

// Array of random responses for interaction
const botResponses = [
  "That's interesting!",
  "Can you tell me more?",
  "I agree with you.",
  "That's a great point!",
  "I'm here to help. What's next?",
  "Thanks for sharing!",
  "Let me think about that...",
  "Sounds good!",
  "That makes sense.",
  "I see what you're saying.",
];

function sendMessage() {
  const inputBox = document.getElementById("message-input");
  const messageText = inputBox.value.trim();

  if (messageText === "") return;

  appendMessage(messageText, "sent");

  inputBox.value = "";

  // Simulate a response based on the user's message
  setTimeout(() => {
    simulateResponse(messageText);
  }, 1000);
}

// Function to simulate a dynamic response
function simulateResponse(userMessage) {
  let response;

  // Basic keyword matching for more dynamic responses
  if (userMessage.includes("hello") || userMessage.includes("hi")) {
    response = "Hello! How can I assist you today?";
  } else if (
    userMessage.includes("thanks") ||
    userMessage.includes("thank you")
  ) {
    response = "You're welcome!";
  } else if (userMessage.includes("help")) {
    response = "I'm here to help. What do you need assistance with?";
  } else {
    // Pick a random response from the botResponses array
    response = botResponses[Math.floor(Math.random() * botResponses.length)];
  }

  appendMessage(response, "received");
}

function appendMessage(text, type) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", type);

  // If it's a received message, style it more attractively
  if (type === "received") {
    messageElement.style.backgroundColor = "#f1f1f1";
    messageElement.style.color = "#333";
    messageElement.style.borderRadius = "15px";
    messageElement.style.maxWidth = "70%";
  }

  messageElement.textContent = text;

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => messageElement.remove());
  messageElement.appendChild(deleteBtn);

  chatBox.appendChild(messageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleMediaUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileType = file.type.split("/")[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const chatBox = document.getElementById("chat-box");
    const mediaElement = document.createElement("div");
    mediaElement.classList.add("message", "sent");

    if (fileType === "image") {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.style.maxWidth = "200px";
      mediaElement.appendChild(img);
    } else if (fileType === "video") {
      const video = document.createElement("video");
      video.src = e.target.result;
      video.controls = true;
      video.style.maxWidth = "200px";
      mediaElement.appendChild(video);
    }

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => mediaElement.remove());
    mediaElement.appendChild(deleteBtn);

    chatBox.appendChild(mediaElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  };
  reader.readAsDataURL(file);
}

function clearChat() {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = "";
}

function saveChat() {
  const chatBox = document.getElementById("chat-box");
  const chatContent = chatBox.innerHTML;
  const blob = new Blob([chatContent], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chat.html";
  link.click();
}
