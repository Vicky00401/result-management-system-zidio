import { useState } from "react"
import styles from "./assets/newt.module.css"
import { useNavigate } from "react-router-dom"

export default function Newteacher(){

    

    const navi = useNavigate()
    const [username,setUsername] = useState('')
    const [clg,setClg] = useState('')
    const [phone,setPhone]=useState('')
    const [pass,setPass]=useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [eyesPosition, setEyesPosition] = useState({ moveX: 0, moveY: 0 });
    const [isClosed, setIsClosed] = useState(false);
    const moveEyes = (input, field) => {
        const inputLength = input.length;
        const percentage = Math.min(inputLength / 20, 1);
        const maxMoveX = 10;
        const moveX = percentage * maxMoveX - maxMoveX / 2;
    
        let moveY = 0;
        if (field === 'adminName') {
          moveY = -10;
        } else if (field === 'collegeName' || field === 'phone') {
          moveY = 10;
        }
    
        setEyesPosition({ moveX, moveY });
      };
    const data = {
        username:username,
        college:clg,
        phone:phone,
        pass:pass
    }
    function formhandle(e){
        e.preventDefault()
        fetch('http://localhost:3001/newtuser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:JSON.stringify(data)
        }).then((re)=>re.json()).then((data)=>{if(data.status=='success'){
            alert("registered successfully")
            navi('/login')
        }
    else{
        alert("try again")
        navi('/newusert')
    }})
    }
    return(
        <div className={styles.body}>
        <nav>
         
          <ul className={styles.navLinks}>
            <li className={styles.navItem}><a href="#home" className={styles.navLink}>Home</a></li>
            <li className={styles.navItem}><a href="#about" className={styles.navLink}>About</a></li>
            <li className={styles.navItem}><a href="#services" className={styles.navLink}>Services</a></li>
            <li className={styles.navItem}><a href="#contact" className={styles.navLink}>Contact</a></li>
          </ul>
        </nav>
  
        <section className={styles.formContainer}>
          <div className={styles.formBox}>
            <div className={`${styles.owl} ${isClosed ? styles.owlClosed : ''}`}>
              <div className={styles.eyes}>
                <div className={styles.eye}>
                  <div className={styles.pupil} style={{ transform: `translate(${eyesPosition.moveX}px, ${eyesPosition.moveY}px)` }}></div>
                </div>
                <div className={styles.eye}>
                  <div className={styles.pupil} style={{ transform: `translate(${eyesPosition.moveX}px, ${eyesPosition.moveY}px)` }}></div>
                </div>
              </div>
            </div>
            <h2>Teachers Registration</h2>
            <form onSubmit={formhandle}>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="adminName">Admin Name</label>
                <input type="text" className={styles.inputField} id="adminName" value={username} onChange={(e) => { setUsername(e.target.value); moveEyes(e.target.value, 'adminName'); }} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="collegeName">College Name</label>
                <input type="text" className={styles.inputField} id="collegeName" value={clg} onChange={(e) => { setClg(e.target.value); moveEyes(e.target.value, 'collegeName'); }} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="password">Password</label>
                <input type={showPassword ? "text" : "password"} className={styles.inputField} id="password" value={pass} onChange={(e) => { setPass(e.target.value); moveEyes(e.target.value, 'password'); }} required onFocus={() => setIsClosed(true)} onBlur={() => setIsClosed(false)} />
                <input type="checkbox" id="showPassword" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Show Password
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label} htmlFor="phone">Phone Number</label>
                <input type="tel" className={styles.inputField} id="phone" value={phone} onChange={(e) => { setPhone(e.target.value); moveEyes(e.target.value, 'phone'); }} required />
              </div>
              <button type="submit" className={styles.button}>Register</button>
            </form>
          </div>
        </section>
  
        <footer className={styles.footer}>
          <p>&copy; 2024 OwlForm. All rights reserved.</p>
        </footer>
      </div>
    )
}