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
#KODIPROP:inputstream.adaptive.license_key=a7724b7ca2604c33bb2e963a0319968a:6f97e3e2eb2bade626e0281ec01d3675
#EXTINF:-1 tvg-id="" tvg-logo="https://cantseeus.com/wp-content/uploads/2023/10/History_28201529.png" group-title="Cignal", HISTORY
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_historyhd.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=34ce95b60c424e169619816c5181aded:0e2a2117d705613542618f58bf26fc8e
#EXTINF:-1 tvg-id="" tvg-logo="https://imgur.com/QMB9sFW.png" group-title="Cignal", BBC EARTH 
https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_bbcearth_hd1.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=971ebbe2d887476398e97c37e0c5c591:472aa631b1e671070a4bf198f43da0c7
#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/Zd5zm7C.png" group-title="Cignal", Fashion TV
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_fashiontvhd.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=a06ca6c275744151895762e0346380f5:559da1b63eec77b5a942018f14d3f56f
#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/t4HF5va.png" group-title="Cignal", HBO Signature
https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/cg_hbosign.mpd
`;

  res.send(playlist);
};
