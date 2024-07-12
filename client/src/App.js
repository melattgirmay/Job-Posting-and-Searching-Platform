import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserHomePage from './pages/UserHomePage';
import EditProfile from './pages/EditProfile';
import JobSearchPage from './pages/JobSearchPage';
import MyJobsPage from './pages/MyJobsPage';
import ProtectedRoute from './components/ProtectedRoute';
import PostJobPage from './pages/PostJobPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userhomepage" element={<ProtectedRoute element={UserHomePage} />} />
        <Route path="/postjob" element={<PostJobPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/job-search" element={<JobSearchPage />} />
        <Route path="/my-jobs" element={<MyJobsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
