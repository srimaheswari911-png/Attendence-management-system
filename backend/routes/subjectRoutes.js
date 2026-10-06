const express = require("express");
const router = express.Router();
const Subject = require("../models/Subject");

router.get("/", async (req,res) => {
  try {
    res.json(await Subject.find().populate("faculty","name facultyId").sort({createdAt:-1}));
  } catch(e){ res.status(500).json({message:e.message}); }
});
router.post("/", async (req,res) => {
  try { res.status(201).json(await Subject.create(req.body)); }
  catch(e){ res.status(400).json({message:e.message}); }
});
router.delete("/:id", async (req,res) => {
  try { await Subject.findByIdAndDelete(req.params.id); res.json({message:"Subject deleted"}); }
  catch(e){ res.status(500).json({message:e.message}); }
});
module.exports = router;
