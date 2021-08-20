import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getFilePath, getPath} from '../utils/getFilePath.js';

export default function File({path = '', file = '', stats}) {
    const src = stats ? getFilePath(path, file, stats) : null;
    return <Col>
        <Link to={`${getPath(`/view/${path}`)}${encodeURIComponent(file)}`}>
            <Card>
                <Card.Img variant="top" loading="lazy" src={src} alt={file}/>
                <Card.Body>
                    <Card.Title className="text-center text-truncate">{file}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    </Col>;
}
