const express = require('express');
const router = express.Router();

const { isValid } = require('./tokens');
const { trackTokenUsage } = require('./abuseTracker');

router.get('/playlist', async (req, res) => {
  const token = req.query.token;
  const ua = req.headers['user-agent'] || '';
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  const allowedAgents = ['OTT Navigator', 'ExoPlayer', 'VLC', 'Dalvik', 'IPTV', 'TV', 'SmartTV'];

  // Track token usage for abuse detection
  trackTokenUsage(token, ip);

  if (!token || !(await isValid(token))) {
    return res.status(403).send('Access Denied: Invalid or expired token');
  }

  if (!allowedAgents.some(agent => ua.includes(agent))) {
    return res.status(403).send('Access Denied: Invalid User-Agent');
  }

  res.set('Content-Type', 'application/x-mpegURL');

  const playlist = `#EXTM3U

#EXTINF:-1 tvg-id="kapcha1" tvg-name="KAPAMILYA HD (CON)" tvg-logo="https://th.bing.com/th/id/R.22b78ea84befc827d0d7831ce0923a06?rik=C%2fraO%2fObTVq6cg&riu=http%3a%2f%2fassets.rappler.com%2f3E8CFD536445453C9575551922F68F49%2fimg%2fFAB93EF5D0DF4FD6BE017B76302A75BD%2fKapamilya_Channel_logo.jpg&ehk=faTwUjjPyPoe7VzXcQA%2f5u4f%2f3L5FO%2f2Wl78M7LybFE%3d&risl=&pid=ImgRaw&r=0" group-title="Web-TV",KAPAMILYA HD
#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
http://143.44.136.110:6910/001/2/ch00000090990000001286/manifest.mpd?virtualDomain=001.live_hls.zte.com

#EXTINF:-1 tvg-logo="https://i.imgur.com/jsCBRq0.png" group-title="Web-TV", TV5
#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
http://143.44.136.111:6910/001/2/ch00000090990000001088/manifest.mpd?virtualDomain=001.live_hls.zte.com

#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
#EXTINF:-1 tvg-id="cinemaoneph" tvg-name="CINEMAONE PHIL." tvg-logo="https://download.logo.wine/logo/Cinema_One/Cinema_One-Logo.wine.png" group-title="Web-TV",CINEMAONE
http://143.44.136.110:6910/001/2/ch00000090990000001283/manifest.mpd?virtualDomain=001.live_hls.zte.com

#EXTINF:-1 tvg-id="disneyxdeast" tvg-logo="https://logos-world.net/wp-content/uploads/2023/06/Disney-XD-Logo-2009.png" group-title="Web-TV",US | Disney XD
http://212.102.60.231/DISNEY_XD/index.m3u8

#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
#EXTINF:-1 tvg-id="gma7ph1" tvg-name="GMA 7 (CON01)" tvg-logo="https://www.pngkey.com/png/full/136-1361194_gma-7-logo-gma-network.png" group-title="Web-TV",GMA 7
http://143.44.136.110:6910/001/2/ch00000090990000001093/manifest.mpd?virtualDomain=001.live_hls.zte.com

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=a7724b7ca2604c33bb2e963a0319968a:6f97e3e2eb2bade626e0281ec01d3675
#EXTINF:-1 tvg-id="" tvg-logo="https://cantseeus.com/wp-content/uploads/2023/10/History_28201529.png" group-title="Web-TV",HISTORY
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_historyhd.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=34ce95b60c424e169619816c5181aded:0e2a2117d705613542618f58bf26fc8e
#EXTINF:-1 tvg-id="" tvg-logo="https://imgur.com/QMB9sFW.png" group-title="Web-TV",BBC EARTH 
https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_bbcearth_hd1.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=971ebbe2d887476398e97c37e0c5c591:472aa631b1e671070a4bf198f43da0c7
#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/Zd5zm7C.png" group-title="Web-TV",Fashion TV
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_fashiontvhd.mpd

#EXTINF:-1 tvg-logo="https://i.imgur.com/pPPubX5.png" group-title="Web-TV", NET 25
#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
http://143.44.136.111:6910/001/2/ch00000090990000001090/manifest.mpd?virtualDomain=001.live_hls.zte.com

#EXTINF:-1 tvg-id="" tvg-logo="https://images.now-tv.com/shares/channelPreview/img/en_hk/color/ch115_170_122" group-title="Web-TV", HBO
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=d47ebabf7a21430b83a8c4b82d9ef6b1:54c213b2b5f885f1e0290ee4131d425b
https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_hbohd.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://upload.wikimedia.org/wikipedia/en/f/fc/HBOHits-ASIA.png" group-title="Web-TV", HBO Hits
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=b04ae8017b5b4601a5a0c9060f6d5b7d:a8795f3bdb8a4778b7e888ee484cc7a1
https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_hbohits.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://www.liblogo.com/img-logo/hb7524h5d2-hbo-family-logo-hbo-family-logopedia-.png" group-title="Web-TV",HBO Family
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=872910c843294319800d85f9a0940607:f79fd895b79c590708cf5e8b5c6263be
https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_hbofam.mpd

#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=a06ca6c275744151895762e0346380f5:559da1b63eec77b5a942018f14d3f56f
#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/t4HF5va.png" group-title="Web-TV",HBO Signature
https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/cg_hbosign.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/D33wRIq.png" group-title="Web-TV",One Sports+
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=322d06e9326f4753a7ec0908030c13d8:1e3e0ca32d421fbfec86feced0efefda
https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_onesportsplus_hd1.mpd
`;

  res.send(playlist);
});

module.exports = router;
