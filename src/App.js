import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Certifications from "./certificationlist";
import Login from "./LoginPage";
import Qa from "./QA";
import Dashboard from "./Dashboard";
import Home from "./certitrackapp";
import SideBar from "./sidebar";
import TopBar from "./topbar";
import AddCertificate from "./NewCertification";

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
            <div>
              <TopBar />
              <div className="entireview">
                <div className="maincontainer">
                  <SideBar />
                  
                  {/* Nested routes for main content */}
                  <Routes>
                    {/* Nested route for the root path */}
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home/>}/>
                    <Route path="/add-certificate" element={<AddCertificate />} />
                    <Route path="/my-certifications" element={<Qa />} />
                    <Route path="/QA/:certificateID" element={<Qa />} />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
