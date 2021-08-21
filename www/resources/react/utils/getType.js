import Image from '../type/Image.jsx';
import Unknown from '../type/Unknown.jsx';
import Video from '../type/Video.jsx';

export function getType(mime, string) {
    const type = _getType(mime);
    return string ? type : types[type];
}

export function _getType(mime) {
    if (mime) {
        if (mime.startsWith('image')) {
            return 'image';
        }
        if (mime.startsWith('video')) {
            return 'video';
        }
    }
    return 'unknown';
}

const types = {
    image: Image,
    video: Video,
    unknown: Unknown
}
