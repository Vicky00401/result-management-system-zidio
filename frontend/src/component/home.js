import {Link, BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
import styles from "./assets/home.module.css"
import mr from "./assets/Result Management.jpg"
import pa from "./assets/parentaccess.png"
import r1 from "./assets/realtime1.png"
import mayank from "./assets/Mayank.jpg"
import shivam from "./assets/Shivam.jpg"
import param from "./assets/Param.jpg"
import vignesh from "./assets/Vignesh.jpg"
export default function Home(){
    return(
        <>
        <nav className={styles.navbar}>
          <div className={styles.container}>
            <Link to={'#'} className={styles.logo}>SRMS</Link>
            <ul className={styles.navlinks} style={{}}>
              <li><Link style={{ "margin": "0 10px", "color": "#fff","text-decoration": "none"}} to={'#'}>Home</Link></li>
              <li><Link style={{ "margin": "0 10px", "color": "#fff","text-decoration": "none"}} to={'#'}>Features</Link></li>
              <li><Link style={{ "margin": "0 10px", "color": "#fff","text-decoration": "none"}} to={'#'}>Pricing</Link></li>
              <li><Link style={{  "margin": "0 10px","color": "#fff","text-decoration": "none"}} to={'#'}>Contact</Link></li>
            </ul>
          </div>
        </nav>
      
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 style={{"color":"black"}} >Welcome to the Student Result Management System</h1>
            <p style={{"color":"black"}}>Efficiently manage and track student results with ease.</p>
            <Link to={"/option"} className={styles.ctabutton}>Get Started</Link>
          </div>
        </section>
      
        <section className={styles.features}>
          <div className={styles.container}>
            <h2 style={{"color":"black"}}>Our Features</h2>
            <div className={styles.featurecards}>
              <div className={styles.featurecardscard}>
                <img src={mr} className={styles.featurecardscard} style={{"width":"100%","height":"200px"}}alt="Manage Results"/>
                <h3 style={{"color":"black"}}>Manage Results</h3>
                <p style={{"color":"black"}}>Easily manage student records and results through our intuitive interface.</p>
              </div>
              <div className={styles.featurecardscard}>
                <img src={pa} className={styles.featurecardscard} style={{"width":"100%","height":"200px"}} alt="Parent Access"/>
                <h3 style={{"color":"black"}}>Parent Access</h3>
                <p style={{"color":"black"}}>Results can be shared directly with parents, improving communication.</p>
              </div>
              <div className={styles.featurecardscard}>
                <img src={r1} className={styles.featurecardscard} style={{"width":"100%","height":"200px"}} alt="Real-Time Updates"/>
                <h3 style={{"color":"black"}}>Real-Time Updates</h3>
                <p style={{"color":"black"}}>Provide real-time updates to students and parents about their performance.</p>
              </div>
            </div>
          </div>
        </section>
      
        <section className={styles.team}>
          <div className={styles.container}>
            <h2 style={{"color":"black"}}>Meet Our Team</h2>
            <div className={styles.teamgrid}>
              <div className={styles.teammember}>
                <img src={mayank} className={styles.teammemberimg} alt="Team Member"/>
                <h3 style={{"color":"black"}}>Mayank</h3>
                
                <Link href="https://www.linkedin.com/in/mayank-076473239/" target="_blank">LinkedIn</Link>
              </div>
              <div className={styles.teammember}>
                <img src={shivam} className={styles.teammemberimg} alt="Team Member"/>
                <h3 style={{"color":"black"}}>Shivam</h3>
                
                <Link href="https://www.linkedin.com/in/shivam-singhal-13b568207?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank">LinkedIn</Link>
              </div>
              <div className={styles.teammember}>
                <img src={param} className={styles.teammemberimg} alt="Team Member"/>
                <h3 style={{"color":"black"}}>Param</h3>
                
                <Link href="https://www.linkedin.com/in/paramjeet-singh-6859592a0?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank">LinkedIn</Link>
              </div>
              <div className={styles.teammember}>
                <img src={vignesh} className={styles.teammemberimg} alt="Team Member"/>
                <h3 style={{"color":"black"}}>Vignesh</h3>
                
                <Link href="https://www.linkedin.com/in/vigneshwaran-v-b182b6306?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">LinkedIn</Link>
              </div>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <p>&copy; 2024 Student Result Management System. All Rights Reserved.</p>
        </footer>
      
         <script src="hi2.js"></script> 
      </>
      
    );
}