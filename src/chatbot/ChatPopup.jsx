// src/chatbot/ChatBubble.jsx
import React, { useState } from "react";
import ChatBot from "./ChatBot"; // Import your chatbot UI

export default function ChatPopup() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="chatbubble-container">
      <div className="chatbubble-bubble">
        <button
          className="chatbubble-close-btn"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
        <ChatBot />
      </div>
    </div>
  );
}

