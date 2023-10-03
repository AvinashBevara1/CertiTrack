import React from 'react';
import "./nav.css"

function TopBar() {
  return (
    <div className="topbar">
      <div className="profile">
        <img src="CT-react-app\src\bmw.jpg" alt="Certi-Track"  width="50" height="60"/>
        {/* <span>Cert-Track</span> */}
      </div>
      <div className="logout">
        <button>Logout</button>
      </div>
    </div>
  );
}

export default TopBar;
