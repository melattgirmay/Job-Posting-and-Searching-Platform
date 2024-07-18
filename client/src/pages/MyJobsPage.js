import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MyJobsPage.css';

const MyJobsPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handlePostedJobsClick = () => {
    navigate('/my-posted-jobs'); // Navigate to the Post a Job page
  };

  const handleSavedJobsClick = () => {
    navigate('/my-saved-jobs'); // Navigate to the Post a Job page
  };

  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className='my-jobs-page'>
            <div className="posted-jobs" onClick={handlePostedJobsClick}>
              <div className="job-header">
                <h4>My Posted Jobs</h4>
              </div>
            </div>
            <div className="saved-jobs" onClick={handleSavedJobsClick}>
              <div className="job-header">
                <h4>My Saved Jobs</h4>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyJobsPage;
