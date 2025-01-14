const express = require("express");
const Message = require("../models/Message");
const router = express.Router();

// Get messages for a specific user
router.get("/users/:id/messages", async (req, res) => {
    try {
        const userId = req.params.id;
        const messages = await Message.find({
            $or: [{ sender: userId }, { receiver: userId }],
        }).populate("sender receiver", "name avatar");
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
});

// Send a message
router.post("/messages", async (req, res) => {
    try {
        const { sender, receiver, text } = req.body;
        const message = new Message({ sender, receiver, text });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: "Error sending message" });
    }
});

module.exports = router;
