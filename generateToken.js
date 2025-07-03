const crypto = require('crypto');
const tokens = require('./tokens');

module.exports = (req, res) => {
  const minutes = parseInt(req.query.minutes) || 60; // default: 60 minutes
  const token = crypto.randomBytes(8).toString('hex');
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7; // 1 week = 7 days


  // Save to tokens list
  tokens.store(token, expires);

  res.json({
    token,
    expiresAt: new Date(expires).toISOString(),
    validForMinutes: minutes,
    usage: `/playlist?token=${token}`
  });
};
