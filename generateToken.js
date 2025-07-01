const crypto = require('crypto');
const tokens = require('./tokens');

module.exports = (req, res) => {
  const minutes = parseInt(req.query.minutes) || 60; // default: 60 minutes
  const token = crypto.randomBytes(8).toString('hex');
  const expires = Date.now() + minutes * 60 * 1000;

  // Save to tokens list
  tokens.store(token, expires);

  res.json({
    token,
    expiresAt: new Date(expires).toISOString(),
    validForMinutes: minutes,
    usage: `/playlist?token=${token}`
  });
};
