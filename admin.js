const express = require('express');
const router = express.Router();
const path = require('path');
const { MongoClient } = require('mongodb');
const fs = require('fs');

// Load .env
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'iptv';
const tokensCollection = 'tokens';
const abuseCollection = 'abuseReports';

const USER = 'admin';
const PASS = 'admin123';

router.use(express.urlencoded({ extended: true }));

// Login page
router.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Login submit
router.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
    res.redirect('/dashboard');
  } else {
    res.send('Invalid login');
  }
});

// Dashboard page
router.get('/dashboard', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    // Fetch active tokens
    const tokens = await db.collection(tokensCollection).find().toArray();

    let tokenRows = '';
    for (const token of tokens) {
      tokenRows += `<tr>
        <td>${token.token}</td>
        <td>${new Date(token.expires).toLocaleString()}</td>
        <td><a href="/delete?token=${token.token}">❌ Delete</a></td>
      </tr>`;
    }

    // ✅ Fetch abuse report data
    const abuseData = await db.collection(abuseCollection).find().toArray();

    let abuseRows = '';
    for (const report of abuseData) {
      abuseRows += `<tr>
        <td>${report.token}</td>
        <td>${report.ipCount > 1 ? 'Multiple IPs' : report.ipCount}</td>
        <td>${new Date(report.lastAccess).toLocaleString()}</td>
        <td><a href="/delete-abuse?token=${report.token}">🗑️ Delete</a></td>
      </tr>`;
    }

    // Load dashboard HTML
    const filePath = path.join(__dirname, 'views', 'dashboard.html');
    fs.readFile(filePath, 'utf8', (err, html) => {
      if (err) return res.status(500).send('Error loading dashboard');
      let output = html.replace('{{ROWS}}', tokenRows);
      output = output.replace('{{ABUSE_ROWS}}', abuseRows);
      res.send(output);
    });

  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).send('Error connecting to DB');
  }
});

// Token delete
router.get('/delete', async (req, res) => {
  const { token } = req.query;
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection(tokensCollection).deleteOne({ token });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Failed to delete token');
  }
});

// Abuse report delete
router.get('/delete-abuse', async (req, res) => {
  const { token } = req.query;
  try {
    await client.connect();
    const db = client.db(dbName);
    await db.collection(abuseCollection).deleteOne({ token });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).send('Failed to delete abuse report');
  }
});

module.exports = router;
