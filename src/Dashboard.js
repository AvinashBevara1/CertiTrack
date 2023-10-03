import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import Certifications from "./certificationlist";

function Dashboard() {
  return(
    <div className="dashboard">
        <Certifications/>
    </div>
  );
}

export default Dashboard;
