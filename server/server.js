// Job-Posting-and-Searching-Platform\server\server.js

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Create Express app
const app = express();
app.use(bodyParser.json());
// CORS middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.use(cookieParser());
app.use(session({
  secret: 'secret', // Use a secure random string for production
  resave: true,
  saveUninitialized: true,
}));

// Database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'jobplatform',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

// Handle database errors
db.on('error', (err) => {
  console.error('Database error:', err);
});

// Middleware to check if user is logged in
const checkLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    next(); // User is logged in, proceed to the next middleware
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized access' });
  }
};

// Endpoint to handle user signup
app.post('/api/signup', (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber, country, city, password, gender } = req.body;

  const query = 'INSERT INTO users (firstName, middleName, lastName, email, phoneNumber, country, city, password, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, middleName, lastName, email, phoneNumber, country, city, password, gender];

  db.query(query, values, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email has already been registered. Please Login.' });
      }
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});

// Example email validation function
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

// Example password validation function
const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};


// Endpoint to handle user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    // Compare the provided password with the stored password (hash comparison recommended)
    if (password === user.password) {
      // Generate a token or create a session here
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Endpoint to handle user logout
app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ success: false, message: 'Failed to logout' });
      return;
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ success: true, message: 'Logout successful' });
  });
});

// Example endpoint to fetch user data
app.get('/api/user', checkLoggedIn, (req, res) => {
  const userId = req.session.userId;
  const getUserQuery = 'SELECT id, fullName, email FROM users WHERE id = ?';
  db.query(getUserQuery, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch user data' });
      return;
    }
    const user = results[0];
    res.status(200).json({ success: true, user });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});