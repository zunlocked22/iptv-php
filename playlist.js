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

#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=2615129ef2c846a9bbd43a641c7303ef:07c7f996b1734ea288641a68e1cfdc4d
#EXTINF:-1 tvg-id="tv5ph2" tvg-name="TV5 HD (CIG)" tvg-logo="https://vignette.wikia.nocookie.net/russel/images/f/f9/TV5_Logo_2011.png/revision/latest?cb=20161204035016" group-title="Web-TV",TV5 HD
https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/tv5_hd.mpd

#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
#EXTINF:-1 tvg-id="cinemaoneph" tvg-name="CINEMAONE PHIL." tvg-logo="https://download.logo.wine/logo/Cinema_One/Cinema_One-Logo.wine.png" group-title="Web-TV",CINEMAONE
http://143.44.136.110:6910/001/2/ch00000090990000001283/manifest.mpd?virtualDomain=001.live_hls.zte.com

#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/Bcu69bU.png" group-title="Web-TV", ANC
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=4bbdc78024a54662854b412d01fafa16:6039ec9b213aca913821677a28bd78ae
https://cdn-ue1-prod.tsv2.amagi.tv/linear/amg01006-abs-cbn-anc-global-dash-abscbnono/index.mpd

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


#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/1zsdloF.png" group-title="Web-TV", A2Z
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=f703e4c8ec9041eeb5028ab4248fa094:c22f2162e176eee6273a5d0b68d19530
https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/cg_a2z.mpd

#EXTINF:-1 tvg-logo="https://th.bing.com/th/id/R.8925f5849290a9960eb12fa00ca894e1?rik=s1vT%2fE0LZG7oTg&riu=http%3a%2f%2flogospng.org%2fwp-content%2fuploads%2fhbo.png&ehk=NP7D5D15ytSZ6thM%2f3W94Q1Up35oljMrIYvyafZqLLU%3d&risl=&pid=ImgRaw&r=0" group-title="Web-TV", HBO
#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
http://143.44.136.110:6910/001/2/ch00000090990000001065/manifest.mpd?virtualDomain=001.live_hls.zte.com

#EXTINF:-1 tvg-id="" tvg-logo="https://upload.wikimedia.org/wikipedia/en/f/fc/HBOHits-ASIA.png" group-title="Web-TV", HBO Hits
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=b04ae8017b5b4601a5a0c9060f6d5b7d:a8795f3bdb8a4778b7e888ee484cc7a1
https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_hbohits.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/HBO_Family_Asia_logo.svg/1200px-HBO_Family_Asia_logo.svg.png" group-title="Web-TV",HBO Family
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

#EXTINF:-1 tvg-id="" group-title="Web-TV" tvg-logo="https://divign0fdw3sv.cloudfront.net/Images/ChannelLogo/contenthub/337_144.png",Cinemax
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=clearkey
#KODIPROP:inputstream.adaptive.license_key={ "keys":[ { "kty":"oct", "k":"E8xTWtSnMgEUeGPKw4bN0w", "kid":"79sqjTkVHMOfS1HXYs+cEA" } ], "type":"temporary" }
#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Linux; Android 14; 27821-67832-42-315-4231-233-21-43-12-1312-321-23-21-232-) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Mobile Safari/537.36
https://linearjitp-playback.astro.com.my/dash-wv/linear/603/default_ott.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/D33wRIq.png" group-title="Web-TV",One Sports+
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=322d06e9326f4753a7ec0908030c13d8:1e3e0ca32d421fbfec86feced0efefda
https://qp-pldt-live-grp-03-prod.akamaized.net/out/u/cg_onesportsplus_hd1.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://logowik.com/content/uploads/images/one-news9489.jpg" group-title="Web-TV", One News
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=d39eb201ae494a0b98583df4d110e8dd:6797066880d344422abd3f5eda41f45f
https://qp-pldt-live-grp-04-prod.akamaized.net/out/u/onenews_hd1.mpd

