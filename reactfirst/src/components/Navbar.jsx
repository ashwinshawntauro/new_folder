// src/components/Navbar.jsx

import React from 'react';
import { Link , useLocation} from 'react-router-dom';
import '../styles/common.css';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <ul className="navbar-links">
          
        <li className={location.pathname === "/parts" ? "active" : ""}>
                        <Link to="/parts">Parts</Link>
                    </li>
                    <li className={location.pathname === "/vendor" ? "active" : ""}>
                        <Link to="/vendor">Vendor</Link>
                    </li>
                    <li className={location.pathname === "/project" ? "active" : ""}>
                        <Link to="/project">Project</Link>
                    </li>
                    <li className={location.pathname === "/purchase-requisitions" ? "active" : ""}>
                        <Link to="/purchase-requisitions">Purchase Requisitions</Link>
                    </li>
                    <li className={location.pathname === "/purchase-order" ? "active" : ""}>
                        <Link to="/purchase-order">Purchase Order</Link>
                    </li>
                    
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
