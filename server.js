const express = require('express');
const app = express();

const playlist = require('./playlist');
const key = require('./key');
const generateToken = require('./generateToken');
const adminRoutes = require('./admin'); // ✅ Add admin routes

// Use admin dashboard and login
app.use('/', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('IPTV Node.js server is running.');
});

// Playlist + Key + Token
app.get('/playlist', playlist);
app.get('/key', key);
app.get('/get-token', generateToken);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
