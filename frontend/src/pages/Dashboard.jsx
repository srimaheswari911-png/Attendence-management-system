import React from "react";
import {useEffect,useState} from "react";
import api from "../api";
export default function Dashboard(){
 const [data,setData]=useState({students:0,faculty:0,subjects:0,records:0,present:0,absent:0});
 useEffect(()=>{Promise.all([api.get("/students"),api.get("/faculty"),api.get("/subjects"),api.get("/attendance")]).then(([s,f,sub,a])=>{
   const p=a.data.filter(x=>x.status==="Present").length;
   setData({students:s.data.length,faculty:f.data.length,subjects:sub.data.length,records:a.data.length,present:p,absent:a.data.length-p});
 }).catch(console.error)},[]);
 return <div><div className="cards">
  {[[data.students,"Students","👨‍🎓"],[data.faculty,"Faculty","👩‍🏫"],[data.subjects,"Subjects","📚"],[data.records,"Attendance Records","📋"]].map(x=><div className="card" key={x[1]}><b>{x[2]}</b><h2>{x[0]}</h2><p>{x[1]}</p></div>)}
 </div><div className="panel"><h2>Attendance Overview</h2><p>Present: <b>{data.present}</b> &nbsp; | &nbsp; Absent: <b>{data.absent}</b></p></div></div>
}