#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
#EXTINF:-1 tvg-id="jeepney" tvg-name="JEEPNEY TV" tvg-logo="https://tse4.mm.bing.net/th/id/OIP.g-d2ut9tXAeu6wUkHrvIIQHaEh?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" group-title="Web-TV",JEEPNEY TV
http://143.44.136.113:6910/001/2/ch00000090990000001250/manifest.mpd?virtualDomain=001.live_hls.zte.com

#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
#EXTINF:-1 tvg-id="nbaph2" tvg-name="NBA TV PH (CIG)" tvg-logo="https://github.com/tv-logo/tv-logos/blob/main/countries/philippines/nba-tv-philippines-ph.png?raw=true" group-title="Web-TV",NBA TV Philippines
http://143.44.136.113:6910/001/2/ch00000090990000001064/manifest.mpd?virtualDomain=001.live_hls.zte.com


#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/F2npB7o.png" group-title="Web-TV", PBA RUSH
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=76dc29dd87a244aeab9e8b7c5da1e5f3:95b2f2ffd4e14073620506213b62ac82
https://qp-pldt-live-grp-01-prod.akamaized.net/out/u/cg_pbarush_hd1.mpd

#EXTINF:-1 tvg-id="Eurosports" tvg-logo="https://logos-world.net/wp-content/uploads/2022/05/Eurosport-Logo-2001.png" group-title="Web-TV",Eurosports
#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
http://143.44.136.113:6910/001/2/ch00000090990000001325/manifest.mpd?virtualDomain=001.live_hls.zte.com


#EXTINF:-1 tvg-id="(no tvg-id)" tvg-name="CINEMO!" tvg-logo="https://static.wikia.nocookie.net/russel/images/f/f2/Cine_Mo%21_3D_Logo_2011.png" group-title="Web-TV",Cinemo! 
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=aa8aebe35ccc4541b7ce6292efcb1bfb:aab1df109d22fc5d7e3ec121ddf24e5f
https://d1bail49udbz1k.cloudfront.net/out/v1/3a895f368f4a467c9bca0962559efc19/index.mpd

#EXTINF:-1 tvg-id="Animax" tvg-name="" tvg-logo="https://i.imgur.com/MiUDLVa.png" group-title="Web-TV", Animax
#KODIPROP:inputstream.adaptive.license_type=clearkey
#KODIPROP:inputstream.adaptive.license_key=edf1a715de9748638dd2fad75a419af2:2f5a3199b26e9b693ae881af7ff864cf
https://tglmp01.akamaized.net/out/v1/de55fad9216e4fe7ad8d2eed456ba1ec/manifest.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://danytips.com/wp-content/uploads/2020/11/Nickelodeon_Logo_2004.png" group-title="Web-TV",Nickelodeon
http://fl1.moveonjoy.com/NICKELODEON/index.m3u8



#EXTINF:-1 tvg-id="" group-title="Web-TV" tvg-logo="https://aqfadtv.xyz/logos/NickJr2023.png" ,Nick Jr
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=clearkey
#KODIPROP:inputstream.adaptive.license_key=https://ck-dash-mpd.aqfadtv.xyz/dash-ck/linear/9982
#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Linux; Android 12; Pixel 3a XL Build/SP2A.220505.008; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5715.0 Mobile Safari/537.36
https://linearjitp-playback.astro.com.my/dash-wv/linear/9982/default_ott.mpd


#EXTINF:-1 tvg-id="Cartoon.Net.Hd" group-title="Web-TV" tvg-logo="https://logos-world.net/wp-content/uploads/2021/08/Cartoon-Network-Logo-2010-present.png",Cartoon Network
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=clearkey
#KODIPROP:inputstream.adaptive.license_key=7ef57f7f3e8cf0efe4f3d5772a7cbb35:0ac6d617095fbe0ca7f4c9ae72fa5f51
https://a190aivottlinear-a.akamaihd.net/OTTB/iad-nitro/live/clients/dash/enc/ampfzrmpam/out/v1/e08f3866c80040f2bc494cb48ebc7bce/cenc.mpd

