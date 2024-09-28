import { useState,useEffect } from "react";
import axios from 'axios'
import styles from "./assets/deleteclassroom.module.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Deleteclass(){
    const navi = useNavigate()
    const udata = useSelector((state)=>state.userd.value)
    const [username,setUsername] = useState("")
    const [phone,setPhone] = useState("")
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

  const result = await axios.post('http://localhost:3001/deleteclass', formData, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
  if(result.data.status=="success"){
  navi('/successt')
  }
  else{
    navi('/errort')
  }
}
        
    return(
        <>
        {username?<>
            <div>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Delete</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className={styles.formContainer}>
        <h1>Delete Class Data</h1>
        <form onSubmit={sumit}>
        <label htmlFor="class-name">Class Name</label>
          <input
            type="text"
            id="class-name"
            name="class-name"
            placeholder="Enter class name"
            required
            onChange={(e)=>setClassn(e.target.value)}
          />

          <input
            type="submit"
            id="delete-btn"
            className={styles.deleteBtn}
            placeholder="Delete"
          />
            
        </form>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
    </>:<><h1>poda punda</h1></>
  }
                  </>
    );
}