import {Link, BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
export default function Successs(){
    return(
    <>
    <h1 style={{"color":"black"}}>Successfully done</h1>
    <Link to={'/sdash'}>back to main menu</Link>
    
    </>
    );
}