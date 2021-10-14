import {Card} from 'react-bootstrap';

export function fileSize(size) {
    size = size || 0;
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
    while (size >= 1024) {
        size /= 1024;
        ++i;
    }
    const computed = `${Math.round(size)} ${units[i]}`;
    return <Card.Subtitle className="text-center">{computed}</Card.Subtitle>;
}
