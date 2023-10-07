import React, { useState, useEffect } from 'react';
import './nav.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import finallogo from './CertiTrackLogoBefore-removebg-preview.png';

function TopBar() {
  const navigate = useNavigate();
  const [EmpName, setEmpName] = useState('');
  

  useEffect(() => {
    // Fetch the employee's name from the API
    const EmpID = sessionStorage.getItem('empid'); // Replace with the actual employee ID

    axios
      .get(`http://localhost:8000/getname/${EmpID}`)
      .then((response) => {
        // Assuming the API response contains the employee's name
        const employeeName = response.data.EmpName;
        setEmpName(employeeName);
      })
      .catch((error) => {
        console.error('Error fetching employee name:', error);
      });
  }, []);

  function handleLogout() {
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <div className="topbar">
      <div className="profile">
        <img src={finallogo} alt="Certi-Track" height={50} />
      </div>
      <div className="profilename">
        <h3>{EmpName}</h3>
        <div className="logout">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
