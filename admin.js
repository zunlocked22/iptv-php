const express = require('express');
const router = express.Router();
const tokens = require('./tokens');

const USER = 'admin';
const PASS = 'admin123';

router.use(express.urlencoded({ extended: true }));

// Login form
router.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

router.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
    res.redirect('/dashboard');
  } else {
    res.send('Invalid login');
  }
});

// Token dashboard
const fs = require('fs');
const path = require('path');

router.get('/dashboard', (req, res) => {
  const all = tokens.getAll();
  let table = '';
  for (const [token, data] of Object.entries(all)) {
    table += `<tr>
      <td>${token}</td>
      <td>${new Date(data.expires).toLocaleString()}</td>
      <td><a href="/delete?token=${token}">❌ Delete</a></td>
    </tr>`;
  }

  const filePath = path.join(__dirname, 'views', 'dashboard.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) {
      return res.status(500).send('Error loading dashboard');
    }
    const output = html.replace('{{ROWS}}', table);
    res.send(output);
  });
});


module.exports = router;

