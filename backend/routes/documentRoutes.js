const express = require("express");
const multer = require("multer");
const path = require("path");
const Document = require("../models/Document");

const router = express.Router();

// storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure uploads/ folder exists
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// upload document
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { username, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const doc = new Document({
      username,
      category,
      filePath: req.file.path,
      originalName: req.file.originalname,
    });

    await doc.save();
    res.json({ success: true, document: doc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get documents by username + category
router.get("/:username/:category", async (req, res) => {
  try {
    const { username, category } = req.params;
    const docs = await Document.find({ username, category }).sort({
      uploadedAt: -1,
    });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
