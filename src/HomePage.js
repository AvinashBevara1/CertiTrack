import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function Home() {
  return (
    <div className="home-page">
      <header>
        <h1>Your App Name</h1>
      </header>
      <div className="container">
        <nav className="sidebar">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/add-certification">Add Certification</Link></li>
            <li><Link to="/my-certifications">My Certifications</Link></li>
            {/* Add additional sidebar items here */}
          </ul>
        </nav>
        <main>
          {/* Main content for the home page */}
        </main>
      </div>
    </div>
  );
}

export default Home;
