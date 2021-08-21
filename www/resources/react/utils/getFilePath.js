import {getType} from './getType.js';

export function getPath(path) {
    if (!path.endsWith('/')) {
        path += '/';
    }
    return path;
}

export function getFilePath(path, file, mime, modified) {
    if (mime) {
        const type = getType(mime, true);
        if (type) {
            const func = types[type];
            if (func) {
                return func(path, file, modified);
            }
        }
    }
    return '/resources/icons/directory.svg';
}

const types = {
    image: (path, file, modified) => `${getPath(`/file/${path}`)}${encodeURIComponent(file)}?m=${modified}`,
    video: (path, file, modified) => `${getPath(`/api/thumbnail.php/${path}`)}${encodeURIComponent(file)}?m=${modified}`
}
