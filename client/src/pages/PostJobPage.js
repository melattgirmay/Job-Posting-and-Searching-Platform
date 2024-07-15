// C:\Users\hp\Desktop\Job-Posting-and-Searching-Platform\client\src\pages\PostJobPage.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig'; // Import the configured axios instance
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styled from 'styled-components';
import '../styles/PostJobPage.css'; // Make sure to change this to 'PostJobPage.css' if you named your CSS file differently

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
    transform: scale(1.2);
  }
`;

const PostJob = () => {
  const [step, setStep] = useState(1);
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

  const [previewJob, setPreviewJob] = useState(null); // State to hold preview job data

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      
      // Use 'user' if needed
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/postJob', jobDetails);
      console.log('Job posted successfully:', response.data);
      alert('Job posted successfully');
      setPreviewJob(null);
      // Handle success, such as updating state or showing a success message
    } catch (error) {
      console.error('Error posting job:', error);
      // Handle error, such as displaying an error message
    }
  };

  const nextStep = () => {
    // Check if all required fields are filled before proceeding
    if (step === 1 && (!jobDetails.title || !jobDetails.location)) {
      alert('Please fill in Job Title and Location');
      return;
    }
    if (step === 3 && (!jobDetails.salary || !jobDetails.description)) {
      alert('Please fill in the Salary and Description of the job');
      return;
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handlePreview = () => {
    if (!jobDetails.requirements) {
      alert('Please fill in the requirements for the job');
      return;
    }
    setPreviewJob(jobDetails); // Set preview job details for display
  };

  const cancelPreview = () => {
    setPreviewJob(null);
  };

  return (
    <div className="post-job-homepage">
      <Sidebar />
      <div className="post-job-content">
        <Header />
        <div className="post-job-page">
          <header className="post-job-header">
            <h1>Post a Job</h1>
            <div className="steps">
              <span className={step === 1 ? 'active' : ''}>Step 1</span>
              <span className={step === 2 ? 'active' : ''}>Step 2</span>
              <span className={step === 3 ? 'active' : ''}>Step 3</span>
              <span className={step === 4 ? 'active' : ''}>Step 4</span>
            </div>
          </header>
          <main>
            {step === 1 && (
              <div className="step-content">
                <h2>1/4: Job Title & Location</h2>
                <StyledInput
                  type="text"
                  name="title"
                  placeholder="Job Title"
                  value={jobDetails.title}
                  required
                  onChange={handleChange}
                />
                <StyledInput
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={jobDetails.location}
                  required
                  onChange={handleChange}
                />
                <StyledButton onClick={nextStep}>Next</StyledButton>
              </div>
            )}
            {step === 2 && (
              <div className="step-content">
                <h2>2/4: Job Type & Level</h2>
                <StyledSelect name="type" value={jobDetails.type} onChange={handleChange}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Internship">Internship</option>
                </StyledSelect>
                <StyledSelect name="level" value={jobDetails.level} onChange={handleChange}>
                  <option value="Entry-level">Entry-level</option>
                  <option value="Mid-level">Mid-level</option>
                  <option value="Senior-level">Senior-level</option>
                </StyledSelect>
                <StyledButton onClick={prevStep}>Back</StyledButton>
                <StyledButton onClick={nextStep}>Next</StyledButton>
              </div>
            )}
            {step === 3 && (
              <div className="step-content">
                <h2>3/4: Salary & Description</h2>
                <StyledInput
                  type="number"
                  name="salary"
                  placeholder="Salary (In birr)"
                  value={jobDetails.salary}
                  onChange={handleChange}
                />
                <StyledTextarea
                  name="description"
                  placeholder="Job Description"
                  value={jobDetails.description}
                  required
                  onChange={handleChange}
                ></StyledTextarea>
                <StyledButton onClick={prevStep}>Back</StyledButton>
                <StyledButton onClick={nextStep}>Next</StyledButton>
              </div>
            )}
            {step === 4 && (
              <div className="step-content">
                <h2>4/4: Responsibilities, Requirements & Remote Option</h2>
                <StyledTextarea
                  name="responsibilities"
                  placeholder="Job Responsibilities"
                  value={jobDetails.responsibilities}
                  onChange={handleChange}
                ></StyledTextarea>
                <StyledTextarea
                  name="requirements"
                  placeholder="Job Requirements"
                  value={jobDetails.requirements}
                  onChange={handleChange}
                  required
                ></StyledTextarea>
                <StyledSelect
                  name="remoteOption"
                  value={jobDetails.remoteOption}
                  onChange={handleChange}
                >
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="On-site">On-site</option>
                </StyledSelect>
                <StyledButton onClick={prevStep}>Back</StyledButton>
                <StyledButton onClick={handlePreview}>Preview</StyledButton>
              </div>
            )}
          </main>
        </div>
        {/* Job Preview */}
        {previewJob && (
          <div className="preview-preview-overlay">
            <div className="preview-preview">
              <div className="preview-card">
                <div className="preview-card-header">
                  {/* Adjust as per your preview data structure */}
                  <span className="preview-date">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="preview-card-body">
                  <h1 className="preview-title">{previewJob.title}</h1>
                  <p className="preview-description">{previewJob.description}</p>
                  <p className="preview-responsibilities">{previewJob.responsibilities}</p>
                  <p className="preview-requirements">{previewJob.requirements}</p>
                  <div className="preview-tags">
                    <span className="preview-tag">{previewJob.type}</span>
                    <span className="preview-tag">{previewJob.level}</span>
                    <span className="preview-tag">{previewJob.remoteOption}</span>
                  </div>
                  <div className="preview-card-footer">
                    <span className="preview-salary">Salary: Birr {previewJob.salary}</span>
                    <span className="preview-location">{previewJob.location}</span>
                  </div>
                </div>
              </div>
              <div className="preview-buttons">
                <StyledButton onClick={cancelPreview}>Cancel</StyledButton>
                <StyledButton onClick={handleSubmit}>Post Job</StyledButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostJob;