#EXTINF:-1 tvg-id="DisneyChannel" group-title="Web-TV" tvg-logo="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/20768ccf-f5b0-4b5e-bd31-ad33d6cf6a35/dei91io-5b3a14cb-c0c8-4033-b487-3574252333bd.jpg/v1/fill/w_1191,h_671,q_70,strp/disney_channel_logo__blue__by_littlekj20_dei91io-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMwIiwicGF0aCI6IlwvZlwvMjA3NjhjY2YtZjViMC00YjVlLWJkMzEtYWQzM2Q2Y2Y2YTM1XC9kZWk5MWlvLTViM2ExNGNiLWMwYzgtNDAzMy1iNDg3LTM1NzQyNTIzMzNiZC5qcGciLCJ3aWR0aCI6Ijw9MTI5NiJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.CDhwbyrZ7hWQVXvarfBL8eDRzfm1mjqVps1IqVo2j3g",Disney Channel
#KODIPROP:inputstream.adaptive.license_type=clearkey
#KODIPROP:inputstream.adaptive.license_key=72800c62fcf2bfbedd9af27d79ed35d6:b6ccb9facb2c1c81ebe4dfaab8a45195
https://uselector.cdn.intigral-ott.net/DIS/DIS.isml/manifest.mpd

#EXTINF:-1 tvg-id="disneyxdeast" tvg-logo="https://logos-world.net/wp-content/uploads/2023/06/Disney-XD-Logo-2009.png" group-title="Web-TV",US | Disney XD
http://212.102.60.231/DISNEY_XD/index.m3u8


#EXTINF:-1 tvg-id="" tvg-logo="https://www.tablotv.com/wp-content/uploads/2023/12/AnimeXHIDIVE_official-768x499.png" group-title="Web-TV", ANIME X HIDIVE
https://amc-anime-x-hidive-1-us.tablo.wurl.tv/playlist.m3u8

#KODIPROP:inputstream.adaptive.license_type=clearkey
#KODIPROP:inputstream.adaptive.license_key=4ab9645a2a0a47edbd65e8479c2b9669:8cb209f1828431ce9b50b593d1f44079
#EXTINF:-1 tvg-id="Dreamworks.Hd.ph" tvg-chno=78 tvg-logo="https://imgur.com/SASnGFo.png" group-title="Web-TV",Dreamworks HD
https://qp-pldt-live-grp-02-prod.akamaized.net/out/u/cg_dreamworks_hd1.mpd

#EXTINF:-1 tvg-id="65652f7fc0fc88000883537a" tvg-name="Crunchyroll" tvg-logo="https://images.pluto.tv/channels/65652f7fc0fc88000883537a/colorLogoPNG.png" group-title="Web-TV", Crunchyroll
https://stitcher.pluto.tv/stitch/hls/channel/65652f7fc0fc88000883537a/master.m3u8?deviceType=web&servertSideAds=false&deviceMake=safari&deviceVersion=1&deviceId=spencer&appVersion=1&deviceDNT=0&deviceModel=web&sid=6780419e-1ba9-11f0-a1fd-4e04716c5414

#EXTINF:-1 tvg-id="5cb0cae7a461406ffe3f5213" tvg-name="Paramount Movie Channel" tvg-logo="https://logodownload.org/wp-content/uploads/2014/07/paramount-logo-1.png" group-title="Web-TV", Paramount Movie Channel
https://stitcher.pluto.tv/stitch/hls/channel/5cb0cae7a461406ffe3f5213/master.m3u8?deviceType=web&servertSideAds=false&deviceMake=safari&deviceVersion=1&deviceId=spencer&appVersion=1&deviceDNT=0&deviceModel=web&sid=4a87ffde-1b23-11f0-bc66-96648866fcff

