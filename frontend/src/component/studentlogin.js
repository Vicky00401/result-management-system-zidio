import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import {profile} from '../features/useraccount'
import {useSelector,useDispatch} from 'react-redux'
import styles from "./assets/login.module.css"

export default function StudentLogin(){
    const dispatch = useDispatch();
    const navi = useNavigate()
    const [phone,setPhone] = useState('')
    const [pass,setPass]=useState('')
    const data = {
        phone:phone,
        pass:pass
    }
    function formhandle(e){
        e.preventDefault()
        fetch('http://localhost:3001/slogincheck',{
            method:'POST',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:JSON.stringify(data)
        }).then((re)=>re.json()).then((data)=>{if(data.token){
            const value = data.token
            dispatch(profile(value))
            navi('/sdash')
        }
    else{
        alert("try again")
        navi('/studentlogin')
    }})
    }
    return(
        <>
         <div className={styles.body}>
      <nav className={styles.nav}>
       
        <ul className={styles.navLinks}>
          <li className={styles.navItem}><a href="#home" className={styles.navLink}>Home</a></li>
          <li className={styles.navItem}><a href="#about" className={styles.navLink}>About</a></li>
          <li className={styles.navItem}><a href="#services" className={styles.navLink}>Services</a></li>
          <li className={styles.navItem}><a href="#contact" className={styles.navLink}>Contact</a></li>
        </ul>
      </nav>

      {/* Login Section */}
      <div className={styles.loginContainer}>
        <h1 style={{"color":"black"}}>Student Login</h1>
        <form onSubmit={formhandle}>
          <div className={styles.inputFieldContainer}>
            <label className={styles.label} htmlFor="username">Phone</label>
            <input type="text" id="username" className={styles.inputField}  onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your Phone number" required />
          </div>
          <div className={styles.inputFieldContainer}>
            <label className={styles.label} htmlFor="password">Password</label>
            <input type="password" id="password" className={styles.inputField} onChange={(e)=>setPass(e.target.value)} placeholder="Enter your password" required />
          </div>
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <p className={styles.registerText}>Don't have an account? <Link to="/newusers" className={styles.registerLink}>Register Here</Link></p>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 OwlForm. All rights reserved.</p>
      </footer>
    </div>
       
        </>
    )
}
