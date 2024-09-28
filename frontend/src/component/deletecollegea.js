import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Deletecollegea(){
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
    const [clg,setClg] = useState('')

   async function sumit(e){
        e.preventDefault()
        
        
  const formData = new FormData()
  formData.append("clg", clg)

  const result = await axios.post('http://localhost:3001/deletecollegea', formData, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
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
                <input type='text' onChange={(e)=>setClg(e.target.value)} placeholder="enter college name"></input>
                <input type='submit' value='submit'></input>
            </form></>:<><h1>poda punda</h1></>
  }
                  </>
    );
}