import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { IoBookmark } from "react-icons/io5";
import '../styles/JobSearchPage.css';

const JobSearchPage = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState({
    title: '',
    location: '',
    type: 'Full-time',
    level: 'Entry-level',
    salary: '',
    description: '',
    responsibilities: '',
    requirements: '',
    remoteOption: 'Remote',
  });
  const [detailedJob, setDetailedJob] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axiosInstance.get('/searchJobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleJobDetails = async (jobId) => {
    try {
      const response = await axiosInstance.get(`/jobs/${jobId}`);
      setDetailedJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
    }
  };

  const closeJobDetails = () => {
    setDetailedJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    if (type === 'checkbox') {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        [name]: checked ? value : '',
      }));
    } else {
      setJobDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get('/searchJobs', {
        params: jobDetails,
      });
      setJobs(response.data);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className="job-search-page">
          <header className="job-search-header">
            <div className="header-left">
              <input
                type="text"
                name="title"
                placeholder="Search by job title, company, keywords"
                value={jobDetails.title}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="location"
                placeholder="Work location (Country, City)"
                value={jobDetails.location}
                onChange={handleInputChange}
              />
              <select
                name="type"
                value={jobDetails.type}
                onChange={handleInputChange}
              >
                <option value="">Industry</option>
                <option value="it">Information Technology</option>
                <option value="healthcare">Healthcare</option>
                <option value="finance">Finance</option>
                <option value="engineering">Engineering</option>
                <option value="education">Education</option>
                <option value="sales">Sales and Marketing</option>
                <option value="retail">Retail</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="hospitality">Hospitality and Tourism</option>
                <option value="construction">Construction</option>
                <option value="legal">Legal</option>
                <option value="arts">Arts and Entertainment</option>
                <option value="hr">Human Resources</option>
                <option value="science">Science and Research</option>
                <option value="logistics">Logistics and Transportation</option>
                <option value="government">Government and Public Administration</option>
                <option value="nonprofit">Nonprofit and NGOs</option>
              </select>
              <select
                name="createdAt"
                value={jobDetails.createdAt}
                onChange={handleInputChange}
              >
                <option value="">Anytime</option>
                <option value="past-24-hours">Past 24 hours</option>
                <option value="past-week">Past Week</option>
                <option value="past-month">Past Month</option>
                <option value="past-year">Past Year</option>
              </select>
            </div>
            <div className="header-right">
              <span>Salary range</span>
              <input
                type="number"
                name="salary"
                placeholder="Minimum Salary"
                value={jobDetails.salary}
                onChange={handleInputChange}
              />
            </div>
          </header>
          <main>
            <aside className="filters">
              <div>
                <h3>Employment type</h3>
                <label><input type="checkbox" name="type" value="Full-time" onChange={handleInputChange} /> Full time</label>
                <label><input type="checkbox" name="type" value="Part-time" onChange={handleInputChange} /> Part-time</label>
                <label><input type="checkbox" name="type" value="Contract" onChange={handleInputChange} /> Contract</label>
                <label><input type="checkbox" name="type" value="Freelance" onChange={handleInputChange} /> Freelance</label>
                <label><input type="checkbox" name="type" value="Internship" onChange={handleInputChange} /> Internship</label>
              </div>
              <div>
                <h3>Remote Options</h3>
                <label><input type="checkbox" name="remoteOption" value="Remote" onChange={handleInputChange} /> Remote</label>
                <label><input type="checkbox" name="remoteOption" value="Hybrid" onChange={handleInputChange} /> Hybrid</label>
                <label><input type="checkbox" name="remoteOption" value="On-site" onChange={handleInputChange} /> On-site</label>
              </div>
              <div>
                <h3>Experience Level</h3>
                <label><input type="checkbox" name="level" value="Entry-level" onChange={handleInputChange} /> Entry-level</label>
                <label><input type="checkbox" name="level" value="Mid-level" onChange={handleInputChange} /> Mid-level</label>
                <label><input type="checkbox" name="level" value="Senior-level" onChange={handleInputChange} /> Senior-level</label>
              </div>
            </aside>
            <section className="recommended-jobs">
              <div className="recommended-jobs-header">
                <button className="search-button" onClick={handleSearch}>Search</button>
                <h2>Recommended jobs</h2>
              </div>
              <div className="job-cards">
                {jobs.length > 0 ? (
                  jobs.map((job) => (
                    <div key={job.id} className="job-card">
                      <div className="job-card-header">
                        <span className="job-date">{new Date(job.created_at).toLocaleDateString()}</span>
                        <span className="bookmark-icon"><IoBookmark /></span>
                      </div>
                      <div className="job-card-body">
                        <h3 className="job-title">{job.title}</h3>
                        <p className="job-company">{job.company}</p>
                        <div className="tags">
                          <span className="job-tag">{job.type}</span>
                          <span className="job-tag">{job.level}</span>
                          <span className="job-tag">{job.remote_option}</span>
                        </div>
                        <div className="job-card-footer">
                          <span className="job-salary">{job.salary}</span>
                          <span className="job-location">{job.location}</span>
                        </div>
                      </div>
                      <button className="details-button" onClick={() => handleJobDetails(job.id)}>Details</button>
                    </div>
                  ))
                ) : (
                  <p>No jobs found</p>
                )}
              </div>
            </section>
          </main>
        </div>
        {/* Job Detail */}
        {detailedJob && (
          <div className="preview-overlay">
            <div className="preview">
              <div className="preview-card">
                <div className="preview-card-header">
                  <span className="preview-date">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="preview-card-body">
                  <h1 className="preview-title">{detailedJob.title}</h1>
                  <p className="preview-description">{detailedJob.description}</p>
                  <p className="preview-responsibilities">{detailedJob.responsibilities}</p>
                  <p className="preview-requirements">{detailedJob.requirements}</p>
                  <div className="preview-tags">
                    <span className="preview-tag">{detailedJob.type}</span>
                    <span className="preview-tag">{detailedJob.level}</span>
                    <span className="preview-tag">{detailedJob.remote_option}</span>
                  </div>
                  <div className="preview-card-footer">
                    <span className="preview-salary">Salary: {detailedJob.salary}</span>
                    <span className="preview-location">{detailedJob.location}</span>
                  </div>
                </div>
              </div>
              <div className="preview-buttons">
                <button onClick={closeJobDetails}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;
