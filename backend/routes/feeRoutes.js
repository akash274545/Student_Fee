const express = require("express");
const multer = require("multer");
const Fee = require("../models/Fee");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Adds timestamp + original name
  }
});

const upload = multer({ storage: storage });

router.post("/upload", upload.single("receipt"), async (req, res) => {
  console.log('Uploaded file:', req.file); // Check file details in terminal
  const { studentId, amount } = req.body;
  const receiptPath = req.file.path;
  const fee = new Fee({ studentId, amount, receiptPath });
  await fee.save();
  res.json({ message: "Fee recorded with receipt." });
});

router.get("/:studentId", async (req, res) => {
  const fee = await Fee.find({ studentId: req.params.studentId });
  res.json(fee);
});

module.exports = router;