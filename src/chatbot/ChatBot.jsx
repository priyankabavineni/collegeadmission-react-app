import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function generateUserId() {
  let id = localStorage.getItem("chat_user_id");
  if (!id) {
    id = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem("chat_user_id", id);
  }
  return id;
}

export default function ChatBot() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [userId] = useState(generateUserId());
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Add initial greeting when component mounts
  useEffect(() => {
    const greeting = `
      We have maintained <b>100% Placements</b> (For Registered and Eligible Students) for last 18 years consistently.<br /><br />
      20,000+ students from 35+ countries have joined us.<br /><br />
      Got a query? I am here to assist you.<br /><br />
      📞 Contact: 7815901716<br />
      (Available: Mon to Sat, 9 am to 5 pm)
    `;
    setChatLog([{ sender: "BOT", message: greeting, timestamp: new Date().toISOString() }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  const addBotMessage = (msg) => {
    setChatLog((prev) => [
      ...prev,
      { sender: "BOT", message: msg, timestamp: new Date().toISOString() },
    ]);
  };

  const addUserMessage = (msg) => {
    setChatLog((prev) => [
      ...prev,
      { sender: "USER", message: msg, timestamp: new Date().toISOString() },
    ]);
  };

  const handleSend = async () => {
  if (!input.trim() || loading) return;

  const userText = input.trim();
  setInput("");
  setLoading(true);
  addUserMessage(userText);

  try {
    const res = await axios.post("/api/chat", {
      message: userText,
      userId,
    });
    addBotMessage(res.data.reply);
  } catch (err) {
    addBotMessage("Sorry, something went wrong. Please try again.");
  }
  setLoading(false);
};


  return (
    <div className="chat-container">
      <div className="chat-header">Chat with NDP</div>

      <div className="chat-messages">
        {chatLog.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-message ${msg.sender === "USER" ? "user" : "bot"}`}
          >
            <div
              className="message-text"
              dangerouslySetInnerHTML={{ __html: msg.message }}
            />
            <div className="timestamp">
              {new Date(msg.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          placeholder="Type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={!input.trim() || loading}>
          Send
        </button>
      </div>

      {/* Styles */}
      <style jsx>{`
        .chat-container {
          max-width: 400px;
          height: 600px;
          display: flex;
          flex-direction: column;
          border: 1px solid #ddd;
          border-radius: 10px;
          background: #fff;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .chat-header {
          background-color: #007bff;
          color: white;
          padding: 12px 16px;
          font-weight: bold;
          font-size: 18px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          user-select: none;
        }

        .chat-messages {
          flex: 1;
          padding: 12px 16px;
          overflow-y: auto;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-message {
          max-width: 70%;
          padding: 10px 14px;
          border-radius: 18px;
          position: relative;
          word-wrap: break-word;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          font-size: 14px;
          line-height: 1.4;
        }

        .chat-message.bot {
          align-self: flex-start;
          background: #f9f9f9;
          color: #222;
          border-top-left-radius: 4px;
        }

        .chat-message.user {
          align-self: flex-end;
          background: #dcf8c6;
          color: #111;
          border-top-right-radius: 4px;
        }

        .timestamp {
          font-size: 10px;
          color: #666;
          margin-top: 4px;
          text-align: right;
          user-select: none;
        }

        .chat-input-area {
          display: flex;
          padding: 10px 16px;
          border-top: 1px solid #ddd;
          background: #fafafa;
          border-bottom-left-radius: 10px;
          border-bottom-right-radius: 10px;
        }

        .chat-input-area input {
          flex: 1;
          padding: 10px 14px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 20px;
          outline: none;
          transition: border-color 0.3s ease;
        }
        .chat-input-area input:focus {
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        .chat-input-area button {
          margin-left: 10px;
          padding: 10px 20px;
          background-color: #007bff;
          border: none;
          border-radius: 20px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .chat-input-area button:disabled {
          background-color: #a0cfff;
          cursor: not-allowed;
        }
        .chat-input-area button:not(:disabled):hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
