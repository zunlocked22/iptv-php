require('dotenv').config();
const express = require('express');
const session = require('express-session'); // ✅ Load session module

const app = express();

// ✅ Set up session for the whole app
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true }));

const playlistRoutes = require('./playlist');
const key = require('./key');
const generateToken = require('./generateToken');
const adminRoutes = require('./admin'); // ✅ Your updated admin.js

// Admin login and dashboard
app.use('/', adminRoutes);

// Playlist routes
app.use('/', playlistRoutes);

// Key route
app.get('/key', key);

// Token generator
app.get('/get-token', generateToken);

// Root
app.get('/', (req, res) => {
  res.send('WEB-AZTV Node.js server is running.');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
