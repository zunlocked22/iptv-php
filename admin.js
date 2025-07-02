// admin.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');

const USER = 'admin';
const PASS = 'admin123';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'iptv';
const tokensCol = 'tokens';
const abuseCol = 'abuse_logs';

router.use(express.urlencoded({ extended: true }));

// Login form
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

router.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
    res.redirect('/dashboard');
  } else {
    res.send('Invalid login');
  }
});

// Dashboard (Token list + Abuse list)
router.get('/dashboard', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const tokens = await db.collection(tokensCol).find().toArray();
    const abuses = await db.collection(abuseCol).find().toArray();

    let tokenTable = '';
    for (const token of tokens) {
      tokenTable += `<tr>
        <td>${token.token}</td>
        <td>${new Date(token.expires).toLocaleString()}</td>
        <td><a href="/delete?token=${token.token}">❌ Delete</a></td>
      </tr>`;
    }

    let abuseTable = '';
for (const [token, { count, lastAccess }] of Object.entries(abuseData)) {
  abuseTable += `<tr>
    <td>${token}</td>
    <td>${count > 1 ? count : '1'}</td>
    <td>${new Date(lastAccess).toLocaleString()}</td>
    <td><a href="/delete-abuse?token=${token}">🗑️ Delete</a></td>
  </tr>`;
}
    

    const filePath = path.join(__dirname, 'views', 'dashboard.html');
    fs.readFile(filePath, 'utf8', (err, html) => {
      if (err) return res.status(500).send('Error loading dashboard');
      let output = html.replace('{{ROWS}}', tokenTable).replace('{{ABUSE_ROWS}}', abuseTable);
      res.send(output);
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).send('Database connection error');
  }
});

// Delete token
router.get('/delete', async (req, res) => {
  const { token } = req.query;
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection(tokensCol).deleteOne({ token });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Failed to delete token');
  }
});

// Delete abuse log
router.get('/delete-abuse', async (req, res) => {
  const { token } = req.query;
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection(abuseCol).deleteOne({ token });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Failed to delete abuse record');
  }
});

module.exports = router;
