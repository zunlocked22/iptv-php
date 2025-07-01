// tokens.js
// In real use, replace this with a DB or in-memory cache (e.g. Redis)

const tokens = {
  "abc123": {
    expires: Date.now() + 24 * 60 * 60 * 1000, // valid for 24 hours
  },
  "testtoken": {
    expires: Date.now() + 3600 * 1000, // valid for 1 hour
  }
};

function isValid(token) {
  const t = tokens[token];
  return t && t.expires > Date.now();
}

module.exports = {
  isValid
};
