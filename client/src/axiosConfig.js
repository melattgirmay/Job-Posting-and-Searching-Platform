//C:\Users\hp\Desktop\Job-Posting-and-Searching-Platform\client\src\axiosConfig.js
import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('accessToken');
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

// Add a request interceptor to add the token to the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
