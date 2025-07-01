const express = require('express');
const app = express();

const playlist = require('./playlist');
const key = require('./key');

app.get('/', (req, res) => {
  res.send('IPTV Node.js server is running.');
});

app.get('/playlist', playlist);
app.get('/key', key);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