#EXTINF:-1 tvg-id="561c5b0dada51f8004c4d855" tvg-name="Classic Movies Channel" tvg-logo="https://images.pluto.tv/channels/561c5b0dada51f8004c4d855/colorLogoPNG.png" group-title="Web-TV", Classic Movies Channel
https://stitcher.pluto.tv/stitch/hls/channel/561c5b0dada51f8004c4d855/master.m3u8?deviceType=web&servertSideAds=false&deviceMake=safari&deviceVersion=1&deviceId=spencer&appVersion=1&deviceDNT=0&deviceModel=web&sid=4a87ffde-1b23-11f0-bc66-96648866fcff


#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=2e53f8d8a5e94bca8f9a1e16ce67df33:3471b2464b5c7b033a03bb8307d9fa35
#EXTINF:-1 tvg-id="tvnmoviespinoy" tvg-name="TVN MOVIES PINOY" tvg-logo="https://th.bing.com/th/id/OIP.7i_NEUaiqj2UtFHiHjzzhgHaF0?r=0&rs=1&pid=ImgDetMain" group-title="Web-TV",TVN MOVIES PINOY
https://qp-pldt-live-grp-07-prod.akamaized.net/out/u/cg_tvnmovie.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://i.imgur.com/eE9IBhJ.png" group-title="Web-TV",tvN Premium
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=e1bde543e8a140b38d3f84ace746553e:b712c4ec307300043333a6899a402c10
https://qp-pldt-live-grp-09-prod.akamaized.net/out/u/cg_tvnpre.mpd


#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=71cbdf02b595468bb77398222e1ade09:c3f2aa420b8908ab8761571c01899460
#EXTINF:-1 tvg-id="tapmovies2" tvg-name="TAP MOVIES (CIG)" tvg-logo="https://tapdmv.ovationproductionsmanila.com/TapMovies/1920x1080_logo_TapMovies.png" group-title="Web-TV",TAP MOVIES
https://qp-pldt-live-grp-06-prod.akamaized.net/out/u/cg_tapmovies_hd1.mpd

#KODIPROP:inputstream.adaptive.license_type=com.widevine.alpha
#KODIPROP:inputstream.adaptive.license_key=http://143.44.136.74:9443/widevine/?deviceId=02:00:00:00:00:00
#EXTINF:-1 tvg-id="tapactionflix1" tvg-name="TAP ACTION FLIX (CON)" tvg-logo="https://cms.cignal.tv/Upload/Images/Tap-Action-Flix.jpg" group-title="Web-TV",TAP ACTION FLIX
http://143.44.136.110:6910/001/2/ch00000090990000001305/manifest.mpd?virtualDomain=001.live_hls.zte.com


#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=e4ee0cf8ca9746f99af402ca6eed8dc7:be2a096403346bc1d0bb0f812822bb62
#EXTINF:-1 tvg-id="rckentmnt" tvg-name="ROCK ENTERTAIMENT" tvg-logo="https://assets-global.website-files.com/64e81e52acfdaa1696fd623f/64f40b55f762b61424f7a522_Rock_bg_2023_logo.jpg" group-title="Web-TV",ROCK ENTERTAIMENT
https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_rockentertainment.mpd


#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=0f852fb8412b11edb8780242ac120002:4cbc004d8c444f9f996db42059ce8178
#EXTINF:-1 tvg-id="rockactionph" tvg-name="ROCK ACTION" tvg-logo="https://app.ksmctv.com/Content/MCTV/Image/Channel/44-ROCKExtreme.png" group-title="Web-TV",ROCK ACTION
https://qp-pldt-live-grp-13-prod.akamaized.net/out/u/dr_rockextreme.mpd


