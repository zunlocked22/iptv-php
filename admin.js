const express = require('express');
const router = express.Router();
const path = require('path');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const session = require('express-session');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'iptv';
const tokensCollection = 'tokens';
const abuseCollection = 'abuse_logs';

const USER = 'azjamez';
const PASS = 'az-admin001z';

// Middleware
router.use(express.urlencoded({ extended: true }));
router.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// Login GET
router.get('/admin', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'login.html');
  fs.readFile(filePath, 'utf8', (err, html) => {
    if (err) return res.status(500).send('Login page load error');
    const error = req.query.error ? `<script>alert("Invalid Credentials");</script>` : '';
    res.send(html + error);
  });
});

// Login POST
router.post('/admin', (req, res) => {
  const { username, password } = req.body;
  if (username === USER && password === PASS) {
    req.session.loggedIn = true;
    res.redirect('/dashboard');
  } else {
    res.redirect('/admin?error=1'); // ❌ Invalid login
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin');
  });
});

// Middleware to protect admin routes
function requireLogin(req, res, next) {
  if (!req.session.loggedIn) return res.redirect('/admin');
  next();
}

// Dashboard (protected)
router.get('/dashboard', requireLogin, async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    const tokens = await db.collection(tokensCollection).find().toArray();
    const abuseData = await db.collection(abuseCollection).find().toArray();

    let tokenRows = '';
    for (const token of tokens) {
      tokenRows += `<tr>
        <td>${token.token}</td>
        <td>${new Date(token.expires).toLocaleString('en-US', { timeZone: 'Asia/Manila' })}</td>
        <td><a href="/delete?token=${token.token}">❌ Delete</a></td>
      </tr>`;
    }

    let abuseRows = '';
    for (const report of abuseData) {
      const ipCount = Array.isArray(report.ips) ? report.ips.length : report.ips;
      const ipList = Array.isArray(report.ips) ? report.ips.join('<br>') : report.ips;
      const modalId = `modal-${report.token}`;
      abuseRows += `<tr>
        <td>${report.token}</td>
        <td><a href="#" onclick="document.getElementById('${modalId}').style.display='block'">${ipCount} IP${ipCount === 1 ? '' : 's'}</a></td>
        <td>${new Date(report.timestamp).toLocaleString('en-US', { timeZone: 'Asia/Manila' })}</td>
        <td><a href="/delete-abuse?token=${report.token}">🗑️ Delete</a></td>
      </tr>
      <div id="${modalId}" class="modal">
        <div class="modal-content">
          <span class="close" onclick="document.getElementById('${modalId}').style.display='none'">&times;</span>
          <h3>IP List for ${report.token}</h3>
          <p>${ipList}</p>
        </div>
      </div>`;
    }

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

// Delete token (protected)
router.get('/delete', requireLogin, async (req, res) => {
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

// Delete abuse report (protected)
router.get('/delete-abuse', requireLogin, async (req, res) => {
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
