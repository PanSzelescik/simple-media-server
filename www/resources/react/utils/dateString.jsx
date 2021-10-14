import locale from 'date-fns/esm/locale/pl/index.js';
import format from 'date-fns/esm/format/index.js';
import {Card} from 'react-bootstrap';

function dateString(timestamp) {
    return format(new Date(timestamp * 1000), 'dd MMM yyyy HH:mm:ss', {locale});
}

export function dateSubtitle(modified) {
    return <Card.Subtitle className="text-center">{dateString(modified)}</Card.Subtitle>;
}
