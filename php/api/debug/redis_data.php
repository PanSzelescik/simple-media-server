<?php
header('Content-Type: application/json');
require_once '../redis.php';

echo json_encode(dumpData());
