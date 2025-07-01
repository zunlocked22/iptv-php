// tokens.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://iptvadmin:XvLuIq143xeeNcBs@iptv.screbdn.mongodb.net/?retryWrites=true&w=majority&appName=IPTV";
const client = new MongoClient(uri);
const dbName = "iptv";
let collection;

// Connect once at startup
async function connectDB() {
  if (!collection) {
    await client.connect();
    const db = client.db(dbName);
    collection = db.collection("tokens");
  }
}

// Check if token is valid (not expired)
async function isValid(token) {
  await connectDB();
  const data = await collection.findOne({ token });
  return data && data.expires > Date.now();
}

// Store a new token
async function store(token, expires) {
  await connectDB();
  await collection.insertOne({ token, expires });
}

// Remove a token
async function remove(token) {
  await connectDB();
  await collection.deleteOne({ token });
}

// Get all tokens
async function getAll() {
  await connectDB();
  const all = await collection.find({}).toArray();
  const mapped = {};
  for (const doc of all) {
    mapped[doc.token] = { expires: doc.expires };
  }
  return mapped;
}

module.exports = {
  isValid,
  store,
  remove,
  getAll
};