#KODIPROP:inputstream.adaptive.license_type=clearkey
#KODIPROP:inputstream.adaptive.license_key={"59a51164c2c915352f04066a06f6e807":"eba5cc362d1d63c0fe6460febca0fd11"}
#EXTINF:-1 tvg-id="Amazon.US.AMCPlus" tvg-logo="https://m.media-amazon.com/images/S/pv-target-images/145fb397b95a82a730cb3887f421145121cb473b7a0845cf8b108551b381126e._SL170_FMpng_.png" group-title="Web-TV",AMC +
https://a148aivottlinear-a.akamaihd.net/OTTB/PDX/clients/dash/enc/0f5clvxn6o/out/v1/d5a953bb19734fa3baa1776266887fcb/cenc.mpd

#EXTINF:-1 tvg-id="Warnertv.Hd.ph" tvg-logo="https://provider-static.plex.tv/6/epg/channels/logos/gracenote/6e7af423114c9f735d17e142783f233a.png" tvg-name="Warner TV" group-title="Web-TV", AMC Thrillers
https://436f59579436473e8168284cac5d725f.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/Plex_RushByAMC/playlist.m3u8

#EXTINF:-1 tvg-id="Warnertv.Hd.ph" tvg-logo="https://the-bithub.com/fhorror" tvg-name="Warner TV" group-title="Web-TV", Filmrise Horror
https://apollo.production-public.tubi.io/live/ac-filmrise-horror.m3u8

#KODIPROP:inputstreamaddon=inputstream.adaptive 
#KODIPROP:inputstream.adaptive.manifest_type=dash 
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey 
#KODIPROP:inputstream.adaptive.license_key=
#EXTINF:-1 tvg-id="Studio.Universal.id" tvg-logo="https://raw.githubusercontent.com/mystery75/logo/main/StudioUniversal.png" group-logo="" group-logo="" group-title="Web-TV",Studio Universal
https://cdn08jtedge.indihometv.com/dassdvr/130/studiouniversal/manifest.mpd

#EXTINF:-1 tvg-id="US18000163F" tvg-chno="770" tvg-logo="https://the-bithub.com/miramax" group-title="Web-TV", Miramax Movies Channel 
https://raw.githubusercontent.com/mystery75/m3u8/main/MIRAMAX.m3u8

#EXTINF:-1 tvg-id="LOCAL.ph" tvg-logo="https://the-bithub.com/crave1" group-title="Web-TV",CRAVE
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=4a107945066f45a9af2c32ea88be60f4:df97e849d68479ec16e395feda7627d0
https://live-crave.video.9c9media.com/137c6e2e72e1bf67b82614c7c9b216d6f3a8c8281748505659713/fe/f/crave/crave1/manifest.mpd

#EXTINF:-1 tvg-id="LOCAL.ph" tvg-logo="https://the-bithub.com/crave" group-title="Web-TV",CRAVE 2
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=4ac6eaaf0e5e4f94987cbb5b243b54e8:8bb3f2f421f6afd025fa46c784944ad6
https://live-crave.video.9c9media.com/ab4332c60e19b6629129eeb38a2a6ac6db5df2571721750022187/fe/f/crave/crave2/manifest.mpd

#EXTINF:-1 tvg-id="tfcasia" tvg-name="TFC ASIA" tvg-logo="https://i.imgur.com/54f9r5A.png" group-title="Web-TV",TFC ASIA
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=9568cc84e1d944f38eac304517eab6fd:f12142af8f39b3bab79d3679d3665ebe
https://d1facupi3cod3q.cloudfront.net/out/v1/e3633f8591e248b0af1af15a474bfa4a/index.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://the-bithub.com/moviesthriller" group-title="Web-TV", Movie Thriller
https://shls-live-enc.edgenextcdn.net/out/v1/f6d718e841f8442f8374de47f18c93a7/index.m3u8


