<?php
header('Content-Type: application/json');

$path = str_ends_with($_SERVER['PATH_INFO'], "/") ? substr($_SERVER['PATH_INFO'], 0, -1) : $_SERVER['PATH_INFO'];
$dir = "/www/file$path";
$array = explode("/", $path);
$name = $array[count($array) - 1];
$db = new PDO('mysql:host=' . $_ENV["DB_HOST"] . ';dbname=' . $_ENV["DB_NAME"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"]);
$selector = $db->prepare("SELECT `name`, `modified`, `mime` FROM `mime` WHERE `name` = :name AND `modified` = :modified");
$inserter = $db->prepare('INSERT INTO `mime` (`name`, `modified`, `mime`) VALUES (:name, :modified, :mime) ON DUPLICATE KEY UPDATE `modified` = VALUES(`modified`), `mime` = VALUES(`mime`)');

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
        $selector->execute([
            'name' => $_SERVER['PATH_INFO'],
            'modified' => date("Y-m-d H:i:s", $modified)
        ]);
        $row = $selector->fetch();
        if ($row) {
            echo json_encode([
                'name' => $name,
                'modified' => $modified,
                'mime' => $row['mime']
            ]);
        } else {
            $mime = mime_content_type($dir);
            echo json_encode([
                'name' => $name,
                'modified' => $modified,
                'mime' => $mime
            ]);
            $inserter->execute([
                'name' => $_SERVER['PATH_INFO'],
                'modified' => date("Y-m-d H:i:s", $modified),
                'mime' => $mime
            ]);
        }
    }
}
