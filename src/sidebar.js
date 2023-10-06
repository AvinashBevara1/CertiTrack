import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./nav.css";
import axios from "axios";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.pathname);
  // const [leadids, setLeadIds] = useState([]);
  const [isManager, setIsManager] = useState(false);

  // Define an array of routes and their corresponding text labels
  const routes = [
    { path: "/", label: "Home" },
    { path: "/new-certification", label: "Start Certification" },
    { path: "/add-existing-certification", label: "Add Certification" },
    { path: "/my-certification", label: "My Certifications" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/lead")
      .then((response) => {
        // setLeadIds(response.data.lead);

        // Check if the user is a manager based on empid
        const empid = sessionStorage.getItem('empid');
        // console.log(response.data.lead)
        // console.log(leadids)
        setIsManager(response.data.lead.includes(empid));
      })
      .catch((error) => {
        console.error("Error fetching Lead Ids:", error);
      });
  }, []); // Empty dependency array to fetch data once when the component mounts

  // If the user is a manager, add the "Manager tab" to the routes
  if (isManager) {
    routes.push({ path: "/manager-tab", label: "My Team" });
  }

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="sidebar">
      <ul>
        {routes.map((route, index) => (
          <li
            key={index}
            className={activeTab === route.path ? "active" : ""}
            onClick={() => handleTabClick(route.path)}
          >
            <Link to={route.path}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
