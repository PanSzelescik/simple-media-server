<?php
header('Content-Type: application/json');
require_once 'redis.php';

$local_path = str_ends_with($_SERVER['PATH_INFO'], "/") ? substr($_SERVER['PATH_INFO'], 0, -1) : $_SERVER['PATH_INFO'];
$dir = "/www/file$local_path";
$array = explode('/', $local_path);
$name = $array[count($array) - 1];

if (!file_exists($dir)) {
    http_response_code(404);
    echo json_encode([
        'message' => "Can't find directory or file",
        'path' => $_SERVER['PATH_INFO']
    ]);
    die();
}

$modified = @filemtime($dir);
if ($modified === false) {
    $modified = -1;
}

if (is_dir($dir)) {
    echo json_encode([
        'name' => $name,
        'modified' => $modified
    ]);
    die();
}

$info = getFileInfo($_SERVER['PATH_INFO']);
$mime = $info && $info['modified'] === $modified ? $info['mime'] : @mime_content_type($dir);

echo json_encode([
    'name' => $name,
    'modified' => $modified,
    'mime' => $mime
]);

insertFileInfo($_SERVER['PATH_INFO'], [
    'modified' => $modified,
    'mime' => $mime
]);
