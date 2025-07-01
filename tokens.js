const fs = require('fs');
const path = './tokens.json';

let tokens = {};
if (fs.existsSync(path)) {
  tokens = JSON.parse(fs.readFileSync(path));
}

function save() {
  fs.writeFileSync(path, JSON.stringify(tokens, null, 2));
}

function isValid(token) {
  return tokens[token] && tokens[token].expires > Date.now();
}

function store(token, expires) {
  tokens[token] = { expires };
  save();
}

function remove(token) {
  delete tokens[token];
  save();
}

function getAll() {
  return tokens;
}

module.exports = {
  isValid, store, remove, getAll
};
