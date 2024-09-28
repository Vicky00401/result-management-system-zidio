import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Createclass(){
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
    const [classn,setClassn] = useState('')
    const [clg,setClg] = useState('')
    const [tname,setTname] = useState('')
    const [phone,setPhone] = useState('')
    const [file,setFile] = useState(null)

   async function sumit(e){
        e.preventDefault()
        
        
  const formData = new FormData()
  formData.append("xl", file)
  formData.append("classn", classn)
  formData.append("clgn", clg)
  formData.append('tname',tname)
  formData.append('phone',phone)

  const result = await axios.post('http://localhost:3001/classuploada', formData, { headers: {'Content-Type': 'multipart/form-data'}})
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
                <input type='text' onChange={(e)=>setClassn(e.target.value)} placeholder="enter class name"></input><br/>
                <input type='text' onChange={(e)=>setClg(e.target.value)} placeholder="enter college name" ></input>
                <input type='text' onChange={(e)=>setTname(e.target.value)} placeholder="enter teacher name"></input><br/>
                <input type='text' onChange={(e)=>setPhone(e.target.value)} placeholder="enter teacher phone"></input><br/>
                <input type='file' onChange={(e)=>setFile(e.target.files[0])} placeholder="submit file with regno and student name" name="xl"></input>
                <input type='submit' value='submit'></input>
            </form></>:<><h1>poda punda</h1></>
  }
                  </>
    );
}