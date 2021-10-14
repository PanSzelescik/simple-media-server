import {useContext} from 'react';
import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {dateSubtitle} from '../utils/dateString.jsx';
import {fileSize} from '../utils/fileSize.jsx';
import {getFilePath, getPath} from '../utils/getFilePath.js';
import {SettingsContext} from '../utils/settings.js';

export default function File({path = '', file = '', mime, modified = -1, size = 0}) {
    const settings = useContext(SettingsContext);

    return <Col>
        <Link to={`${getPath(`/view/${path}`)}${encodeURIComponent(file)}`}>
            <Card title={file}>
                <Card.Img variant="top" loading="lazy" src={getFilePath(path, file, mime, modified)} alt={file}/>
                <Card.Body>
                    <Card.Title className="text-center text-truncate">{file}</Card.Title>
                    {settings.show_modified && dateSubtitle(modified)}
                    {settings.show_size && fileSize(size)}
                </Card.Body>
            </Card>
        </Link>
    </Col>;
}
