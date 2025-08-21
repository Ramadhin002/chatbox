
const express = require("express");
const Chat = require("../models/Chat");
const router = express.Router();

// create private chat
router.post("/create", async (req, res) => {
  const { user1, user2 } = req.body;
  let chat = await Chat.findOne({ participants: { $all: [user1, user2] } });
  if (!chat) {
    chat = new Chat({ participants: [user1, user2], messages: [] });
    await chat.save();
  }
  res.json(chat);
});

// get chat messages
router.get("/:chatId", async (req, res) => {
  const chat = await Chat.findById(req.params.chatId).populate("messages.sender", "username");
  res.json(chat);
});

// save message
router.post("/:chatId/message", async (req, res) => {
  const { sender, text } = req.body;
  const chat = await Chat.findById(req.params.chatId);
  chat.messages.push({ sender, text });
  await chat.save();
  res.json(chat);
});

module.exports = router;
