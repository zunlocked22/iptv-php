const session = require('express-session');

app.use(session({
  secret: 'yourSecretKey123!', // ✅ Change this to a secure random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Use true only if using HTTPS
}));


require('dotenv').config();
const express = require('express');
const app = express();

const playlistRoutes = require('./playlist');        // ✅ Express Router
const key = require('./key');                        // ✅ If this is middleware-style
const generateToken = require('./generateToken');    // ✅ Token route
const adminRoutes = require('./admin');              // ✅ Admin Dashboard

app.use(express.urlencoded({ extended: true }));     // Required for admin login form

// Admin login and dashboard
app.use('/', adminRoutes);

// Playlist router (handles /playlist inside it)
app.use('/', playlistRoutes);

// License key handler (can stay as-is)
app.get('/key', key);

// Token generator route
app.get('/get-token', generateToken);

// Root info page
app.get('/', (req, res) => {
  res.send('IPTV Node.js server is running.');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
