import React from 'react';
import '../styles/common.css';
import Navbar from '../components/Navbar';
import Header from '../components/Header'; // Assuming Navbar exists

const Home = () => {
  
  return (
    <div className="home-container">
      <Header/>

      {/* Navbar below header */}  
      <Navbar />

      {/* Add navigation links or components */}
      
      <div className="home-links">
        <div className="home1">
          <h2>DASHBOARD</h2>
          <p>Procurement and Project Management</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
