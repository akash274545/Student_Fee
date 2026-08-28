const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  branch: { type: String, required: true },
});

module.exports = mongoose.model("Profile", profileSchema);
