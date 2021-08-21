<?php
header('Content-Type: application/json');

$dir = "/www/file/{$_SERVER['PATH_INFO']}";
$files = array();
$dirs = array();

if (!file_exists($dir)) {
    http_response_code(404);
    echo json_encode(array(
        'message' => "Can't find directory",
        'path' => $_SERVER['PATH_INFO']
    ));
} else {
    if (is_dir($dir)) {
        if ($dh = @opendir($dir)) {
            while (($name = readdir($dh)) != false) {
                if ($name != "." and $name != "..") {
                    $path = "$dir/$name";
                    if (is_dir($path)) {
                        array_push($dirs, array(
                            'name' => $name,
                            'modified' => @filemtime($path)
                        ));
                    } else {
                        array_push($files, array(
                            'name' => $name,
                            'mime' => @mime_content_type($path),
                            'modified' => @filemtime($path),
                            'size' => @filesize($path)
                        ));
                    };
                }
            }
            echo json_encode(array(
                'files' => $files,
                'dirs' => $dirs
            ));
        } else {
            http_response_code(500);
            echo json_encode(array(
                'message' => "Directory can't be opened",
                'path' => $_SERVER['PATH_INFO']
            ));
        }
    } else {
        http_response_code(500);
        echo json_encode(array(
            'message' => "Given path is not a directory",
            'path' => $_SERVER['PATH_INFO']
        ));
    }
}

