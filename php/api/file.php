<?php
header('Content-Type: application/json');
require_once 'redis.php';
require_once 'file_utils.php';

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

$info = new SplFileInfo($dir);
$modified = getMTime($info);

if ($info->isDir()) {
    echo json_encode([
        'name' => $name,
        'modified' => $modified
    ]);
    die();
}

$row = getFileInfo($_SERVER['PATH_INFO']);
if (!$row or $row['modified'] !== $modified) {
    $row = false;
}

$mime = $row ? $row['mime'] : getMime($dir);
$size = $row ? $row['size'] : getSize($info);

echo json_encode([
    'name' => $name,
    'modified' => $modified,
    'mime' => $mime,
    'size' => $size
]);

insertFileInfo($_SERVER['PATH_INFO'], [
    'modified' => $modified,
    'mime' => $mime,
    'size' => $size
]);
