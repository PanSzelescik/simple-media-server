import Image from '../type/Image.jsx';
import Unknown from '../type/Unknown.jsx';
import Video from '../type/Video.jsx';

export function getType(headers) {
    const type = headers.get('content-type');

    if (type) {
        if (type.startsWith('image')) {
            return Image;
        }
        if (type.startsWith('video')) {
            return Video;
        }
    }
    return Unknown;
}
