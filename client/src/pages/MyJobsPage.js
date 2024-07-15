//C:\Users\hp\Desktop\Job-Posting-and-Searching-Platform\client\src\pages\MyJobsPage.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MyJobsPage.css';

const MyJobsPage = () => {
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
        <div className="my-jobs-page ">
          <h3>My Jobs Page</h3>
          {/* My Jobs page content */}
        </div>
      </div>
    </div>
  );
};

export default MyJobsPage;
