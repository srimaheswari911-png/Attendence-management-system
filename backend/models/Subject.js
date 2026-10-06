const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  subjectCode: { type: String, required: true, unique: true, trim: true },
  subjectName: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  year: { type: String, required: true, trim: true },
  section: { type: String, required: true, trim: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty" }
}, { timestamps: true });
module.exports = mongoose.model("Subject", schema);
