<?php
$keys = [
    'spotv' => 'ec7ee27d83764e4b845c48cca31c8eef:9c0e4191203fccb0fde34ee29999129e'
];

$id = $_GET['id'] ?? '';
if (!isset($keys[$id])) {
    http_response_code(404);
    exit("Key not found");
}

header("Content-Type: text/plain");
echo $keys[$id];
?>
