//C:\Users\hp\Desktop\Job-Posting-and-Searching-Platform\client\src\components\Sidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaCalendar, FaSignOutAlt } from 'react-icons/fa';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        localStorage.removeItem('user'); // Clear user data from localStorage
        navigate('/'); // Redirect to login page
      } else {
        console.error('Failed to logout:', response.statusText);
        // Handle error or notify the user
      }
    } catch (error) {
      console.error('Failed to logout:', error.message);
      // Handle error or notify the user
    }
  };  

  return (
    <div>
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        {isSidebarVisible ? <FaAngleDoubleLeft /> : <FaAngleDoubleRight />}
      </button>
      <div className={`sidebar-container ${isSidebarVisible ? '' : 'hidden'}`}>
        <Link to="/userhomepage" className="sidebar-item">
          <div className="sidebar-icon">
            <FaHome />
          </div>
          Home
        </Link>
        <Link to="/job-search" className="sidebar-item">
          <div className="sidebar-icon">
            <FaSearch />
          </div>
          Job Search
        </Link>
        <Link to="/my-jobs" className="sidebar-item">
          <div className="sidebar-icon">
            <FaCalendar />
          </div>
          My Jobs
        </Link>
        <div className="sidebar-item" onClick={handleLogout}>
          <div className="sidebar-icon">
            <FaSignOutAlt />
          </div>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
