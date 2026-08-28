const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded files (PDF, JPG, PNG, etc.)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        res.set("Content-Type", "image/jpeg");
      } else if (filePath.endsWith(".png")) {
        res.set("Content-Type", "image/png");
      } else if (filePath.endsWith(".pdf")) {
        res.set("Content-Type", "application/pdf");
      } else {
        res.set("Content-Type", "application/octet-stream");
      }
    },
  })
);

// ===============================
// ROUTES IMPORT
// ===============================
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const documentRoutes = require("./routes/documentRoutes");

// OLD ROUTES (Keep only if still needed)
const studentRoutes = require("./routes/studentRoutes");
const feeRoutes = require("./routes/feeRoutes");

// ===============================
// USE ROUTES
// ===============================
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/documents", documentRoutes);

// OLD (optional — remove if not using old fee/student)
app.use("/api/students", studentRoutes);
app.use("/api/fees", feeRoutes);

// ===============================
// DATABASE CONNECTION
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log("Database Error:", err));
