
// src/components/ChatList.jsx
export default function ChatList({ onSelectChat }) {
  const dummyChats = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  return (
    <div style={{
      width: "200px", borderRight: "1px solid #ccc", padding: "10px"
    }}>
      <h3>Chats</h3>
      {dummyChats.map((chat) => (
        <div
          key={chat.id}
          style={{ padding: "8px", cursor: "pointer" }}
          onClick={() => onSelectChat(chat)}
        >
          {chat.name}
        </div>
      ))}
    </div>
  );
}
