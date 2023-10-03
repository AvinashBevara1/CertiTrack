import React from 'react';
import { Link } from 'react-router-dom';
import "./nav.css"

function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-certificate">New Certification</Link>
        </li>
        <li>
          <Link to="/mycertifications">My Certifications</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
