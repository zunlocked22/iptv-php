module.exports = (req, res) => {
  const ua = req.headers['user-agent'] || '';
  const allowedAgents = ['OTT Navigator', 'ExoPlayer', 'VLC', 'Dalvik', 'IPTV', 'TV', 'SmartTV'];

  if (!allowedAgents.some(agent => ua.includes(agent))) {
    return res.status(403).send('Access Denied');
  }

  res.set('Content-Type', 'application/x-mpegURL');

  const playlist = `#EXTM3U

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=https://your-app-name.onrender.com/key?id=history
#EXTINF:-1 tvg-id="" tvg-logo="https://cantseeus.com/wp-content/uploads/2023/10/History_28201529.png" group-title="Cignal", HISTORY
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_historyhd.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=https://your-app-name.onrender.com/key?id=bbcearth
#EXTINF:-1 tvg-id="" tvg-logo="https://imgur.com/QMB9sFW.png" group-title="Cignal", BBC EARTH 
https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_bbcearth_hd1.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=https://your-app-name.onrender.com/key?id=fashiontv
#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/Zd5zm7C.png" group-title="Cignal", Fashion TV
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_fashiontvhd.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=https://your-app-name.onrender.com/key?id=hbosignature
#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/t4HF5va.png" group-title="Cignal", HBO Signature
https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/cg_hbosign.mpd
`;

  res.send(playlist);
};
