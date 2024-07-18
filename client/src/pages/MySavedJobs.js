import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import '../styles/MySavedJobs.css';

const MySavedJobs = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

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
        <div className="my-saved-jobs">
        <button className="toback-link" onClick={() => navigate(-1)}>← Back</button>
         <h3>My Saved Jobs</h3>
        </div>
      </div>
    </div>
  );
};

export default MySavedJobs;
