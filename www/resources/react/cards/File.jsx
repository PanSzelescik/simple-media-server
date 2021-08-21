import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {getFilePath, getPath} from '../utils/getFilePath.js';

export default function File({path = '', file = '', mime, modified}) {
    return <Col>
        <Link to={`${getPath(`/view/${path}`)}${encodeURIComponent(file)}`}>
            <Card>
                <Card.Img variant="top" loading="lazy" src={getFilePath(path, file, mime, modified)} alt={file}/>
                <Card.Body>
                    <Card.Title className="text-center text-truncate">{file}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    </Col>;
}
