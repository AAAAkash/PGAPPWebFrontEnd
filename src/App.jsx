import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './componets/FrontPage.jsx';
import Home from './componets/Home.jsx'
import Aftab from "./aftab.jsx"
import ManagerManagement from "./componets/sliderBarComponets/ManagerManagement.jsx"
import BuildingManagement from "./componets/sliderBarComponets/BuildingManagement.jsx"
import ManagerPaymentHistory from "./componets/sliderBarComponets/ManagerPaymentHistory.jsx"
import StudentList from "./componets/sliderBarComponets/StudentList.jsx"
import Complaint from "./componets/Complaint/Complaint.jsx"
import Cash from "./componets/sliderBarComponets/cash.jsx"
// import Pending from "./componets/PendingPayments.jsx"
// import Received from "./componets/ReceivedPayments.jsx"

import { generateToken , messaging } from "./firebaseConfig.js"
import { onMessage } from "firebase/messaging";

function App() {

  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      console.log(payload.notification);
      alert(payload.notification.body);
      alert(payload.notification.title);
    });
  }, []) 


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/aftab' element={<Aftab />} />
          <Route path='/managerManagement' element={<ManagerManagement />} />
          <Route path='/buildingManagement' element={<BuildingManagement />} />
          <Route path='/paymentHistory' element={<ManagerPaymentHistory />} />
          <Route path='/studentManagement' element={<StudentList />} />
          <Route path='/complaint' element={<Complaint />} />
          <Route path='/cash' element={<Cash />} />
          {/* <Route path='/PendingPayments' element={<Pending/>}/> 
          <Route path='/ReceivedPayments' element={<Received/>}/>  */}

          {/* <Route path='/createNewCompany' element={<Company/>}/>
          <Route path="/admin" element={<Admin />}/>
          <Route path="/done" element={<Done />}/>
          <Route path="/User" element={<User />}/>
          <Route path="/Dashboard" element={<Dashboard />}/> */}

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
