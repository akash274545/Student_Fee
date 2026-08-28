const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  username: { type: String, required: true }, // linked to login username
  category: { type: String, required: true },
  filePath: { type: String, required: true },
  originalName: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Document", documentSchema);
