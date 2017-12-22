<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api-2445582011268.apicast.io/games/1942?fields=*"); 
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "user-key: ab86e0d32604c94f4739b4da70f71093",
    "Accept: application/json"
    ));
$output = curl_exec($ch);
echo $output;
curl_close($ch);
?>