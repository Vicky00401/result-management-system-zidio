import {Link, BrowserRouter,Routes,Route,useNavigate } from 'react-router-dom';
export default function Errora(){
    return(
    <>
    <h1 style={{"color":"black"}}>failed</h1>
    <Link to={'/adash'}>try again</Link>
    </>
    );
}