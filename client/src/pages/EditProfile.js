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
    previousJobs: '',
    jobTitles: '',
    companies: '',
    employmentDates: '',
    education: '',
    degrees: '',
    institutions: '',
    graduationDates: '',
    skills: '',
    certifications: '',
    languages: '',
    portfolioLink: '',
  });

  const [message] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className='form-wrapper'>
      <div className="form-container">
        <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
        <form>
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
            <h3>Professional Information</h3>
            <div className="form-row">
              <input
                type="text"
                name="resumeLink"
                placeholder="Resume/CV Link"
                value={userData.resumeLink}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="previousJobs"
                placeholder="Previous Jobs"
                value={userData.previousJobs}
                onChange={handleChange}
              />
              <input
                type="text"
                name="jobTitles"
                placeholder="Job Titles"
                value={userData.jobTitles}
                onChange={handleChange}
              />
              <input
                type="text"
                name="companies"
                placeholder="Companies"
                value={userData.companies}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="employmentDates"
                placeholder="Employment Dates"
                value={userData.employmentDates}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="education"
                placeholder="Education"
                value={userData.education}
                onChange={handleChange}
              />
              <input
                type="text"
                name="degrees"
                placeholder="Degrees"
                value={userData.degrees}
                onChange={handleChange}
              />
              <input
                type="text"
                name="institutions"
                placeholder="Institutions"
                value={userData.institutions}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="graduationDates"
                placeholder="Graduation Dates"
                value={userData.graduationDates}
                onChange={handleChange}
              />
            </div>
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
