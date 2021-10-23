<?php
header('Content-Type: application/json');

$dir = "/www/file{$_SERVER['PATH_INFO']}";
$files = [];
$dirs = [];
$db = new PDO('mysql:host=' . $_ENV["DB_HOST"] . ';dbname=' . $_ENV["DB_NAME"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"]);
$selector = $db->prepare("SELECT `name`, `modified`, `mime` FROM `mime` WHERE `name` LIKE '{$_SERVER['PATH_INFO']}%'");
$inserter = $db->prepare('INSERT INTO `mime` (`name`, `modified`, `mime`) VALUES (:name, :modified, :mime) ON DUPLICATE KEY UPDATE `modified` = VALUES(`modified`), `mime` = VALUES(`mime`)');

if (!file_exists($dir)) {
    http_response_code(404);
    echo json_encode([
        'message' => "Can't find directory",
        'path' => $_SERVER['PATH_INFO']
    ]);
} else {
    if (is_dir($dir)) {
        $selector->execute();
        $rows = $selector->fetchAll();
        if ($dh = opendir($dir)) {
            $db->beginTransaction();
            while (($name = readdir($dh)) != false) {
                if ($name != "." and $name != "..") {
                    $path = "$dir/$name";

                    $modified = @filemtime($path);
                    if ($modified === false) {
                        $modified = -1;
                    }

                    if (is_dir($path)) {
                        array_push($dirs, [
                            'name' => $name,
                            'modified' => $modified
                        ]);
                    } else {
                        $db_name = "{$_SERVER['PATH_INFO']}/$name";
                        $cached_row = false;
                        $size = @filesize($path);
                        if ($size === false) {
                            $size = 0;
                        }
                        foreach ($rows as $row) {
                            if ($row['name'] === $db_name) {
                                if (strtotime($row['modified']) === $modified) {
                                    $cached_row = $row;
                                }
                                break;
                            }
                        }
                        if ($cached_row) {
                            array_push($files, [
                                'name' => $name,
                                'modified' => $modified,
                                'mime' => $cached_row['mime'],
                                'size' => $size
                            ]);
                        } else {
                            $mime = @mime_content_type($path);
                            if ($mime === false) {
                                $mime = 'unknown';
                            }

                            array_push($files, [
                                'name' => $name,
                                'modified' => $modified,
                                'mime' => $mime,
                                'size' => $size
                            ]);
                            $inserter->execute([
                                'name' => $db_name,
                                'modified' => date("Y-m-d H:i:s", $modified),
                                'mime' => $mime,
                                //'size' => $size
                            ]);
                        }
                    };
                }
            }
            $db->commit();
            echo json_encode([
                'files' => $files,
                'dirs' => $dirs,
                'path' => substr($_SERVER['PATH_INFO'], 1)
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                'message' => "Directory can't be opened",
                'path' => $_SERVER['PATH_INFO']
            ]);
        }
    } else {
        http_response_code(500);
        echo json_encode([
            'message' => "Given path is not a directory",
            'path' => $_SERVER['PATH_INFO']
        ]);
    }
}
