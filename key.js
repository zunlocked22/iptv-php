module.exports = (req, res) => {
  const ua = req.headers['user-agent'] || '';

  const allowedAgents = [
    'OTT Navigator',
    'ExoPlayer',
    'Dalvik',
    'IPTV',
    'TV',
    'SmartTV'
  ];

  if (!allowedAgents.some(agent => ua.includes(agent))) {
    return res.status(403).send('Access Denied');
  }

  const keys = {
    spotv: 'ec7ee27d83764e4b845c48cca31c8eef:9c0e4191203fccb0fde34ee29999129e',
  };

  const id = req.query.id;
  const key = keys[id];

  if (!key) {
    return res.status(404).send('Key not found');
  }

  res.type('text/plain').send(key);
};
