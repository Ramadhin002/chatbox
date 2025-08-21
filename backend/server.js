
import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/chatapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Message Schema
const messageSchema = new mongoose.Schema({
  chatId: String,
  sender: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", messageSchema);

// Socket.IO
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join private room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });

  // Send + Save message
  socket.on("sendMessage", async (msg) => {
    const newMsg = new Message(msg);
    await newMsg.save();
    io.to(msg.chatId).emit("receiveMessage", newMsg); // broadcast
  });
});

server.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
