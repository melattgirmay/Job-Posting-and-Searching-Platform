//C:\Users\hp\Desktop\Job-Posting-and-Searching-Platform\client\src\components\ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = localStorage.getItem('user'); // Check if user data is in localStorage

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
