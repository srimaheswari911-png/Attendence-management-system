const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

router.get("/", async (req,res) => {
  try { res.json(await Faculty.find().sort({createdAt:-1})); }
  catch(e){ res.status(500).json({message:e.message}); }
});
router.post("/", async (req,res) => {
  try { res.status(201).json(await Faculty.create(req.body)); }
  catch(e){ res.status(400).json({message:e.message}); }
});
router.delete("/:id", async (req,res) => {
  try { await Faculty.findByIdAndDelete(req.params.id); res.json({message:"Faculty deleted"}); }
  catch(e){ res.status(500).json({message:e.message}); }
});
module.exports = router;
