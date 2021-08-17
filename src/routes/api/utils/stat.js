import FileType from 'file-type';
import {stat} from 'fs/promises';

export async function getStats(path = '') {
    const stats = await stat(path);
    if (stats.isDirectory()) {
        return {
            //size: stats.size,
            modified: stats.mtime,
            changed: stats.ctime,
            created: stats.birthtime,
            type: 'directory'
        }
    } else {
        const type = await FileType.fromFile(path);
        const mime = type?.mime ?? null;
        return {
            size: stats.size,
            modified: stats.mtime,
            changed: stats.ctime,
            created: stats.birthtime,
            extension: type?.ext ?? null,
            mime,
            type: getType(mime)
        }
    }
}

function getType(mime = '') {
    if (!mime) mime = '';

    if (mime.startsWith('image')) {
        return 'image';
    }
    if (mime.startsWith('video')) {
        return 'video';
    }
    return null;
}
