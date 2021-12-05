<?php

$prefix = 'file://';

$redis = new Redis();
$redis->connect($_ENV['REDIS_HOST']);

function getFileInfo($name) {
    global $redis, $prefix;

    $row = $redis->get($prefix . $name);
    if ($row) {
        return json_decode($row, true);
    }

    return null;
}

function insertFileInfo($name, $info) {
    global $redis;

    insertFileInfoWithPipeline($name, $info, $redis);
}

function insertFileInfoWithPipeline($name, $info, $pipeline) {
    global $prefix;

    $pipeline->set($prefix . $name, json_encode($info), 3600);
}

function insertFilesInfo($infos) {
    if (!$infos) {
        return;
    }

    global $redis;

    $pipeline = $redis->multi(Redis::PIPELINE);
    foreach ($infos as $name => $info) {
        insertFileInfoWithPipeline($name, $info, $pipeline);
    }
    $pipeline->exec();
}

function getFilesInfo($name): array
{
    global $prefix;
    return getInfo($prefix . $name . '/*');
}

function dumpData(): array
{
    return getInfo('*');
}

function getInfo($pattern): array
{
    global $redis, $prefix;

    $keys = $redis->keys($pattern);
    if (!$keys) {
        $keys = [];
    }

    $values = $redis->mget($keys);
    if (!$values) {
        $values = [];
    }

    $cleaned_keys = array_map(fn($value) => substr($value, strlen($prefix)), $keys);
    $json_values = array_map(fn($value) => json_decode($value, true), $values);

    return array_combine($cleaned_keys, $json_values);
}
