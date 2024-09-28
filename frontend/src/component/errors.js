import {Link, BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
export default function Errors(){
    return(
    <>
    <h1 style={{"color":"black"}}>failed</h1>
    <Link to={'/sdash'}>try again</Link>
    </>
    );
}