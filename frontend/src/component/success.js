import {Link, BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
export default function Successt(){
    return(
    <>
    <h1 style={{"color":"black"}}>Successfully done</h1>
    <Link to={'/tdash'}>back to main menu</Link>
    
    </>
    );
}