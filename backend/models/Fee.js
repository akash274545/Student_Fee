const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  amount: Number,
  date: { type: Date, default: Date.now },
  receiptPath: String
});

module.exports = mongoose.model("Fee", feeSchema);