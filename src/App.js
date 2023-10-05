import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Certifications from "./certificationlist";
import Login from "./LoginPage";
import Qa from "./QA";
import SideBar from "./sidebar";
import TopBar from "./topbar";
import NewCertification from "./NewCertification";
import Mycertification from "./MyCertification";
import RequestApprovalTab from "./ManagerTab";
import AddCertificate from "./AddCompletedCertificate";

function App() {
  return (
    <Router>
      <Routes>
        {/* Separate route for the login page */}
        <Route path="/login" element={<Login />} />
        {/* Main layout with top navigation and sidebar */}
        <Route
          path="*"
          element={
            <div className="entireview">
              <TopBar />
                <div className="maincontainer">
                  <SideBar />
                  
                  {/* Nested routes for main content */}
                  <Routes>
                    {/* Nested route for the root path */}
                    <Route index element={<Certifications />} />
                    <Route path="/" element={<Certifications/>}/>
                    <Route path="/new-certification" element={<NewCertification />} />
                    <Route path="/add-existing-certification" element={<AddCertificate/>}/>
                    <Route path="/my-certification" element={<Mycertification/>}/>
                    <Route path="/manager-tab" element={<RequestApprovalTab/>}/>
                    <Route path="/QA/:certificateID" element={<Qa/>} />
                  </Routes>
                </div>
              </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
