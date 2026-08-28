const express = require("express");
const Profile = require("../models/Profile");
const router = express.Router();

// create or update profile
router.post("/", async (req, res) => {
  try {
    const { username, name, branch } = req.body;

    const profile = await Profile.findOneAndUpdate(
      { username },
      { name, branch },
      { upsert: true, new: true }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
