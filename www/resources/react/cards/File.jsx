import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import modifiedTimestamp from '../utils/modifiedTimestamp.js';

export default function File({path = '', file = '', stats}) {
    let src = null;
    if (stats) {
        const {type, modified} = stats;
        src = type === 'image' ? `/file/${path}/${file}?m=${modifiedTimestamp(modified)}` : type === 'video' ? `/thumbnail/${path}/${file}?m=${modifiedTimestamp(modified)}` : '/resources/icons/directory.svg';
    }
    return <Col>
        <Link to={`/view/${path}/${file}`}>
            <Card>
                <Card.Img variant="top" loading="lazy" src={src} alt={file}/>
                <Card.Body>
                    <Card.Title className="text-center text-truncate">{file}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    </Col>;
}
