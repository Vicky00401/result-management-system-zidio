import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

export default function Adash(){
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
            {username?<><h1>hellon {username}</h1>
            <Link to='/viewteachera'>View Teacher</Link><br/>
            <Link to='/updateteacherandnumbera'>Update Teacher and Phonenumber</Link><br/>
            <Link to='/viewresultadmin'>View Result</Link><br/>
            <Link to='/deleteteachera'>Delete Teacher account</Link><br/>
            <Link to='/deletecollegea'>Delete College Entry</Link><br/>
            <Link to='/deleteclassa'>Delete classroom</Link><br/>
            <Link to='/uploadclassa'>Upload Class</Link><br/>
            <Link to='/uploadresulta'>Upload result</Link><br/>
            <Link to='/removeresulta'>Remove Result</Link><br/>
            <Link to='/viewstudenta'>View Student</Link><br/>

            </>:<h1>poda punda</h1>}
        </>
    )
}