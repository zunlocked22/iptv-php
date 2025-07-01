const tokens = {
  // Predefined tokens if needed
  "abc123": { expires: Date.now() + 60 * 60 * 1000 }
};

function isValid(token) {
  const t = tokens[token];
  return t && t.expires > Date.now();
}

function store(token, expires) {
  tokens[token] = { expires };
}

module.exports = {
  isValid,
  store
};
