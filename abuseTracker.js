// abuseTracker.js
const { MongoClient } = require('mongodb');
const nodemailer = require('nodemailer');

const uri = process.env.MONGODB_URI;
const dbName = 'iptv';
const collectionName = 'abuse_logs';

const cache = new Map(); // In-memory tracking

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function trackTokenUsage(token, ip) {
  if (!token || !ip) return;

  const now = Date.now();
  const entry = cache.get(token) || { ips: new Set(), hits: 0, lastAlert: 0 };
  entry.ips.add(ip);
  entry.hits += 1;
  cache.set(token, entry);

  const uniqueIPs = entry.ips.size;
  const hits = entry.hits;

  const isShared = uniqueIPs >= 2;
  const isSpammy = hits >= 50;
  const shouldAlert = isShared || isSpammy;

  if (shouldAlert && now - entry.lastAlert > 60_000) {
    entry.lastAlert = now;

    const reason = isShared ? 'Multiple IPs' : 'Too Many Hits';

    // ✅ Save to MongoDB
    try {
      const client = new MongoClient(uri);
      await client.connect();
      const db = client.db(dbName);
      await db.collection(collectionName).updateOne(
        { token },
        {
          $set: {
            token,
            reason,
            ips: [...entry.ips],
            timestamp: new Date(),
          },
        },
        { upsert: true }
      );
      await client.close();
    } catch (err) {
      console.error('MongoDB write error (abuse log):', err);
    }

    // ✅ Send email alert
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECEIVER,
      subject: `⚠️ Abuse Detected for Token: ${token}`,
      text: `Token: ${token}\nReason: ${reason}\nUnique IPs: ${uniqueIPs}\nHits: ${hits}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return console.error('Email error:', error);
      console.log('Abuse alert email sent:', info.response);
    });
  }
}

module.exports = { trackTokenUsage };
