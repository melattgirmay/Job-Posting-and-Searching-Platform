// Job-Posting-and-Searching-Platform\client\src\pages\HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';
import yourGif from '../assets/Desk.gif';

function HomePage() {
  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
        </div>
        <div className="signup-button">
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>
      <div className='container'>
        <div className="image">
          <img src={yourGif} alt="Job Posting Platform" />
        </div>
        <div className="content">
          <h1>Welcome to Job Platform</h1>
          <p>
            Job Platform is your one-stop solution for finding your dream job. 
            We connect job seekers with top companies across various industries. 
            Our platform offers a wide range of job listings, 
            from entry-level positions to senior executive roles.
          </p>
          <a href="/login"><button> Log in</button></a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
