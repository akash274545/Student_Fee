const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).json(student);
});

module.exports = router;