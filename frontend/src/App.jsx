import React from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Faculty from "./pages/Faculty";
import Subjects from "./pages/Subjects";
import MarkAttendance from "./pages/MarkAttendance";
import AttendanceRecords from "./pages/AttendanceRecords";
import Reports from "./pages/Reports";
import LowAttendance from "./pages/LowAttendance";

export default function App(){
  const location=useLocation();
  const title = {
    "/":"Dashboard","/students":"Students","/faculty":"Faculty","/subjects":"Subjects",
    "/attendance":"Mark Attendance","/records":"Attendance Records","/reports":"Reports","/low-attendance":"Low Attendance"
  }[location.pathname] || "Attendance Management System";
  return <div className="app">
    <aside className="sidebar">
      <h2>🎓 AMS</h2><p className="side-sub">College Attendance</p>
      <nav>
        <NavLink to="/">🏠 Dashboard</NavLink>
        <NavLink to="/students">👨‍🎓 Students</NavLink>
        <NavLink to="/faculty">👩‍🏫 Faculty</NavLink>
        <NavLink to="/subjects">📚 Subjects</NavLink>
        <NavLink to="/attendance">✅ Mark Attendance</NavLink>
        <NavLink to="/records">📋 Records</NavLink>
        <NavLink to="/reports">📊 Reports</NavLink>
        <NavLink to="/low-attendance">⚠️ Low Attendance</NavLink>
      </nav>
    </aside>
    <main className="main"><header><h1>{title}</h1><span>College Level Project</span></header>
      <Routes>
        <Route path="/" element={<Dashboard/>}/><Route path="/students" element={<Students/>}/>
        <Route path="/faculty" element={<Faculty/>}/><Route path="/subjects" element={<Subjects/>}/>
        <Route path="/attendance" element={<MarkAttendance/>}/><Route path="/records" element={<AttendanceRecords/>}/>
        <Route path="/reports" element={<Reports/>}/><Route path="/low-attendance" element={<LowAttendance/>}/>
      </Routes>
    </main>
  </div>
}