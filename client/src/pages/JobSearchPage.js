import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { IoBookmark } from "react-icons/io5";
import '../styles/JobSearchPage.css';

const JobSearchPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const jobs = [
    { id: 1, date: '20 May, 2023', company: 'Amazon', title: 'Senior UI/UX Designer', type: 'Part time', level: 'Senior level', location: 'Remote', salary: '$250/hr', locationDetails: 'San Francisco, CA' },
    { id: 2, date: '4 Feb, 2023', company: 'Google', title: 'Junior UI/UX Designer', type: 'Full time', level: 'Junior level', location: 'Remote', salary: '$150/hr', locationDetails: 'California, CA' },
    { id: 3, date: '29 Jan, 2023', company: 'Dribbble', title: 'Senior Motion Designer', type: 'Part time', level: 'Senior level', location: 'On-site', salary: '$260/hr', locationDetails: 'New York, NY' },
    { id: 4, date: '20 May, 2023', company: 'Amazon', title: 'Senior UI/UX Designer', type: 'Part time', level: 'Senior level', location: 'Remote', salary: '$250/hr', locationDetails: 'San Francisco, CA' },
    { id: 5, date: '4 Feb, 2023', company: 'Google', title: 'Junior UI/UX Designer', type: 'Full time', level: 'Junior level', location: 'Remote', salary: '$150/hr', locationDetails: 'California, CA' },
    { id: 6, date: '29 Jan, 2023', company: 'Dribbble', title: 'Senior Motion Designer', type: 'Part time', level: 'Senior level', location: 'On-site', salary: '$260/hr', locationDetails: 'New York, NY' },
    { id: 7, date: '20 May, 2023', company: 'Amazon', title: 'Senior UI/UX Designer', type: 'Part time', level: 'Senior level', location: 'Remote', salary: '$250/hr', locationDetails: 'San Francisco, CA' },
    { id: 8, date: '4 Feb, 2023', company: 'Google', title: 'Junior UI/UX Designer', type: 'Full time', level: 'Junior level', location: 'Remote', salary: '$150/hr', locationDetails: 'California, CA' },
    { id: 9, date: '29 Jan, 2023', company: 'Dribbble', title: 'Senior Motion Designer', type: 'Part time', level: 'Senior level', location: 'On-site', salary: '$260/hr', locationDetails: 'New York, NY' },
  ];

  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className="job-search-page">
          <header className="job-search-header">
            <div className="header-left">
              <input type="text" placeholder="Search by job title, company, keywords" />
              <input type="text" placeholder="Work location (Country, City)" />
              <select>
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
              <select id="date-posted-filter">
                <option value="anytime">Anytime</option>
                <option value="past-24-hours">Past 24 hours</option>
                <option value="past-week">Past Week</option>
                <option value="past-month">Past Month</option>
                <option value="past-year">Past Year</option>
              </select>
            </div>
            <div className="header-right">
              <span>Salary range</span>
              <input type="range" min="1200" max="20000" step="100" />
            </div>
          </header>
          <main>
            <aside className="filters">
              <div>
                <h3>Employment type</h3>
                <label><input type="checkbox" /> Full time</label>
                <label><input type="checkbox" /> Part-time</label>
                <label><input type="checkbox" /> Contract</label>
                <label><input type="checkbox" /> Freelance</label>
                <label><input type="checkbox" /> Internship</label>
              </div>
              <div>
                <h3>Remote Options</h3>
                <label><input type="checkbox" /> Remote</label>
                <label><input type="checkbox" /> Hybrid</label>
                <label><input type="checkbox" /> On-site</label>
              </div>
              <div>
                <h3>Experience Level</h3>
                <label><input type="checkbox" /> Entry-level</label>
                <label><input type="checkbox" /> Mid-level</label>
                <label><input type="checkbox" /> Senior-level</label>
              </div>
            </aside>
            <section className="recommended-jobs">
              <h2>Recommended jobs</h2>
              <div className="job-cards">
                {jobs.map((job) => (
                  <div key={job.id} className="job-card">
                    <div className="job-card-header">
                      <span className="job-date">{job.date}</span>
                      <span className="bookmark-icon"><IoBookmark /></span>
                    </div>
                    <div className="job-card-body">
                      <h3 className="job-title">{job.title}</h3>
                      <p className="job-company">{job.company}</p>
                      <div className="tags">
                        <span className="job-tag">{job.type}</span>
                        <span className="job-tag">{job.level}</span>
                        <span className="job-tag">{job.location}</span>
                        <span className="job-tag">Project work</span>
                        <span className="job-tag">Flexible Schedule</span>
                      </div>
                      <div className="job-card-footer">
                        <span className="job-salary">{job.salary}</span>
                        <span className="job-location">{job.locationDetails}</span>
                      </div>
                    </div>
                    <button className="details-button">Details</button>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default JobSearchPage;
