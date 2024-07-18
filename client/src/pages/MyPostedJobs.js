import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styled from 'styled-components';
import '../styles/MyPostedJobs.css';

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const StyledButton = styled.button`
  background-color: palevioletred;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  min-width: fit-content;
  margin: 5px;

  &:hover {
    background-color: #2596be;
    transform: scale(0.8);
  }
`;

const MyPostedJobs = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserJobs();
    }
  }, [user]);

  const fetchUserJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/myJobs', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      } else {
        console.error('Failed to fetch user jobs');
      }
    } catch (error) {
      console.error('Error fetching user jobs:', error);
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingJob({ ...editingJob, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${editingJob.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingJob),
      });
      if (response.ok) {
        fetchUserJobs();
        setEditingJob(null);
        alert('Job posted successfully');
      } else {
        console.error('Failed to update job');
      }
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteClick = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/${jobId}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          fetchUserJobs();
          alert('Job deleted successfully');
        } else {
          console.error('Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
      }
    }
  };

  return (
    <div className="user-homepage">
      <Sidebar />
      <div className="main-content">
        <Header user={user} />
        <div className="my-posted-jobs">
          <button className="toback-link" onClick={() => navigate(-1)}>← Back</button>
          <h3>My Posted Jobs</h3>
          {editingJob ? (
            <form onSubmit={handleFormSubmit} className="edit-job-form">
              <StyledInput
                type="text"
                name="title"
                value={editingJob.title}
                onChange={handleInputChange}
                required
              />
              <StyledTextarea
                name="description"
                value={editingJob.description}
                onChange={handleInputChange}
                required
              />
              <StyledTextarea
                name="responsibilities"
                value={editingJob.responsibilities}
                onChange={handleInputChange}
                required
              />
              <StyledTextarea
                name="requirements"
                value={editingJob.requirements}
                onChange={handleInputChange}
                required
              />
              <StyledSelect
                name="type"
                value={editingJob.type}
                onChange={handleInputChange}
                required
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </StyledSelect>
              <StyledSelect
                name="level"
                value={editingJob.level}
                onChange={handleInputChange}
                required
              >
                <option value="Entry-level">Entry-level</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior-level">Senior-level</option>
              </StyledSelect>
              <StyledSelect
                name="remote_option"
                value={editingJob.remote_option}
                onChange={handleInputChange}
                required
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </StyledSelect>
              <StyledInput
                type="number"
                name="salary"
                value={editingJob.salary}
                onChange={handleInputChange}
                required
              />
              <StyledInput
                type="text"
                name="location"
                value={editingJob.location}
                onChange={handleInputChange}
                required
              />
              <StyledButton type="submit">Save</StyledButton>
              <StyledButton type="button" onClick={() => setEditingJob(null)}>Cancel</StyledButton>
            </form>
          ) : (
            <>
              {jobs.length > 0 ? (
                <ul className="job-list">
                  {jobs.map(job => (
                    <li key={job.id} className="job-item">
                      <div className="preview-card">
                        <div className="preview-card-header">
                          <span className="preview-date">{new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                        <div className="preview-card-body">
                          <h1 className="preview-title">{job.title}</h1>
                          <p className="preview-description">{job.description}</p>
                          <p className="preview-responsibilities">{job.responsibilities}</p>
                          <p className="preview-requirements">{job.requirements}</p>
                          <div className="preview-tags">
                            <span className="preview-tag">{job.type}</span>
                            <span className="preview-tag">{job.level}</span>
                            <span className="preview-tag">{job.remote_option}</span>
                          </div>
                          <div className="preview-card-footer">
                            <span className="preview-salary">Salary: {job.salary}</span>
                            <span className="preview-location">{job.location}</span>
                          </div>
                          <StyledButton onClick={() => handleEditClick(job)}>Edit</StyledButton>
                          <StyledButton onClick={() => handleDeleteClick(job.id)}>Delete</StyledButton>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No jobs found</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPostedJobs;
