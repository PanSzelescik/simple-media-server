import {memo} from 'react';
import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function Directory({path = '', dir = '', stats = {}}) {
    return <Col>
        <Link to={`/files/${path}${dir}`}>
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
