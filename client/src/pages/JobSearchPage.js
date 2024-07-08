// Job-Posting-and-Searching-Platform\client\src\pages\JobSearchPage.js
import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const JobSearchPage = () => {
  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="content">
          <h3>Job Search Page</h3>
          {/* Job Search page content */}
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;