#EXTINF:-1 tvg-id="" tvg-logo="https://the-bithub.com/moviesaction" group-title="Web-TV", Movies Action
https://shls-live-enc.edgenextcdn.net/out/v1/46079e838e65490c8299f902a7731168/index.m3u8


#EXTINF:-1 tvg-id="" tvg-logo="https://tse2.mm.bing.net/th/id/OIP.7d6tiaMYWpWIGI6iAN47zAHaG3?rs=1&pid=ImgDetMain&o=7&rm=3" group-title="Web-TV",Warner TV 
#KODIPROP:inputstreamaddon=inputstream.adaptive
#KODIPROP:inputstream.adaptive.manifest_type=dash
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=4503cf86bca3494ab95a77ed913619a0:afc9c8f627fb3fb255dee8e3b0fe1d71
https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_warnertvhd.mpd

#EXTINF:-1 tvg-logo="https://th.bing.com/th/id/R.34d9783d78a3717e5ec59cf17e6f0200?rik=rrELDABBD080jg&riu=http%3a%2f%2fvignette1.wikia.nocookie.net%2flogopedia%2fimages%2f6%2f6f%2fLogo_fox_sports.png%2frevision%2flatest%3fcb%3d20140414164158&ehk=dGqPScdeTEqIGpb8d99DSF9Tw5Y%2bxFJLtIqV2Q5xjlk%3d&risl=&pid=ImgRaw&r=0" group-title="Web-TV",Fox Sports
https://cfd-v4-service-channel-stitcher-use1-1.prd.pluto.tv/stitch/hls/channel/5a74b8e1e22a61737979c6bf/master.m3u8?appName=web&appVersion=unknown&clientTime=0&deviceDNT=0&deviceId=6c28f173-30d3-11ef-9cf5-e9ddff8ff496&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&serverSideAds=false&sid=46a3b8ff-5a4a-4952-bb4d-9461224acd54


#EXTINF:-1 tvg-id="USBD300003LK" tvg-logo="https://raw.githubusercontent.com/mystery75/logo/main/IonPlus.png" group-logo="" group-logo="" group-title="Web-TV",ion Plus
https://raw.githubusercontent.com/mystery75/m3u8/main/IONPLUS.m3u8
#####https://linear-433.frequency.stream/433/hls/master/playlist.m3u8


#EXTINF:-1 tvg-id="USBC24000223S" tvg-logo="https://raw.githubusercontent.com/mystery75/logo/main/IonMystery.png" group-logo="" group-logo="" group-title="Web-TV",ion Mystery
https://raw.githubusercontent.com/mystery75/m3u8/main/IONMYSTERY.m3u8

#EXTINF:-1 tvg-id="LOCAL.ph" tvg-logo="https://th.bing.com/th/id/R.4405ffb89dc694a83949e658648a8bbb?rik=jSUO6mcN41Toxg&riu=http%3a%2f%2f1000logos.net%2fwp-content%2fuploads%2f2017%2f05%2fEmblem-WWE.jpg&ehk=WVdUrlUQKgnjhu2G0m9TROH5HBPFuqt7c1eQQb5BvvE%3d&risl=&pid=ImgRaw&r=0" group-title="Web-TV", WWE
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=00208c93f4358213b52220898b962385:8ae6063167228e350dd132d4a1573102
https://fsly.stream.peacocktv.com/Content/CMAF_CTR-4s/Live/channel(vc106wh3yw)/master.mpd

#EXTINF:-1 tvg-id="" tvg-logo="https://bestmediainfo.com/uploads/2017/08/MOVIES-NOW-LOGO_6.jpg" group-title="Web-TV", Movies Now
#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey
#KODIPROP:inputstream.adaptive.license_key=40f019b86241d23ef075633fd7f1e927:058dec845bd340178a388edd104a015e
https://times-ott-live.akamaized.net/moviesnow_wv_drm/index.mpd


`;

  res.send(playlist);
});

module.exports = router;
