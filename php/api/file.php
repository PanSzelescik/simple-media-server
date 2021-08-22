<?php
header('Content-Type: application/json');

$path = str_ends_with($_SERVER['PATH_INFO'], "/") ? substr($_SERVER['PATH_INFO'], 0, -1) : $_SERVER['PATH_INFO'];
$dir = "/www/file$path";
$array = explode("/", $path);
$name = $array[count($array) - 1];

if (!file_exists($dir)) {
    http_response_code(404);
    echo json_encode([
        'message' => "Can't find directory or file",
        'path' => $_SERVER['PATH_INFO']
    ]);
} else {
    $modified = filemtime($dir);
    if (is_dir($dir)) {
        echo json_encode([
            'name' => $name,
            'modified' => $modified
        ]);
    } else {
        echo json_encode([
            'name' => $name,
            'mime' => mime_content_type($dir),
            'modified' => $modified
        ]);
    }
}
