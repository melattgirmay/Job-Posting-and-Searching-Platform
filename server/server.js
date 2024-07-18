// C:\Users\hp\Desktop\Job-Posting-and-Searching-Platform\server\server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const session = require('express-session');
const crypto = require('crypto');
const bcrypt = require('bcrypt'); // Added bcrypt for password hashing

const app = express();
app.use(express.json()); // Use built-in JSON parser for parsing application/json

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true, // Allow credentials like cookies
};

app.use(cors(corsOptions));

const sessionSecret = crypto.randomBytes(32).toString('hex');

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
}));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'abc123',
  database: 'jobplatform',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

db.on('error', (err) => {
  console.error('Database error:', err);
});

// Endpoint to search for a job
app.get('/api/searchJobs', async (req, res) => {
  const { title, location, createdAt, salary, type, remote_option, level } = req.query;

  let query = 'SELECT * FROM jobs WHERE 1=1';
  const values = [];

  if (title) {
    query += ' AND title LIKE ?';
    values.push(`%${title}%`);
  }
  if (location) {
    query += ' AND location LIKE ?';
    values.push(`%${location}%`);
  }
  if (createdAt) {
    query += ' AND DATE(created_at) = ?';
    values.push(createdAt);
  }
  if (salary) {
    query += ' AND salary >= ?';
    values.push(salary);
  }
  if (type) {
    query += ' AND type LIKE ?';
    values.push(`%${type}%`);
  }
  if (remote_option) {
    query += ' AND remote_option LIKE ?';
    values.push(`%${remote_option}%`);
  }
  if (level) {
    query += ' AND level LIKE ?';
    values.push(`%${level}%`);
  }

  try {
    const [results] = await db.promise().query(query, values);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error searching jobs:', err);
    res.status(500).json({ message: 'Failed to search jobs' });
  }
});

// Endpoint to fetch jobs posted by the logged-in user
app.get('/api/myJobs', checkLoggedIn, async (req, res) => {
  const userId = req.session.userId; // Assuming userId is stored in the session

  const query = 'SELECT * FROM jobs WHERE userId = ?';
  try {
    const [results] = await db.promise().query(query, [userId]);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching user jobs:', err);
    res.status(500).json({ message: 'Failed to fetch user jobs' });
  }
});

// Endpoint to fetch job details by job ID
app.get('/api/jobs/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  // Query to fetch job details by job ID
  const query = 'SELECT * FROM jobs WHERE id = ?';
  
  try {
    // Execute the query
    const [jobDetails] = await db.promise().query(query, [jobId]);

    // Check if job details were found
    if (jobDetails.length === 0) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Send the job details as JSON response
    res.status(200).json(jobDetails[0]); // Assuming jobDetails is an object representing job details
  } catch (err) {
    console.error('Error fetching job details:', err);
    res.status(500).json({ message: 'Failed to fetch job details' });
  }
});


// Endpoint to update a job
app.put('/api/jobs/:jobId', checkLoggedIn, async (req, res) => {
  const jobId = req.params.jobId;
  const { title, location, type, level, salary, description, responsibilities, requirements, remote_option } = req.body;
  
  const query = 'UPDATE jobs SET title = ?, location = ?, type = ?, level = ?, salary = ?, description = ?, responsibilities = ?, requirements = ?, remote_option = ? WHERE id = ?';
  const values = [title, location, type, level, salary, description, responsibilities, requirements, remote_option, jobId];
  
  try {
    await db.promise().query(query, values);
    res.status(200).send('Job updated successfully');
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).send('Failed to update job');
  }
});

// Endpoint to post a job
app.post('/api/postJob', checkLoggedIn, async (req, res) => {
  const { title, location, type, level, salary, description, responsibilities, requirements, remote_option } = req.body;
  const userId = req.session.userId; // Assuming userId is stored in session

  const query = 'INSERT INTO jobs (title, location, type, level, salary, description, responsibilities, requirements, remote_option, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [title, location, type, level, salary, description, responsibilities, requirements, remote_option, userId];

  try {
    await db.promise().query(query, values); // Assuming you are using mysql2's promise mode
    res.status(200).json({ message: 'Job posted successfully' });
  } catch (err) {
    console.error('Error posting job:', err);
    res.status(500).json({ message: 'Failed to post job' });
  }
});

function checkLoggedIn(req, res, next) {
  if (req.session.userId) {
    next(); // User is logged in, proceed to the next middleware
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized access' });
  }
}

// Endpoint to handle user signup
app.post('/api/signup', async (req, res) => {
  const { firstName, middleName, lastName, email, phoneNumber, password, gender } = req.body;

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (firstName, middleName, lastName, email, phoneNumber, password, gender) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [firstName, middleName, lastName, email, phoneNumber, hashedPassword, gender];

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

// Endpoint to handle user login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];
    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      req.session.userId = user.id;
      return res.status(200).json({ message: 'Login successful', user });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});

// Endpoint to fetch user data by email
app.get('/api/user/:email', (req, res) => {
  const { email } = req.params;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = results[0]; // Assuming email is unique, get the first result

    res.json(userData);
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

// Endpoint to fetch user data
app.get('/api/user', checkLoggedIn, (req, res) => {
  const userId = req.session.userId;
  const getUserQuery = 'SELECT id, firstName, middleName, lastName, email FROM users WHERE id = ?';
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

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) { // Adjust accordingly based on your session setup
    next(); // User is authenticated, proceed to the next middleware or route handler
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

app.get('/userhomepage', isAuthenticated, (req, res) => {
  // Serve the userhomepage when authenticated
  res.sendFile(path.join(__dirname, 'public', 'userhomepage.html'));
});

// Endpoint to fetch job details by ID
app.get('/api/jobs/:jobId', async (req, res) => {
  const jobId = req.params.jobId;

  const query = 'SELECT * FROM jobs WHERE id = ?';
  try {
    const [results] = await db.promise().query(query, [jobId]);
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (err) {
    console.error('Error fetching job details:', err);
    res.status(500).json({ message: 'Failed to fetch job details' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});