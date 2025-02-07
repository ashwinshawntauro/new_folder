import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  
  const handleLogout = () => {
    // console.log('Logging out...');
    // localStorage.removeItem('token');
    // localStorage.removeItem('username');
    navigate('/user-management');
    console.log('Navigated to user management');
};



  return (
    <header className="header">
      <div className="header-left">
        <img src="/Zosh_Logo_Light.png" alt="Logo" className="logo1" />
        <h1 className="title" style={{
          color: '#FFFFFF',
          fontSize: '2.5rem',
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 'bold',
          letterSpacing: '3px',
          textAlign: 'center',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          margin: '0',
          padding: '0 20px'
        }}>GRID</h1>

      </div>
      <div className="header-right">
        <span className="username">{username}</span>
        <i className="fas fa-users header-icon" title="Users"></i>
        
        <i 
         className="fas fa-sign-out-alt header-icon logout-icon" 
         onClick={handleLogout}
         title="User Management"
         style={{ cursor: 'pointer' }}
        ></i>
      </div>
    </header>
  );
};

export default Header;
