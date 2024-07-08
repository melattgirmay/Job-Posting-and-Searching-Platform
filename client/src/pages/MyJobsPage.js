// Job-Posting-and-Searching-Platform\client\src\pages\MyJobsPage.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MyJobsPage.css';

const MyJobsPage = () => {
  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <h3>My Jobs Page</h3>
          {/* My Jobs page content */}
        </div>
      </div>
    </div>
  );
};

export default MyJobsPage;
