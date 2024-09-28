import { useState,useEffect } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Viewstudenta(){
    const navi = useNavigate()
    const[username,setUsername] = useState("")
    const[workresult,setWorkresult] = useState(false)
    const [stdata,setStdata]=useState([])
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
    const [clg,setClg] = useState('')
    const [classn,setClassn] = useState('')
    async function sumit(e){
        e.preventDefault()
        
        
  const formData = new FormData()
  formData.append("classn",classn)
  formData.append("clg", clg)

  const result = await axios.post('http://localhost:3001/viewstudenta', formData, { headers: {'Content-Type': 'application/json;charset=UTF-8'}})
  if(result.data.status == "success"){
    setWorkresult(true)
    const d = result.data
    const da = d.data
    setStdata(da)
  }
  console.log(result)
  
    }
return(
    <>
    {
            username?<><h1>hello{username}</h1>
            <form onSubmit={sumit}>
                <input type='text' onChange={(e)=>setClassn(e.target.value)} placeholder="enter class name"></input>
                <input type='text' onChange={(e)=>setClg(e.target.value)} placeholder="enter college name"></input>
                <input type='submit' value='submit'></input>
                
            </form>
            {workresult?<table>
<tr>
    <th>Student name</th>
    <th>Reg.no</th>
</tr>
{stdata.map((dtat)=><tr>
    <td>{dtat.student}</td>
    <td>{dtat.rollno}</td>
</tr>)
}
                </table>:<><h1>No data found</h1></>}</>:<><h1>poda punda</h1></>
        }
    </>
    
)
}