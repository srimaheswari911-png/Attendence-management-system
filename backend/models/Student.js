const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  year: { type: String, required: true, trim: true },
  section: { type: String, required: true, trim: true },
  email: { type: String, trim: true }
}, { timestamps: true });
module.exports = mongoose.model("Student", schema);
