import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EditProfile.css';

const EditProfile = ({ email }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    resumeLink: '',
    education: [{
      collegeName: '',
      degreeType: '',
      major: '',
      startDate: '',
      endDate: '',
      honors: '',
      city: '',
      country: '',
    }],
    jobExperience: [{
      jobTitle: '',
      employer: '',
      jobCity: '',
      jobCountry: '',
      jobStartDate: '',
      jobEndDate: '',
      jobDescription: '',
      currentJob: false,
    }],
    technicalSkills: [],
    othertechskill: '',
    softSkills: [],
    othersoftskill: '',
    languages: [],
    otherlanguage: '',
    certifications: '',
    honorsAwards: '',
    portfolioLink: '',
    employmentStatus: '',
    jobSearchStatus: '',
    companyName: '',
  });

  const [message, setMessage] = useState('');
  const [profileImage, setProfileImage] = useState('path-to-default-user-image');

  const availableTechnicalSkills = ["JavaScript", "React", "Node.js", "CSS", "HTML"];
  const availableSoftSkills = ['Communication', 'Teamwork', 'Problem Solving', 'Leadership'];
  const availableLanguages = ['English', 'Spanish', 'French', 'German'];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();

        // Ensure `education` and `jobExperience` are arrays
        if (!Array.isArray(data.education)) {
          data.education = [{
            collegeName: '',
            degreeType: '',
            major: '',
            startDate: '',
            endDate: '',
            honors: '',
            city: '',
            country: '',
          }];
        }
        if (!Array.isArray(data.jobExperience)) {
          data.jobExperience = [{
            jobTitle: '',
            employer: '',
            jobCity: '',
            jobCountry: '',
            jobStartDate: '',
            jobEndDate: '',
            jobDescription: '',
            currentJob: false,
          }];
        }

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
      setUserData({ ...userData, [section]: newSection });
    } else if (name === 'technicalSkills' || name === 'softSkills' || name === 'languages') {
      const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
  
      setUserData(prevState => ({
        ...prevState,
        [name]: [...prevState[name], ...selectedOptions.filter(option => !prevState[name].includes(option))]
      }));
    } else {
      setUserData({ ...userData, [name]: value });
    }
  };  

  const handleSkillChange = (selectedSkills, skillType) => {
    setUserData(prevState => ({
      ...prevState,
      [skillType]: selectedSkills,
    }));
  };

  const handleOtherSkillChange = (e, skillType) => {
    setUserData(prevState => ({ ...prevState, [skillType]: e.target.value }));
  };

  const addOtherSkill = (skillType, otherSkillKey) => {
    const skillValue = userData[otherSkillKey];
    if (skillValue && !userData[skillType].includes(skillValue)) {
      handleSkillChange([...userData[skillType], skillValue], skillType);
      setUserData(prevState => ({ ...prevState, [otherSkillKey]: '' }));
    }
  };

  const removeSkill = (skillToRemove, skillType) => {
    handleSkillChange(userData[skillType].filter(skill => skill !== skillToRemove), skillType);
  };

  const handleAddEducation = () => {
    setUserData(prevState => ({
      ...prevState,
      education: [
        ...prevState.education,
        {
          collegeName: '',
          degreeType: '',
          major: '',
          startDate: '',
          endDate: '',
          honors: '',
          city: '',
          country: '',
        },
      ],
    }));
  };

  const handleAddJobExperience = () => {
    setUserData(prevState => ({
      ...prevState,
      jobExperience: [
        ...prevState.jobExperience,
        {
          jobTitle: '',
          employer: '',
          jobCity: '',
          jobCountry: '',
          jobStartDate: '',
          jobEndDate: '',
          jobDescription: '',
          currentJob: false,
        },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('Profile updated successfully!');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='form-wrapper'>
      <div className="form-container">
        <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
        <form onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>

          {/* Personal Information */}
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
                name="middleName"
                placeholder="Middle Name"
                value={userData.middleName}
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
                name="country"
                placeholder="Country"
                value={userData.country}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={userData.city}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Education */}
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
              </div>
            ))}
            <button type="button" onClick={handleAddEducation}>Add Education</button>
          </div>

          {/* Job Experience */}
          <div className="form-section">
            <h3>Job Experience</h3>
            {userData.jobExperience.map((job, index) => (
              <div key={index}>
                <div className="form-row">
                  <input                    type="text"
                    name="jobTitle"
                    placeholder="Job Title"
                    value={job.jobTitle}
                    onChange={(e) => handleChange(e, index, 'jobExperience')}
                  />
                  <input
                    type="text"
                    name="employer"
                    placeholder="Employer"
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
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={handleAddJobExperience}>Add Job Experience</button>
          </div>

          {/* Skills */}
          <div className="form-section">
            <h3>Technical Skills</h3>
              <div className="form-row">
                <select
                  multiple
                  value={userData.technicalSkills}
                  onChange={(e) => handleChange(e)}
                  name="technicalSkills"
                >
                  {availableTechnicalSkills.map((skill, index) => (
                    <option key={index} value={skill}>{skill}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Other Technical Skill"
                  value={userData.othertechskill}
                  onChange={(e) => handleOtherSkillChange(e, 'othertechskill')}
                />
                <button  className="remove-skill" type="button" onClick={() => addOtherSkill('technicalSkills', 'othertechskill')}>Add</button>
              </div>
            <div>
              {userData.technicalSkills.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                  <button type="button" className="remove-skill" onClick={() => removeSkill(skill, 'technicalSkills')}>X</button>
                </span>
              ))}
            </div>

            <div className="form-row">
              <select
                multiple
                value={userData.softSkills}
                onChange={(e) => handleChange(e)}
                name="softSkills"
              >
                {availableSoftSkills.map((skill, index) => (
                  <option key={index} value={skill}>{skill}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Other Soft Skill"
                value={userData.othersoftskill}
                onChange={(e) => handleOtherSkillChange(e, 'othersoftskill')}
              />
              <button className="remove-skill" type="button" onClick={() => addOtherSkill('softSkills', 'othersoftskill')}>Add</button>
            </div>
            <div>
              {userData.softSkills.map((skill, index) => (
                <span key={index} className="skill-item">
                  {skill}
                  <button type="button" className="remove-skill" onClick={() => removeSkill(skill, 'softSkills')}>X</button>
                </span>
              ))}
            </div>

            <div className="form-row">
              <select
                multiple
                value={userData.languages}
                onChange={(e) => handleChange(e)}
                name="languages"
              >
                {availableLanguages.map((language, index) => (
                  <option key={index} value={language}>{language}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Other Language"
                value={userData.otherlanguage}
                onChange={(e) => handleOtherSkillChange(e, 'otherlanguage')}
              />
              <button className="remove-skill" type="button" onClick={() => addOtherSkill('languages', 'otherlanguage')}>Add</button>
            </div>
            <div>
              {userData.languages.map((language, index) => (
                <span key={index} className="skill-item">
                  {language}
                  <button type="button" className="remove-skill" onClick={() => removeSkill(language, 'languages')}>X</button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-section">
            <h3>Professional Certifications</h3>
            <div className="form-row">
              <input
                type="text"
                name="certifications"
                placeholder="Certifications"
                value={userData.certifications}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Honors and Awards</h3>
            <input
              type="text"
              name="honorsAwards"
              placeholder="Honors and Awards"
              value={userData.honorsAwards}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <h3>Portfolio</h3>
            <input
              type="url"
              name="portfolioLink"
              placeholder="Portfolio Link"
              value={userData.portfolioLink}
              onChange={handleChange}
            />
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
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Student"
                  checked={userData.employmentStatus === 'Student'}
                  onChange={handleChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Freelancer"
                  checked={userData.employmentStatus === 'Freelancer'}
                  onChange={handleChange}
                />
                Freelancer
              </label>
              <label>
                <input
                  type="radio"
                  name="employmentStatus"
                  value="Retired"
                  checked={userData.employmentStatus === 'Retired'}
                  onChange={handleChange}
                />
                Retired
              </label>
            </div>
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
          </div>

          <button type="submit">Update Profile</button>
          {message && <p className="success-message">{message}</p>}
        </form>
      </div>
      <div className='profile-wrapper'>
        <img src={profileImage} alt="User" className="profile-image" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="profileImageInput"
        />
        <button type="button" onClick={() => document.getElementById('profileImageInput').click()}>
          Change Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
