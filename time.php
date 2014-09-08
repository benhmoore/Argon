<?php
date_default_timezone_set('America/Chicago'); // CDT
$milliseconds = round(microtime(true) * 1000);
echo $milliseconds;
?>