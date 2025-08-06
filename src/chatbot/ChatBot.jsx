// src/chatbot/ChatBot.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBot() {
const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    try {
      const resp = await axios.post("http://localhost:8080/api/chat", {
        message: input,
      });
      setResponse(resp.data.reply);
      setInput("");
    } catch (error) {
      setResponse("Error occurred while sending message");
    }
  };

  return (
    <div>
      <div className="chatbot-greeting">
        <p>Hello, Try me</p><br/>
        I'm NDP,Your Admission Assistant
      </div>
      <div className="chatbot-input-group">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          className="chatbot-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend} className="chatbot-button">
          Send
        </button>
      </div>
      <div className="chatbot-response-label">Response:</div>
      <div className="chatbot-response-text">{response}</div>
    </div>
  );
}
