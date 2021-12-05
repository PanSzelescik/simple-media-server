<?php
header('Content-Type: application/json');
require_once 'redis.php';

$path = str_ends_with($_SERVER['PATH_INFO'], "/") ? substr($_SERVER['PATH_INFO'], 0, -1) : $_SERVER['PATH_INFO'];
$dir = "/www/file$path";
$files = [];
$dirs = [];
$to_insert = [];

if (!file_exists($dir)) {
    http_response_code(404);
    echo json_encode([
        'message' => "Can't find directory",
        'path' => $_SERVER['PATH_INFO']
    ]);
    die();
}

if (!is_dir($dir)) {
    http_response_code(500);
    echo json_encode([
        'message' => 'Given path is not a directory',
        'path' => $_SERVER['PATH_INFO']
    ]);
}

if ($dh = opendir($dir)) {
    $rows = getFilesInfo($_SERVER['PATH_INFO']);
    while (($name = readdir($dh)) != false) {
        if ($name !== '.' and $name !== '..') {
            $path = "$dir/$name";

            $modified = @filemtime($path);
            if ($modified === false) {
                $modified = -1;
            }

            if (is_dir($path)) {
                $dirs[] = [
                    'name' => $name,
                    'modified' => $modified
                ];
            } else {
                $db_name = "{$_SERVER['PATH_INFO']}/$name";
                $size = @filesize($path);
                if ($size === false) {
                    $size = 0;
                }

                $cached_row = false;
                $row = @$rows[$db_name];
                if ($row && $row['modified'] === $modified) {
                    $cached_row = $row;
                }

                if ($cached_row) {
                    $files[] = [
                        'name' => $name,
                        'modified' => $modified,
                        'mime' => $cached_row['mime'],
                        'size' => $size
                    ];
                } else {
                    $mime = @mime_content_type($path);
                    if ($mime === false) {
                        $mime = 'unknown';
                    }

                    $files[] = [
                        'name' => $name,
                        'modified' => $modified,
                        'mime' => $mime,
                        'size' => $size
                    ];

                    $to_insert[$db_name] = [
                        'modified' => $modified,
                        'mime' => $mime,
                        'size' => $size
                    ];
                }
            };
        }
    }
    closedir($dh);
    echo json_encode([
        'files' => $files,
        'dirs' => $dirs,
        'path' => substr($_SERVER['PATH_INFO'], 1)
    ]);
    insertFilesInfo($to_insert);
} else {
    http_response_code(500);
    echo json_encode([
        'message' => "Directory can't be opened",
        'path' => $_SERVER['PATH_INFO']
    ]);
}
