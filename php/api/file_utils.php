<?php

$fi = new finfo(FILEINFO_MIME_TYPE);

function getMTime($info) {
    try {
        return $info->getMTime();
    } catch (Exception) {
    }
    return -1;
}

function getSize($info) {
    try {
        return $info->getSize();
    } catch (Exception) {
    }
    return -1;
}

function getMime($path) {
    try {
        global $fi;

        return $fi->file($path);
    } catch (Exception) {
    }
    return 'unknown';
}
