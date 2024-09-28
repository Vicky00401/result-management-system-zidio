import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {profile} from '../features/useraccount'
import {useSelector,useDispatch} from 'react-redux'

export default function Admin(){
    const dispatch = useDispatch();
    const navi = useNavigate()
    const [username,setUsername] = useState('')
    const [pass,setPass]=useState('')
    const data = {
        username:username,
        pass:pass
    }
    function formhandle(e){
        e.preventDefault()
        fetch('http://localhost:3001/admincheck',{
            method:'POST',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            body:JSON.stringify(data)
        }).then((re)=>re.json()).then((data)=>{if(data.token){
            const value = data.token
            dispatch(profile(value))
            navi('/adash')
        }
    else{
        alert("try again")
        navi('/admin')
    }})
    }
    return(
        <>
        <form onSubmit={formhandle}>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} placeholder="Username"></input><br/>
            <input type="password" onChange={(e)=>setPass(e.target.value)} placeholder="password"></input><br/>
            <input type="submit" value="submit"></input>

        </form>
        </>
    )
}
