import {Col, Row} from 'react-bootstrap';
import useFetch from 'react-fetch-hook';
import {useHistory, useRouteMatch} from 'react-router-dom';
import AppBreadcrumb from './AppBreadcrumb.jsx';
import Loader from './base/Loader.jsx';
import {createElement} from 'react';
import {getType} from './utils/getType.js';
import LeftNav from './view/LeftNav.jsx';
import RightNav from './view/RightNav.jsx';
import Swipeable from './view/Swipeable.jsx';

export default function View() {
    const history = useHistory();
    const {params} = useRouteMatch();
    let path = params[0] || '';

    const array = [['/files', 'Pliki']];
    const dirs = path.split('/').filter(Boolean);
    dirs.forEach((name) => array.push([`${array[array.length - 1][0]}/${name}`, name]));

    const {isLoading, data, error} = useFetch(array[array.length - 2][0].replace('/files', '/file'), {
        depends: [!!params]
    });
    const {isLoading: isLoading2, data: headers, error: error2} = useFetch(array[array.length - 1][0].replace('/files', '/file'), {
        method: 'HEAD',
        formatter: (response) => response.headers
    });

    function render() {
        if (isLoading || isLoading2 || error | error2) {
            return <Loader/>;
        }
        const files = data.filter(({type}) => type === 'file');
        const index = files.findIndex(({name}) => name === dirs[dirs.length - 1]);
        const type = getType(headers);

        function prev() {
            const dir = data.path ? `${data.path}/` : '';
            history.push(`/view/${dir}${files[index - 1].name}`);
        }

        function next() {
            const dir = data.path ? `${data.path}/` : '';
            history.push(`/view/${dir}${files[index + 1].name}`);
        }

        return <Row>
            <div className="view">
                <LeftNav onClick={prev} disabled={index === 0}/>
                <RightNav onClick={next} disabled={index === files.length - 1}/>
                <Swipeable onSwipedLeft={index === files.length - 1 ? null : next}
                           onSwipedRight={index === 0 ? null : prev} children={createElement(type, {
                    key: path,
                    path: path,
                    headers
                })}/>
            </div>
        </Row>;
    }

    return <>
        <AppBreadcrumb position={Object.fromEntries(array)}/>
        <Row>
            <Col>
                {render()}
            </Col>
        </Row>
    </>;
}
