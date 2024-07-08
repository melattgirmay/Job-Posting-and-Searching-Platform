// Job-Posting-and-Searching-Platform\client\src\components\Sidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaCalendar, FaSignOutAlt } from 'react-icons/fa';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="sidebar-container">
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
  );
};

export default Sidebar;
