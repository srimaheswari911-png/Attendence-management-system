const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  date: { type: String, required: true },
  status: { type: String, enum: ["Present", "Absent"], required: true }
}, { timestamps: true });
schema.index({ student: 1, subject: 1, date: 1 }, { unique: true });
module.exports = mongoose.model("Attendance", schema);
