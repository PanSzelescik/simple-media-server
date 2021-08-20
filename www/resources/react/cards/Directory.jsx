import {memo} from 'react';
import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getPath} from '../utils/getFilePath.js';

export default function Directory({path = '', dir = ''}) {
    return <Col>
        <Link to={`${getPath(`/files/${path}`)}${encodeURIComponent(dir)}`}>
            <DirectoryCard dir={dir}/>
        </Link>
    </Col>;
}

const DirectoryCard = memo(({dir}) => (
    <Card>
        <Card.Img variant="top" loading="lazy" src="/resources/icons/directory.svg" alt={dir}/>
        <Card.Body>
            <Card.Title className="text-center text-truncate">{dir}</Card.Title>
        </Card.Body>
    </Card>
));
