// Job-Posting-and-Searching-Platform\client\src\pages\EditProfile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: '',
    jobTitle: '',
    employer: '',
    industry: '',
    education: '',
    degree: '',
    institutions: '',
    graduationDates: '',
    previousJobs: '',
    employmentDuration: '',
    responsibilities: '',
    technicalSkills: '',
    softSkills: '',
    certifications: '',
    summary: '',
    personalStatement: '',
    projects: '',
    portfolio: '',
    references: '',
    languages: '',
    volunteer: '',
    awards: '',
    jobPreferences: '',
    desiredJobTitles: '',
    preferredIndustries: '',
    salary: '',
    jobLocations: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        if (response.ok) {
          const userData = await response.json();
          // Update formData state with fetched user data
          setFormData({
            firstName: userData.firstName,
            middleName: userData.middleName,
            lastName: userData.lastName,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            profilePicture: userData.profilePicture,
            jobTitle: userData.jobTitle,
            employer: userData.employer,
            industry: userData.industry,
            education: userData.education,
            degree: userData.degree,
            institutions: userData.institutions,
            graduationDates: userData.graduationDates,
            previousJobs: userData.previousJobs,
            employmentDuration: userData.employmentDuration,
            responsibilities: userData.responsibilities,
            technicalSkills: userData.technicalSkills,
            softSkills: userData.softSkills,
            certifications: userData.certifications,
            summary: userData.summary,
            personalStatement: userData.personalStatement,
            projects: userData.projects,
            portfolio: userData.portfolio,
            references: userData.references,
            languages: userData.languages,
            volunteer: userData.volunteer,
            awards: userData.awards,
            jobPreferences: userData.jobPreferences,
            desiredJobTitles: userData.desiredJobTitles,
            preferredIndustries: userData.preferredIndustries,
            salary: userData.salary,
            jobLocations: userData.jobLocations,
          });
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Profile updated successfully!');
        // Redirect to another page if needed
        // navigate('/profile');
      } else {
        setMessage('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className='form-wrapper'>
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>

          <div className="form-section">
            <h3>Personal Information</h3>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="middleName"
              placeholder="Middle Name"
              value={formData.middleName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="profilePicture"
              placeholder="Profile Picture URL"
              value={formData.profilePicture}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3>Professional Information</h3>
            <input
              type="text"
              name="jobTitle"
              placeholder="Current Job Title"
              value={formData.jobTitle}
              onChange={handleChange}
            />
            <input
              type="text"
              name="employer"
              placeholder="Current Employer"
              value={formData.employer}
              onChange={handleChange}
            />
            <input
              type="text"
              name="industry"
              placeholder="Industry"
              value={formData.industry}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3>Education</h3>
            <input
              type="text"
              name="education"
              placeholder="Education Level"
              value={formData.education}
              onChange={handleChange}
            />
            <input
              type="text"
              name="degree"
              placeholder="Degree"
              value={formData.degree}
              onChange={handleChange}
            />
            <input
              type="text"
              name="institutions"
              placeholder="Institutions"
              value={formData.institutions}
              onChange={handleChange}
            />
            <input
              type="text"
              name="graduationDates"
              placeholder="Graduation Dates"
              value={formData.graduationDates}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3>Employment History</h3>
            <textarea
              name="previousJobs"
              placeholder="Previous Jobs"
              value={formData.previousJobs}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              name="employmentDuration"
              placeholder="Employment Duration"
              value={formData.employmentDuration}
              onChange={handleChange}
            />
            <textarea
              name="responsibilities"
              placeholder="Responsibilities"
              value={formData.responsibilities}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-section">
            <h3>Skills</h3>
            <textarea
              name="technicalSkills"
              placeholder="Technical Skills"
              value={formData.technicalSkills}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="softSkills"
              placeholder="Soft Skills"
              value={formData.softSkills}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-section">
            <h3>Certifications & Summary</h3>
            <textarea
              name="certifications"
              placeholder="Certifications"
              value={formData.certifications}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="summary"
              placeholder="Summary"
              value={formData.summary}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="personalStatement"
              placeholder="Personal Statement"
              value={formData.personalStatement}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-section">
            <h3>Projects & Portfolio</h3>
            <textarea
              name="projects"
              placeholder="Projects"
              value={formData.projects}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="portfolio"
              placeholder="Portfolio"
              value={formData.portfolio}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-section">
            <h3>Additional Information</h3>
            <textarea
              name="references"
              placeholder="References"
              value={formData.references}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="languages"
              placeholder="Languages"
              value={formData.languages}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="volunteer"
              placeholder="Volunteer Experience"
              value={formData.volunteer}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="awards"
              placeholder="Awards"
              value={formData.awards}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="form-section">
            <h3>Job Preferences</h3>
            <textarea
              name="jobPreferences"
              placeholder="Job Preferences"
              value={formData.jobPreferences}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="desiredJobTitles"
              placeholder="Desired Job Titles"
              value={formData.desiredJobTitles}
              onChange={handleChange}
            ></textarea>
            <textarea
              name="preferredIndustries"
              placeholder="Preferred Industries"
              value={formData.preferredIndustries}
              onChange={handleChange}
            ></textarea>
            <input
              type="text"
              name="salary"
              placeholder="Desired Salary"
              value={formData.salary}
              onChange={handleChange}
            />
            <textarea
              name="jobLocations"
              placeholder="Preferred Job Locations"
              value={formData.jobLocations}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="submit" className="submit-button">Save Changes</button>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
