const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Register a new user
router.post("/users", async (req, res) => {
    try {
        const { name, avatar } = req.body;
        const user = new User({ name, avatar });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error creating user" });
    }
});

module.exports = router;
