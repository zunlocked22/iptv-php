const express = require('express');
const app = express();

const playlist = require('./playlist');
const key = require('./key');
const generateToken = require('./generateToken'); // ✅ Move this near the top

// Root test
app.get('/', (req, res) => {
  res.send('IPTV Node.js server is running.');
});

// ✅ Register routes BEFORE listening
app.get('/playlist', playlist);
app.get('/key', key);
app.get('/get-token', generateToken);

// ✅ Start the server after all routes are set
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
