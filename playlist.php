<?php
header("Content-Type: application/x-mpegURL");

echo "#EXTM3U\n";

$channels = [
    [
        'id' => 'spotv',
        'name' => 'SPOTV',
        'group' => 'Cignal',
        'logo' => 'https://linear-poster.astro.com.my/prod/logo/SPOTV.png',
        'url' => 'https://qp-pldt-live-grp-11-prod.akamaized.net/out/u/dr_spotvhd.mpd',
        'license' => 'ec7ee27d83764e4b845c48cca31c8eef:9c0e4191203fccb0fde34ee29999129e'
    ]
];

foreach ($channels as $ch) {
    echo "#KODIPROP:inputstreamaddon=inputstream.adaptive\n";
    echo "#KODIPROP:inputstream.adaptive.manifest_type=dash\n";
    echo "#KODIPROP:inputstream.adaptive.license_type=org.w3.clearkey\n";
    echo "#KODIPROP:inputstream.adaptive.license_key=https://your-render-url.onrender.com/key.php?id={$ch['id']}\n";
    echo "#EXTINF:-1 tvg-id=\"{$ch['id']}\" tvg-logo=\"{$ch['logo']}\" group-title=\"{$ch['group']}\", {$ch['name']}\n";
    echo "{$ch['url']}\n";
}
?>
