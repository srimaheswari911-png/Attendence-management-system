const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

router.get("/", async (req,res) => {
  try { res.json(await Student.find().sort({createdAt:-1})); }
  catch(e){ res.status(500).json({message:e.message}); }
});
router.post("/", async (req,res) => {
  try { res.status(201).json(await Student.create(req.body)); }
  catch(e){ res.status(400).json({message:e.message}); }
});
router.put("/:id", async (req,res) => {
  try { res.json(await Student.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true})); }
  catch(e){ res.status(400).json({message:e.message}); }
});
router.delete("/:id", async (req,res) => {
  try { await Student.findByIdAndDelete(req.params.id); res.json({message:"Student deleted"}); }
  catch(e){ res.status(500).json({message:e.message}); }
});
module.exports = router;
