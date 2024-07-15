import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import '../styles/EditProfile.css';  // Ensure this CSS file contains appropriate styling

const EditProfile = () => {
  const navigate = useNavigate();  // React Router hook for navigation

  const [userData, setUserData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: '',
    // New fields for additional profile information
    resumeCV: '',
    portfolio: '',
    technicalSkills: '',
    softSkills: '',
    languages: []
  });

  const [selectedTechnicalSkills, setSelectedTechnicalSkills] = useState([]);
  const [selectedSoftSkills, setSelectedSoftSkills] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const [customTechnicalSkill, setCustomTechnicalSkill] = useState('');
  const [customSoftSkill, setCustomSoftSkill] = useState('');
  const [customLanguage, setCustomLanguage] = useState('');

  useEffect(() => {
    // Fetch user data from backend API
    axiosInstance.get('/api/user')
      .then(response => {
        const { firstName, middleName, lastName, email, phoneNumber, gender, technicalSkills, softSkills, languages } = response.data;
        setUserData({
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          gender,
          technicalSkills,
          softSkills,
          languages
        });
        setSelectedTechnicalSkills(technicalSkills.split(',').map(skill => skill.trim()));
        setSelectedSoftSkills(softSkills.split(',').map(skill => skill.trim()));
        setSelectedLanguages(languages);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLanguagesChange = e => {
    const { value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      languages: value.split(',')  // Assuming languages are comma-separated
    }));
  };

  const handleTechnicalSkillSelect = e => {
    const { value } = e.target;
    setSelectedTechnicalSkills(prevSkills => [...prevSkills, value]);
  };

  const handleSoftSkillSelect = e => {
    const { value } = e.target;
    setSelectedSoftSkills(prevSkills => [...prevSkills, value]);
  };

  const handleLanguageSelect = e => {
    const { value } = e.target;
    setSelectedLanguages(prevLanguages => [...prevLanguages, value]);
  };

  const handleCustomTechnicalSkillChange = e => {
    setCustomTechnicalSkill(e.target.value);
  };

  const handleCustomSoftSkillChange = e => {
    setCustomSoftSkill(e.target.value);
  };

  const handleCustomLanguageChange = e => {
    setCustomLanguage(e.target.value);
  };

  const removeTechnicalSkill = skill => {
    setSelectedTechnicalSkills(prevSkills => prevSkills.filter(item => item !== skill));
  };

  const removeSoftSkill = skill => {
    setSelectedSoftSkills(prevSkills => prevSkills.filter(item => item !== skill));
  };

  const removeLanguage = language => {
    setSelectedLanguages(prevLanguages => prevLanguages.filter(item => item !== language));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Submit updated user data to backend
    axiosInstance.put('/api/user/update', {
      ...userData,
      technicalSkills: selectedTechnicalSkills.join(','),
      softSkills: selectedSoftSkills.join(','),
      languages: selectedLanguages
    })
      .then(response => {
        console.log('Profile updated successfully:', response.data);
        // Optionally, show a success message or redirect to user profile page
        navigate('/profile');  // Example redirect after successful update
      })
      .catch(error => {
        console.error('Error updating profile:', error);
        // Handle error, e.g., display error message to user
      });
  };

  return (
    <div className='form-wrapper'>
      <h2>Edit Profile</h2>
      <button className="back-link" onClick={() => navigate(-1)}>← Back</button>
      <form onSubmit={handleSubmit}>
        <label>First Name:
          <input type="text" name="firstName" value={userData.firstName} onChange={handleChange} />
        </label>
        <label>Middle Name:
          <input type="text" name="middleName" value={userData.middleName} onChange={handleChange} />
        </label>
        <label>Last Name:
          <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} />
        </label>
        <label>Email:
          <input type="email" name="email" value={userData.email} disabled />
        </label>
        <label>Phone Number:
          <input type="text" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} />
        </label>
        <label>Gender:
          <select name="gender" value={userData.gender} onChange={handleChange}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label> <br></br>
        {/* Additional fields */}
        <label>Technical Skills:
          <select name="technicalSkills" onChange={handleTechnicalSkillSelect} value={customTechnicalSkill}>
            <option value="">Select a technical skill</option>
            {/* Add options dynamically from a predefined list or database */}
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="JavaScript">JavaScript</option>
            {/* Add more options as needed */}
          </select>
          <input type="text" placeholder="Or add new skill" value={customTechnicalSkill} onChange={handleCustomTechnicalSkillChange} />
          <button type="button" onClick={() => setSelectedTechnicalSkills(prevSkills => [...prevSkills, customTechnicalSkill])}>Add</button>
          <ul>
            {selectedTechnicalSkills.map((skill, index) => (
              <li key={index}>
                {skill}
                <button type="button" onClick={() => removeTechnicalSkill(skill)}>Remove</button>
              </li>
            ))}
          </ul>
        </label>
        <label>Soft Skills:
          <select name="softSkills" onChange={handleSoftSkillSelect} value={customSoftSkill}>
            <option value="">Select a soft skill</option>
            {/* Add options dynamically from a predefined list or database */}
            <option value="Communication">Communication</option>
            <option value="Teamwork">Teamwork</option>
            <option value="Leadership">Leadership</option>
            {/* Add more options as needed */}
          </select>
          <input type="text" placeholder="Or add new skill" value={customSoftSkill} onChange={handleCustomSoftSkillChange} />
          <button type="button" onClick={() => setSelectedSoftSkills(prevSkills => [...prevSkills, customSoftSkill])}>Add</button>
          <ul>
            {selectedSoftSkills.map((skill, index) => (
              <li key={index}>
                {skill}
                <button type="button" onClick={() => removeSoftSkill(skill)}>Remove</button>
              </li>
            ))}
          </ul>
        </label>
        <label>Languages:
          <select name="languages" onChange={handleLanguageSelect} value={customLanguage}>
            <option value="">Select a language</option>
            {/* Add options dynamically from a predefined list or database */}
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            {/* Add more options as needed */}
          </select>
          <input type="text" placeholder="Or add new language" value={customLanguage} onChange={handleCustomLanguageChange} />
          <button type="button" onClick={() => setSelectedLanguages(prevLanguages => [...prevLanguages, customLanguage])}>Add</button>
          <ul>
            {selectedLanguages.map((language, index) => (
              <li key={index}>
                {language}
                <button type="button" onClick={() => removeLanguage(language)}>Remove</button>
              </li>
            ))}
          </ul>
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
