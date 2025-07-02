// --- Updated admin.js ---
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const { getAbuseReport } = require('./abuseTracker');

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'iptv';
const collectionName = 'tokens';

// Basic credentials
const USER = 'admin';
const PASS = 'admin123';

router.use(express.urlencoded({ extended: true }));

// Login Page
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Login POST
router.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
    res.redirect('/dashboard');
  } else {
    res.send('Invalid login');
  }
});

// Dashboard with tokens and abuse report
router.get('/dashboard', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const tokens = await db.collection(collectionName).find().toArray();
    const abuseReport = getAbuseReport();

    let tokenTable = '';
    for (const token of tokens) {
      tokenTable += `<tr>
        <td>${token.token}</td>
        <td>${new Date(token.expires).toLocaleString()}</td>
        <td><a href="/delete?token=${token.token}">❌ Delete</a></td>
      </tr>`;
    }

    let abuseTable = '';
    for (const entry of abuseReport) {
      abuseTable += `<tr>
        <td>${entry.token}</td>
        <td>${entry.ips.length}</td>
        <td>${entry.count}</td>
        <td>${entry.lastAlert}</td>
      </tr>`;
    }

    const filePath = path.join(__dirname, 'views', 'dashboard.html');
    fs.readFile(filePath, 'utf8', (err, html) => {
      if (err) return res.status(500).send('Error loading dashboard');
      const output = html
        .replace('{{TOKEN_ROWS}}', tokenTable)
        .replace('{{ABUSE_ROWS}}', abuseTable);
      res.send(output);
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).send('Error connecting to DB');
  }
});

// Delete token
router.get('/delete', async (req, res) => {
  const { token } = req.query;
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection(collectionName).deleteOne({ token });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Failed to delete token');
  }
});

module.exports = router;
