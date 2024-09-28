import {Link, BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
export default function Errort(){
    return(
    <>
    <h1 style={{"color":"black"}}>failed</h1>
    <Link to={'/tdash'}>try again</Link>
    </>
    );
}