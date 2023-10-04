import React from 'react';
import "./nav.css"
import { useNavigate } from 'react-router-dom';
import finallogo from './CertiTrackLogoBefore-removebg-preview.png'

function TopBar() {

  const navigate=useNavigate();

  function handlelogout(){
    sessionStorage.clear();
    navigate("/login");
  }

  return (
    <div className="topbar">
      <div className="profile">
      <img src={finallogo}  alt="Certi-Track"  height={50}/>
        {/* <span>Cert-Track</span> */}
      </div>
      <div className="logout">
        <button onClick={handlelogout}>Logout</button>
      </div>
    </div>
  );
}

export default TopBar;
