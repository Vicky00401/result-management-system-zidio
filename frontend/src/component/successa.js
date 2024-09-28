import {Link, BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
export default function Successa(){
    return(
    <>
    <h1 style={{"color":"black"}}>Successfully done</h1>
    <Link to={'/adash'}>back to main menu</Link>
    
    </>
    );
}