import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Updateteacherandnumbera(){
    const navi = useNavigate()
    const udata = useSelector((state)=>state.userd.value)
    const [username,setUsername] = useState("")
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
    const [ptname,setPtname] = useState('')
    const [pphone,setPphone] = useState('')
    const [tname,setTname] = useState('')
    const [clg,setClg] = useState('')
    const [phone,setPhone] = useState('')
    const [tnamec,setTnamec] = useState("false")
    const [tphonec,setTphonec] = useState("false")

   async function sumit(e){
        e.preventDefault()
        
        
  const formData = new FormData()
  formData.append("ptname", ptname)
  formData.append("clg", clg)
  formData.append('pphone',pphone)
  formData.append("tname", tname)
  formData.append('phone',phone)
  formData.append("tnamec", tnamec)
  formData.append("tphonec", tphonec)

  const result = await axios.post('http://localhost:3001/updateteacherandnumbera', formData, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
  if(result.data.status=="success"){
    navi('/successa')
    }
    else{
      navi('/errora')
    }
  
}
        
    return(
        <>
        {username?<><h1>hello{username}</h1>
            <form onSubmit={sumit}>
                <h1>enter the previous value</h1>
                <input type='text' onChange={(e)=>setClg(e.target.value)} placeholder="enter college name"></input><br/>
                <input type='text' onChange={(e)=>setPtname(e.target.value)} placeholder="enter Teacher name"></input><br/>
                <input type='text' onChange={(e)=>setPphone(e.target.value)} placeholder="enter phone"></input><br/>
                <h1>enter the updated value</h1>
                <input type='text' onChange={(e)=>setTname(e.target.value)} placeholder="enter Teacher name"></input><br/>
                <input type='text' onChange={(e)=>setPhone(e.target.value)} placeholder="enter phone"></input><br/>
                <input type="checkbox" value="true" onChange={(e)=>setTnamec(e.target.value)}></input><span>change name</span><br/>
                <input type="checkbox" value="true" onChange={(e)=>setTphonec(e.target.value)}></input><span>change phone</span><br/>
                <input type='submit' value='submit'></input>
            </form></>:<><h1>poda punda</h1></>
  }
                  </>
    );
}