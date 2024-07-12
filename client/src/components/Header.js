import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaAngleDoubleUp, FaAngleDoubleDown } from 'react-icons/fa';
import '../styles/Header.css';

const Header = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  const toggleHeader = () => {
    setIsHeaderVisible(!isHeaderVisible);
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleEditProfile = () => {
    setShowDropdown(false);
    navigate('/edit-profile');
  };

  const getUserInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <div>
      <button className="header-toggle-button" onClick={toggleHeader}>
        {isHeaderVisible ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
      </button>
      
      <div className={`header-container ${isHeaderVisible ? '' : 'hidden'}`}>
        <input type="text" placeholder="Quick Search" className="search-input" />
        <div className="user-info">
          <div className="dropdown-container">
            <div className="user-initials" onClick={toggleDropdown}>
              {user ? getUserInitials(user.firstName) : ''}
            </div>
            <div className={`dropdown-content ${showDropdown ? 'show' : ''}`}>
              <div className="dropdown-item" onClick={handleEditProfile}>Edit Profile</div>
              <div className="dropdown-item">My Account</div>
              <div className="dropdown-item">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
