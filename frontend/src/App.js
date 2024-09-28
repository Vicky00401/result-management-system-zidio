import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/home';
import Optionst from './component/optiont';
import Login from './component/login';
import Newteacher from './component/newteacher';
import Tdash from './component/tdash';
import Createclass from './component/createclass';
import Deleteclass from './component/deleteclass';
import Resultuploadinit from './component/resultuploadinit';
import Uploadentireresult from './component/uploadentireresult';
import Uploadsepoption from './component/uploadsepoption';
import Attendencemark from './component/attendencemark';
import Projectreview from './component/projectreview';
import Projectsubmission from './component/projectsubmission';
import Assessment from './component/assessment';
import Linkedin from './component/linkedin';
import Viewclassresult from './component/viewclassresult';
import Option from './component/option';
import Student from './component/student';
import Studentlogin from './component/studentlogin';
import Newstudent from './component/newstudent';
import Sdash from './component/sdash';
import Admin from './component/admin';
import Adash from './component/adash';
import Errora from './component/errora';
import Viewteachera from './component/viewteachera';
import Viewresultadmin from './component/viewresultadmin';
import Updateteacherandnumbera from './component/updateteacherandnumbera';
import Deleteteachera from './component/deleteteachera';
import Deletecollegea from './component/deletecollegea';
import Deleteclassa from './component/deleteclassa';
import Uploadclassa from './component/uploadclassa';
import Uploadresulta from './component/uploadresulta';
import Removeresulta from './component/removeresulta';
import Removeresult from './component/removeresult';
import Viewstudenta from './component/viewstudenta';
import Errort from './component/errort';
import Errors from './component/errors';
import Successs from './component/successs';
import Successa from './component/successa';
import Successt from './component/success';
import Updatepass from './component/updatepass';
import Viewresultstudent from './component/viewresultstudent';

function App() {
  return (
    <>
     <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/option' element={<Option/>}/>
      {/* Teachers related Routes */}
      <Route path='/teacher' element={<Optionst/>}/>
      <Route path='/newusert' element={<Newteacher/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/tdash' element={<Tdash/>}/>
      <Route path='/createclass' element={<Createclass/>}/>
      <Route path='/deleteclass' element={<Deleteclass/>}/>
      <Route path='/resultuploadinit' element={<Resultuploadinit/>}/>
      <Route path='/uploadentireresult' element={<Uploadentireresult/>}/>
      <Route path='/uploadsepoption' element={<Uploadsepoption/>}/>
      <Route path='/attendencemark' element={<Attendencemark/>}/>
      <Route path='/projectreview' element={<Projectreview/>}/>
      <Route path='/projectsubmission' element={<Projectsubmission/>}/>
      <Route path='/assessment' element={<Assessment/>}/>
      <Route path='/linkedin' element={<Linkedin/>}/>
      <Route path='/viewclassresult' element={<Viewclassresult/>}/>
      <Route path='/removeresult' element={<Removeresult/>}/>
      <Route path='/errort' element={<Errort/>}/>
      <Route path='/successt' element={<Successt/>}/>
      <Route path='/updatepass' element={<Updatepass/>}/>
      {/* Admin related routes */}
      <Route path='/admin' element={<Admin/>}/>
      <Route path='/adash' element={<Adash/>}/>
      <Route path='/successa' element={<Successa/>}/>
      <Route path='/errora' element={<Errora/>}/>
      <Route path='/viewteachera' element={<Viewteachera/>}/>
      <Route path='/updateteacherandnumbera' element={<Updateteacherandnumbera/>}/>
      <Route path='/viewresultadmin'element={<Viewresultadmin/>}/>
      <Route path='/deleteteachera' element={<Deleteteachera/>}/>
      <Route path='/deletecollegea' element={<Deletecollegea/>}/>
      <Route path='/deleteclassa' element={<Deleteclassa/>}/>
      <Route path='/uploadclassa'  element={<Uploadclassa/>}  />
      <Route path='/uploadresulta' element={<Uploadresulta/>}  />
      <Route path='/removeresulta' element={<Removeresulta/>}  />
      <Route path='/viewstudenta'  element={<Viewstudenta/>}  />

      {/* Students related routes */}
      <Route path='/student' element={<Student/>}/>
      <Route path='/studentlogin' element={<Studentlogin/>}/>
      <Route path='/newusers' element={<Newstudent/>}/>
      <Route path='/sdash' element={<Sdash/>}/>
      <Route path='/successs' element={<Successs/>}/>
      <Route path='/viewresultstudent' element={<Viewresultstudent/>}/>
      <Route path='/errors' element={<Errors/>}/>
     </Routes>
     </BrowserRouter>
     </div>
    </>
  );
}

export default App;
