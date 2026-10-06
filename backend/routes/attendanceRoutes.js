const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

router.post("/", async (req,res) => {
  try {
    const {student, subject, date, status} = req.body;
    const record = await Attendance.findOneAndUpdate(
      {student, subject, date},
      {student, subject, date, status},
      {new:true, upsert:true, runValidators:true, setDefaultsOnInsert:true}
    );
    res.status(201).json(record);
  } catch(e){ res.status(400).json({message:e.message}); }
});

router.get("/", async (req,res) => {
  try {
    const q = {};
    if(req.query.date) q.date=req.query.date;
    if(req.query.subject) q.subject=req.query.subject;
    res.json(await Attendance.find(q)
      .populate("student","rollNumber name")
      .populate("subject","subjectCode subjectName")
      .sort({date:-1}));
  } catch(e){ res.status(500).json({message:e.message}); }
});

router.get("/report/student/:studentId", async (req,res) => {
  try {
    const records = await Attendance.find({student:req.params.studentId})
      .populate("subject","subjectCode subjectName");
    const map = {};
    records.forEach(r => {
      const id = r.subject._id.toString();
      if(!map[id]) map[id] = {subjectCode:r.subject.subjectCode, subjectName:r.subject.subjectName, totalClasses:0, present:0, absent:0};
      map[id].totalClasses++;
      if(r.status==="Present") map[id].present++; else map[id].absent++;
    });
    res.json(Object.values(map).map(x => ({
      ...x,
      percentage: x.totalClasses ? ((x.present/x.totalClasses)*100).toFixed(2) : "0.00"
    })));
  } catch(e){ res.status(500).json({message:e.message}); }
});

module.exports = router;
