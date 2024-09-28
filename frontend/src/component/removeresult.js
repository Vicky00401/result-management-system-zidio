import { useState,useEffect } from "react";
import styles from "./assets/removeresultfromclassresult.module.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Removeresult(){
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

  const result = await axios.post('http://localhost:3001/removeresult', formData, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
  if(result.data.status=="success"){
    navi('/successt')
    }
    else{
      navi('/errort')
    }
  
}
        
    return(
        <>
        {username?<><div>
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
          <h1>Remove Result From Class Result</h1>
          <form className={styles.form} onSubmit={sumit} >
            <input
              type="text"
              id="className"
              name="className"
              placeholder="Enter Class Name"
              onChange={(e)=>setClassn(e.target.value)}
              required
            />
            <input type="submit"/>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>&copy; 2024 School Portal. All rights reserved.</p>
        </div>
      </footer>
    </div></>:<><h1>poda punda</h1></>
  }
                  </>
    );
}