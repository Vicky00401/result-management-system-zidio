import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./assets/updatepass.module.css"

export default function Updatepass(){
    const navi = useNavigate()
    const udata = useSelector((state)=>state.userd.value)
    const [username,setUsername] = useState("")
    const [phone,setPhone] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
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
    const [sname,setSname] = useState('')
    const [sphone,setSphone] = useState('')
    const [upass,setUpass] = useState('')
   async function sumit(e){
        e.preventDefault()
        
        
  const formData = new FormData()
  formData.append("sname", sname)
  formData.append("sphone", sphone)
  formData.append("upass", upass)

  const result = await axios.post('http://localhost:3001/updatepass', formData, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
  if(result.data.status=="success"){
    alert("successfully changed")

    }
    else{
      navi('/errort')
      alert("try again")
    }
  
}
        
    return(
        <>
        
        {username?<> <div className={styles.body}>
      {/* Navigation Bar */}
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <h1>OwlForm</h1>
        </div>
        <ul className={styles.navLinks}>
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Registration Form with Owl Animation */}
      <section className={styles.formContainer}>
        <div className={styles.formBox}>
          <div className={styles.owl}>
            <div className={styles.eyes}>
              <div className={`${styles.eye} ${styles.leftEye}`}>
                <div className={styles.pupil}></div>
              </div>
              <div className={`${styles.eye} ${styles.rightEye}`}>
                <div className={styles.pupil}></div>
              </div>
            </div>
          </div>

          <h2>Upload Student Password</h2>
          <br />
          <form id="registerForm" onSubmit={sumit}>
            <div className={styles.inputGroup}>
              <label htmlFor="adminName">Student Name</label>
              <input type="text" id="adminName" onChange={(e)=>setSname(e.target.value)} placeholder="Enter Student name" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter Updated password"
                onChange={(e)=>setUpass(e.target.value)}
                required
              />
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={togglePasswordVisibility}
              /> 
              <label htmlFor="showPassword"> Show Password</label>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="Enter phone number" onChange={(e)=>setSphone(e.target.value)} required />
            </div>

            <button type="submit">Change Password</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 OwlForm. All rights reserved.</p>
      </footer>
    </div></>:<><h1>poda punda</h1></>
  }
                  </>
    );
}