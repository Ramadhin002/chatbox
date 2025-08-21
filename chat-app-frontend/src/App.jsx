
import { useState } from "react";
import Login from "./components/Login";
import ChatList from "./components/ChatList";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ChatList onSelectChat={setSelectedChat} />
      {selectedChat ? (
        <ChatRoom chat={selectedChat} user={user} />
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h2>Select a chat</h2>
        </div>
      )}
    </div>
  );
}

export default App;
