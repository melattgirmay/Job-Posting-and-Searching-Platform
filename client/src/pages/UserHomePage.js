// Job-Posting-and-Searching-Platform\client\src\pages\UserHomePage.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/UserHomePage.css';

const UserHomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className="content">
          {user && <h3>Welcome, {user.firstName}!</h3>}
          {/* Your main content goes here */}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
