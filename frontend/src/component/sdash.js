import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styles from "./assets/tdash.module.css"

export default function Sdash(){
    const navi = useNavigate()
    const[username,setUsername] = useState("")
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
            if(a){
                await setUsername(a)
            }
    }
        datareceiver().catch((err)=>{
            console.log(err)
        })
    },[])
    return(
        <>
         <>
            {username?<><div className={styles.body}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Home</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">About</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Services</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Portfolio</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Contact</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Blog</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className={styles.container}>
        <h1 style={{"color":"black"}}>Welcome to Our Website</h1>
        <p style={{"color":"black"}}>Explore our services and offerings</p>
        <div className={styles.buttonContainer}>
          <Link to='/viewresultstudent' className={styles.animatedBtn}>View Result</Link>
        </div>
      </div>

      {/* Footer */}
    </div>
    <footer className={styles.footer}>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
            </>:<h1>poda punda</h1>}
        </>
        </>
    )
}