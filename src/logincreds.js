import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './logincreds.css'; // Import your CSS file

function MyComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    // You would typically perform authentication here
    // For simplicity, let's assume the login is successful
    // and redirect to the home page
    sessionStorage.setItem('empid', username);
    navigate('/');
  };

  return (
    <div className="my-component">
      <h1>Login to Certi-Track</h1>
      <div className="input-container">
        <label className='login-username' htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
      </div>
      <div className="input-container">
        <label className='login-password' htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
        />
      </div>
      <button onClick={handleLogin}>Submit</button>
    </div>
  );
}

export default MyComponent;
