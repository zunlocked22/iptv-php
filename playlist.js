module.exports = (req, res) => {
  const ua = req.headers['user-agent'] || '';

  const allowedAgents = [
    'OTT Navigator',
    'ExoPlayer',
    'VLC',
    'Dalvik',
    'IPTV',
    'TV',
    'SmartTV'
  ];

  if (!allowedAgents.some(agent => ua.includes(agent))) {
    return res.status(403).send('Access Denied');
  }

  res.set('Content-Type', 'application/x-mpegURL');

  const playlist = `#EXTM3U
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=https://your-app-name.onrender.com/key?id=spotv
#EXTINF:-1 tvg-id="spotv" tvg-logo="https://linear-poster.astro.com.my/prod/logo/SPOTV.png" group-title="Cignal",SPOTV
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_spotvhd.mpd
`;

  res.send(playlist);
};
