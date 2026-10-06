const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  phone: { type: String, trim: true }
}, { timestamps: true });
module.exports = mongoose.model("Faculty", schema);
