import React, { useState } from "react";
import ChatBot from "./ChatBot";

export default function ChatPopup() {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          style={{
            padding: "12px 18px",
            borderRadius: "30px",
            background: "#0044cc",
            color: "#fff",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          💬 Chat with us
        </button>
      )}

      {visible && (
        <div
          style={{
            width: 350,
            height: 500,
            backgroundColor: "#fff",
            borderRadius: 12,
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "#0044cc",
              color: "#fff",
              padding: "10px 15px",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Chat with NDP</span>
            <button
              onClick={() => setVisible(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
          <ChatBot />
        </div>
      )}
    </div>
  );
}
