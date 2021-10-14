import {useContext} from 'react';
import {Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {dateSubtitle} from '../utils/dateString.jsx';
import {getPath} from '../utils/getFilePath.js';
import {SettingsContext} from '../utils/settings.js';

export default function Directory({path = '', dir = '', modified = -1}) {
    const settings = useContext(SettingsContext);

    return <Col>
        <Link to={`${getPath(`/files/${path}`)}${encodeURIComponent(dir)}`}>
            <Card title={dir}>
                <Card.Body>
                    <Card.Title className="text-center text-truncate">{dir}</Card.Title>
                    {settings.show_modified && dateSubtitle(modified)}
                </Card.Body>
            </Card>
        </Link>
    </Col>;
}
