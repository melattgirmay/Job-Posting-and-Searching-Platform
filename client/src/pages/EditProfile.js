import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';

const EditProfile = ({ email }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    city: '',
    state: '',
    country: '',
    resumeLink: '',
    education: [
      {
        collegeName: '',
        degreeType: '',
        major: '',
        startDate: '',
        endDate: '',
        honors: '',
        city: '',
        country: '',
      }
    ],
    jobExperience: [
      {
        jobTitle: '',
        employer: '',
        jobCity: '',
        jobCountry: '',
        jobStartDate: '',
        jobEndDate: '',
        jobDescription: '',
        currentJob: false,
      }
    ],
    skills: '',
    certifications: '',
    languages: '',
    portfolioLink: '',
    employmentStatus: '',
    jobSearchStatus: '',
    companyName: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (email) {
      fetchUserData();
    }
  }, [email]);

  const handleChange = (e, index = null, section = null) => {
    const { name, value, type, checked } = e.target;
    if (section) {
      const newSection = [...userData[section]];
      newSection[index][name] = type === 'checkbox' ? checked : value;
      setUserData({
        ...userData,
        [section]: newSection,
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
  };

  const handleAddEducation = () => {
    setUserData({
      ...userData,
      education: [
        ...userData.education,
        {
          collegeName: '',
          degreeType: '',
          major: '',
          startDate: '',
          endDate: '',
          honors: '',
          city: '',
          country: '',
        }
      ]
    });
  };

  const handleAddJobExperience = () => {
    setUserData({
      ...userData,
      jobExperience: [
        ...userData.jobExperience,
        {
          jobTitle: '',
          employer: '',
          jobCity: '',
          jobCountry: '',
          jobStartDate: '',
          jobEndDate: '',
          jobDescription: '',
          currentJob: false,
        }
      ]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setMessage('Profile updated successfully!');
  };

  return (
    <div className='form-wrapper'>
      <div className="form-container">
        <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>

          <div className="form-section">
            <h3>Personal Information</h3>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={userData.firstName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={userData.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={userData.email}
                onChange={handleChange}
                disabled // Prevent editing email
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Mobile Phone"
                value={userData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={userData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State/Province"
                value={userData.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={userData.country}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Education</h3>
            {userData.education.map((edu, index) => (
              <div key={index}>
                <div className="form-row">
                  <input
                    type="text"
                    name="collegeName"
                    placeholder="College Name"
                    value={edu.collegeName}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                  <input
                    type="text"
                    name="degreeType"
                    placeholder="Degree Type"
                    value={edu.degreeType}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="major"
                    placeholder="Major"
                    value={edu.major}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                  <input
                    type="text"
                    name="startDate"
                    placeholder="Start Date"
                    value={edu.startDate}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                  <input
                    type="text"
                    name="endDate"
                    placeholder="End Date"
                    value={edu.endDate}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="honors"
                    placeholder="Honors/Awards"
                    value={edu.honors}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={edu.city}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={edu.country}
                    onChange={(e) => handleChange(e, index, 'education')}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddEducation}>+ Add Education</button>
          </div>

          <div className="form-section">
            <h3>Job Experience</h3>
            {userData.jobExperience.map((job, index) => (
              <div key={index}>
                <div className="form-row">
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={job.jobTitle}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                  />
                  <input
                    type="text"
                    name="employer"
                    placeholder="Employer/Company"
                    value={job.employer}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="jobCity"
                    placeholder="City"
                    value={job.jobCity}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                  />
                  <input
                    type="text"
                    name="jobCountry"
                    placeholder="Country"
                    value={job.jobCountry}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                  />
                </div>
                <div className="form-row">
                  <input
                    type="text"
                    name="jobStartDate"
                    placeholder="Start Date"
                    value={job.jobStartDate}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                  />
                  <input
                    type="text"
                    name="jobEndDate"
                    placeholder="End Date"
                    value={job.jobEndDate}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                    disabled={job.currentJob}
                  />
                  <label>
                    <input
                      type="checkbox"
                      name="currentJob"
                      checked={job.currentJob}
                      onChange={(e) => handleChange(e, index, 'jobExperience')}
                    />
                    Current Job
                  </label>
                </div>
                <div className="form-row">
                  <textarea
                    name="jobDescription"
                    placeholder="Job Description"
                    value={job.jobDescription}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddJobExperience}>+ Add Job Experience</button>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <div className="form-row">
              <input
                type="text"
                name="skills"
                placeholder="Skills"
                value={userData.skills}
                onChange={handleChange}
              />
              <input
                type="text"
                name="certifications"
                placeholder="Certifications"
                value={userData.certifications}
                onChange={handleChange}
              />
              <input
                type="text"
                name="languages"
                placeholder="Languages"
                value={userData.languages}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="portfolioLink"
                placeholder="Portfolio Link"
                value={userData.portfolioLink}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Employment Status</h3>
            <div className="form-row">
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Employed"
                  checked={userData.employmentStatus === 'Employed'}
                  onChange={handleChange}
                />
                Employed
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Unemployed"
                  checked={userData.employmentStatus === 'Unemployed'}
                  onChange={handleChange}
                />
                Unemployed
              </label>
            </div>
            {userData.employmentStatus === 'Employed' && (
              <div className="form-row">
                <label>
                  <input
                    type="radio"
                    name="jobSearchStatus"
                    value="Looking for a job"
                    checked={userData.jobSearchStatus === 'Looking for a job'}
                    onChange={handleChange}
                  />
                  Looking for a job
                </label>
                <label>
                  <input
                    type="radio"
                    name="jobSearchStatus"
                    value="Not looking for a job"
                    checked={userData.jobSearchStatus === 'Not looking for a job'}
                    onChange={handleChange}
                  />
                  Not looking for a job
                </label>
              </div>
            )}
            {userData.employmentStatus === 'Employed' && (
              <div className="form-row">
                <label>
                  <input
                    type="radio"
                    name="workType"
                    value="Own Business"
                    checked={userData.workType === 'Own Business'}
                    onChange={handleChange}
                  />
                  Own Business
                </label>
                <label>
                  <input
                    type="radio"
                    name="workType"
                    value="Company"
                    checked={userData.workType === 'Company'}
                    onChange={handleChange}
                  />
                  Company
                </label>
              </div>
            )}
            {userData.workType === 'Company' && (
              <div className="form-row">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={userData.companyName}
                  onChange={handleChange}
                />
              </div>
            )}
          </div>

          <button type="submit">Update Profile</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <div className='profile-wrapper'>
        <img src="path-to-user-image" alt="User" className="profile-image" />
      </div>
    </div>
  );
};

export default EditProfile;
