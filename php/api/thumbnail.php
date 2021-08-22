<?php

$path = str_ends_with($_SERVER['PATH_INFO'], "/") ? substr($_SERVER['PATH_INFO'], 0, -1) : $_SERVER['PATH_INFO'];
$dir = "/www/file$path";
$array = explode("/", $path);
$name = $array[count($array) - 1];
$thumbnails_dir = "/www/cache/thumbnails$path";
$file = "$thumbnails_dir.webp";

if (!file_exists($file)) {
    $cmd = "ffprobe \"$dir\" -show_entries stream=duration";
    exec($cmd, $output, $code);

    $duration = 0;
    foreach ($output as $value) {
        if (str_starts_with($value, "duration=")) {
            $duration_string = explode("=", $value)[1];
            $duration = floor(floatval($duration_string)) / 2;
            break;
        }
    }
    unset($value);

    array_pop($array);
    $joined = join("/", $array);
    $cache_path = "/www/cache/thumbnails/$joined";
    if (file_exists($cache_path) || mkdir($cache_path, 0700, true)) {
        $cmd2 = "ffmpeg -ss $duration -i \"$dir\" -vframes 1 \"$file\"";
        exec($cmd2, $output2, $code2);

        if (file_exists($file)) {
            sendFile($file);
        } else {
            header('Content-Type: application/json');
            http_response_code(404);
            echo json_encode(array(
                'message' => "Can't find or create thumbnail",
                'path' => $_SERVER['PATH_INFO']
            ));
        }
    } else {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(array(
            'message' => "Error creating directory for cache thumbnail",
            'path' => $_SERVER['PATH_INFO']
        ));
    }
} else {
    if (is_dir($file)) {
        header('Content-Type: application/json');
        http_response_code(500);
        echo json_encode(array(
            'message' => "Given path is a directory",
            'path' => $_SERVER['PATH_INFO']
        ));
    } else {
        sendFile($file);
    }
}

function sendFile(string $file)
{
    $fp = fopen($file, 'rb');
    header("Content-Type: image/webp");
    header("Content-Length: " . filesize($file));
    fpassthru($fp);
    exit;
}
