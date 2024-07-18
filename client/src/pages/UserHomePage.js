//C:\Users\hp\Desktop\Job-Posting-and-Searching-Platform\client\src\pages\UserHomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/UserHomePage.css';

const UserHomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handlePostJobClick = () => {
    navigate('/postjob'); // Navigate to the Post a Job page
  };

  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className="content">
          {user && <h3>Welcome, {user.firstName}!</h3>}
          <div className="profile-and-jobs">
            <div className="profile-card">
              <div className="profile-header">
                <img src="path-to-user-image" alt="User" className="profile-image" />
                <div className="profile-info">
                  <h2 className="profile-name">George Levinson</h2>
                  <p className="profile-role">Employee</p>
                  <p className="profile-location">USA, Illinois, Chicago</p>
                </div>
              </div>
              <hr />
              <div className="profile-details">
                <div className="profile-questions">
                  <p><strong>Current Position</strong></p>
                  <p><strong>Industry</strong></p>
                  <p><strong>Phone Number</strong></p>
                  <p><strong>Email</strong></p>
                  <p><strong>LinkedIn</strong></p>
                </div>
                <div className="profile-answers">
                  <p> UX/UI Designer</p>
                  <p> Computer Networking</p>
                  <p> 001-541-754-3010</p>
                  <p> danielqqq@gmail.com</p>
                  <p> <a href="https://www.linkedin.com/in/">linkedin.com/in/</a></p>
                </div>
              </div>
            </div>
            <div className="job-listings">
              <div className="status">
                <div className="job-header">
                  <h4 className="job-title">Update Employment Status</h4>
                </div>
              </div>
              <div className="post-a-job" onClick={handlePostJobClick}>
                <div className="job-header">
                  <h4 className="job-title">Are you hiring? Post a Job</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat-card">
              <h4>Accepted Jobs</h4>
              <p className="stat-number" data-progress="50">50</p>
              <p>During 3 months</p>
            </div>
            <div className="stat-card">
              <h4>Viewed By</h4>
              <p className="stat-number" data-progress="75">75</p>
              <p>During 3 months</p>
            </div>
            <div className="stat-card">
              <h4>Invited</h4>
              <p className="stat-number" data-progress="25">25</p>
              <p>During 3 months</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
