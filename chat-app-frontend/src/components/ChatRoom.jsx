
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatRoom({ chat, user }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("joinRoom", chat.id);

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chat.id]);

  const sendMessage = () => {
    const msg = { chatId: chat.id, sender: user.name, text: input };
    socket.emit("sendMessage", msg);
    setInput("");
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <div key={i}>
            <b>{msg.sender}:</b> {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
