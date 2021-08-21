import {Breadcrumb, Col, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function AppBreadcrumb({position}) {
    return <Row>
        <Col>
            <Breadcrumb>
                {Object.entries(position).map(([href, name], index, array) => <Item key={href} href={href} name={name}
                                                                                    bold={array.length - 1 === index}/>)}
            </Breadcrumb>
        </Col>
    </Row>;
}

function Item({href, name, bold}) {
    return <li className="breadcrumb-item">
        <Link className={bold ? 'fw-bold' : null} to={href}>{decodeURIComponent(name)}</Link>
    </li>;
}
