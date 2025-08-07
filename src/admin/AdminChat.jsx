// src/AdminChat.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminChat() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/chat/admin/chats')
      .then(res => setChats(res.data))
      .catch(err => console.error(err));
  }, []);
  return (
    <div>
      <h2>Chat History Admin View</h2>
      <button onClick={() => window.open('http://localhost:8080/api/chat/admin/export','_blank')}>
        Download CSV
      </button>
      <table>
        <thead>
          <tr><th>ID</th><th>User ID</th><th>Sender</th><th>Timestamp</th><th>Message</th></tr>
        </thead>
        <tbody>
          {chats.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.userId}</td><td>{c.sender}</td><td>{c.timestamp}</td><td>{c.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
