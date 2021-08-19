import Image from '../type/Image.jsx';
import Unknown from '../type/Unknown.jsx';
import Video from '../type/Video.jsx';

export function getTypeFromHeaders(headers, string) {
    return getType(headers.get('content-type'), string);
}

export function getType(type, string) {
    if (type) {
        if (type.startsWith('image')) {
            return string ? 'image' : Image;
        }
        if (type.startsWith('video')) {
            return string ? 'video' : Video;
        }
    }
    return string ? 'unknown' : Unknown;
}
