import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";

function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new-certification">New Certification</Link>
        </li>
        <li>
          <Link to="/add-existing-certification">Add existing Certification</Link>
        </li>
        <li>
          <Link to="/my-certification">My Certifications</Link>
        </li>
        <li>
          <Link to="/manager-tab">Manager tab</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
