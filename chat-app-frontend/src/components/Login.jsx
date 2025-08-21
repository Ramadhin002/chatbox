
// src/components/Login.jsx
import { useState } from "react";

export default function Login({ onLogin }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin({ username: name }); // store user object
    }
  };

  return (
    <div style={{
      display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"
    }}>
      <form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", margin: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 16px" }}>Enter</button>
      </form>
    </div>
  );
}
