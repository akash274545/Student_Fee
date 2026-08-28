const express = require("express");
const User = require("../models/User");
const router = express.Router();

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const { name, mobile, username, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ error: "Username already exists." });

    const user = new User({ name, mobile, username, password });
    await user.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (!user)
      return res.status(400).json({ error: "Invalid credentials" });

    res.json({
      success: true,
      user: {
        name: user.name,
        username: user.username
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
