import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import styles from "./assets/viewclassresult.module.css"
import { useSelector } from "react-redux";
export default function Viewclassresult(){
    const navi = useNavigate()
    const[username,setUsername] = useState("")
    const[phone,setPhone] = useState("")
    const[workresult,setWorkresult] = useState(false)
    const [stdata,setStdata]=useState([])
    const udata = useSelector((state)=>state.userd.value)
    useEffect(()=>{
        const datareceiver= async ()=>{
            const re = await fetch("http://localhost:3001/userverification",{
            method:"GET",
            headers:{
                "Authorization":"bearer "+udata
            }
        })
            const user = await re.json()
            const a = await user.username
            const b = await user.phone
            if(a){
                await setUsername(a)
                await setPhone(b)
            }
    }
        datareceiver().catch((err)=>{
            console.log(err)
        })
    },[])
    const [classn,setClassn] = useState('')
    async function sumit(e){
        e.preventDefault()
        
        
  const formData = new FormData()
  formData.append("classn", classn)
  formData.append('user',username)
  formData.append('phone',phone)

  const result = await axios.post('http://localhost:3001/viewclassresult', formData, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
  if(result.data.status == "success"){
    setWorkresult(true)
    const d = result.data
    const da = d.data
    setStdata(da)
  }
  console.log(result)
  
    }
return(
    <>
    {
            username?<>
             <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <ul className={styles.navLinks}>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Main Section */}
      <section className={styles.mainContent}>
        <div className={styles.container}>
          <h1>Enter Class Name</h1>
          <form id="classForm" onSubmit={sumit}>
            <input
              type="text"
              id="className"
              name="className"
              placeholder="Class Name"
              onChange={(e)=>setClassn(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>

      {/* Footer */}
    
    </div>

            {workresult?
            <>
            <table className={styles.tableContainer}>
  <thead>
    <tr>
      <th>Roll no</th>
      <th>Student name</th>
      <th>Class</th>
      <th>Teacher name</th>
      <th>Attendance Mark</th>
      <th>Project Review</th>
      <th>Project Submission</th>
      <th>Assessment</th>
      <th>LinkedIn</th>
    </tr>
  </thead>
  <tbody>
    {stdata.map((dtat) => (
      <tr key={dtat.rollno}>
        <td data-label="Roll no">{dtat.rollno}</td>
        <td data-label="Student name">{dtat.student}</td>
        <td data-label="Class">{dtat.class}</td>
        <td data-label="Teacher name">{dtat.teacher}</td>
        <td data-label="Attendance Mark">{dtat.atmark}</td>
        <td data-label="Project Review">{dtat.prmark}</td>
        <td data-label="Project Submission">{dtat.psmark}</td>
        <td data-label="Assessment">{dtat.asmark}</td>
        <td data-label="LinkedIn">{dtat.limark}
        </td>
      </tr>
    ))}
  </tbody>
</table>
</>:<><h1 style={{"color":"black"}}>No data found</h1></>}</>:<><h1>poda punda</h1></>
        }
    </>
    
)
}