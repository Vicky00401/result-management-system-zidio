import { Link } from "react-router-dom";
import styles from "./assets/option.module.css"
export default function Student(){
    return(
        <>
          <header className={styles.header} >
        <h1 className={styles.headerh1}>Welcome to the Student Result Management System</h1>
        <p className={styles.headerp}>Efficiently manage and track student results with ease.</p>
        </header>
        <nav className={styles.navbar}>
        <ul className={styles.navbarul}>
        <li className={styles.navbarulli}><Link className={styles.navbarullia} to={"#"}>Home</Link></li>
        <li className={styles.navbarulli}><Link className={styles.navbarullia} to={"#"}>About</Link></li>
        <li className={styles.navbarulli}><Link className={styles.navbarullia} to={"#"}>Services</Link></li>
        <li className={styles.navbarulli}><Link className={styles.navbarullia} to={"#"}>Contact</Link></li>
        </ul>
        </nav>
        <section className={styles.buttonsection}>
            <div style={{"margin-top":"45px"}}>
            <Link className={styles.hoverbtn} to='/newusers'>Register</Link>
            <Link className={styles.hoverbtn} to='/studentlogin'>login</Link>
            </div>
        </section>
        <footer className={styles.footer} style={{"margin-top":"200px"}}>
            <p>&copy; 2024 Animated Page. All Rights Reserved.</p>
        </footer>
        </>
    )
}