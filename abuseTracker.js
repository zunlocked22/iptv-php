// abuseTracker.js
const sendAbuseEmail = require('./emailAlert');
const abuseMap = {}; // in-memory token abuse tracking

function trackTokenUsage(token, ip) {
  if (!abuseMap[token]) {
    abuseMap[token] = {
      ipSet: new Set(),
      count: 0,
      lastAlert: 0
    };
  }

  const record = abuseMap[token];
  record.ipSet.add(ip);
  record.count++;

  const now = Date.now();
  const uniqueIPs = record.ipSet.size;

  // Alert if 2+ IPs or more than 50 hits, every 10 minutes max
  if ((uniqueIPs > 1 || record.count > 50) && now - record.lastAlert > 600000) {
    sendAbuseEmail(token, Array.from(record.ipSet), record.count);
    record.lastAlert = now;
  }
}

function getAbuseReport() {
  const report = [];
  for (const [token, data] of Object.entries(abuseMap)) {
    if (data.ipSet.size > 1 || data.count > 50) {
      report.push({
        token,
        ips: Array.from(data.ipSet),
        count: data.count,
        lastAlert: new Date(data.lastAlert).toLocaleString()
      });
    }
  }
  return report;
}

module.exports = { trackTokenUsage, getAbuseReport };
