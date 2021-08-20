import modifiedTimestamp from './modifiedTimestamp.js';

export function getPath(path) {
    if (!path.endsWith('/')) {
        path += '/';
    }
    return path;
}

export function getFilePath(path, file, stats = {}) {
    if (stats) {
        const type = types[stats.type];
        if (type) {
            return type(path, file, stats);
        }
    }
    return '/resources/icons/directory.svg';
}

const types = {
    image: (path, file, {modified}) => `${getPath(`/file/${path}`)}${encodeURIComponent(file)}?m=${modifiedTimestamp(modified)}`,
    video: (path, file, {modified}) => `${getPath(`/thumbnail/${path}`)}${encodeURIComponent(file)}?m=${modifiedTimestamp(modified)}`
}
