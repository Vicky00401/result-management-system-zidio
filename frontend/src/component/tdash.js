import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styles from "./assets/tdash.module.css"

export default function Tdash(){
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
          <Link to='/createclass' className={styles.animatedBtn}>Create Classroom</Link>
          <Link to='/deleteclass' className={styles.animatedBtn}>Delete Classroom</Link>
          <Link to='/resultuploadinit' className={styles.animatedBtn}>Upload Result</Link>
          <Link to='/viewclassresult' className={styles.animatedBtn}>View Class Result</Link>
          <Link to='/updatepass' className={styles.animatedBtn}>Upload Student Password</Link>
          <Link to='/removeresult' className={styles.animatedBtn}>Remove Result From Class Result</Link>
        </div>
      </div>

      {/* Footer */}
    </div>
    <footer className={styles.footer}>
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
            </>:<h1>poda punda</h1>}
        </>
    )
}