import React, { useState, useEffect } from 'react';
import './styles/App.css';
import './styles/common.css';
import 'bootstrap/dist/css/bootstrap.min.css' ;
import axios from 'axios';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// Import components
import Home from './pages/Home';
import Parts from './pages/Parts'; 
import Vendor from './pages/Vendor'; 
import Project from './pages/Project'; 
import PurchaseOrder from './pages/PurchaseOrder'; 
import PurchaseRequisition from './pages/PurchaseRequisitions'; 
import UserManagement from './pages/UserManagement';

// Define the Login Component
function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      console.log('Attempting login with:', { username, password }); // Debug log

      const response = await axios.post('http://localhost:5000/auth/login', {
          username: username,
          password: password
      });

      console.log('Login response:', response.data); // Debug log

      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      navigate('/home');
    } catch (err) {
      console.log('Full error:', err); // More detailed error logging
      console.log('Error response:', err.response?.data); // Show the error response
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
};

  return (
    <div className="login-container1">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <img src="/Zosh_Logo22.png" alt="Logo" className="logo" />
          <h2>GRID</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
// Create a protected route wrapper
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  
  useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token && window.location.pathname !== '/user-management') {
          navigate('/');
      }
  }, [navigate]);

  return children;
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} /> {/* Login page */}
        <Route path="/home" element={
                    <Home/>
            } />
        
        <Route path="/parts" element={
                        <Parts />
                   } />
        <Route path="/vendor" element={
                        <Vendor />
                    } />
        <Route path="/project" element={
                        <Project />
                    } />
        <Route path="/purchase-requisition" element={
                        <PurchaseRequisition />
                   } />
        <Route path="/purchase-order" element={
                        <PurchaseOrder />

                  } />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
