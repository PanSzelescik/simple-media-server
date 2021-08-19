import {Col, Row} from 'react-bootstrap';
import useFetch from 'react-fetch-hook';
import {useRouteMatch} from 'react-router-dom';
import AppBreadcrumb from './AppBreadcrumb.jsx';
import Directory from './cards/Directory.jsx';
import File from './cards/File.jsx';
import Loader from './base/Loader.jsx';

export default function Files() {
    const {params} = useRouteMatch();
    let path = params[0] || '';
    if (path) {
        path += '/';
    }

    const array = [['/files', 'Pliki']];
    path.split('/').filter(Boolean).forEach((name) => array.push([`${array[array.length - 1][0]}/${name}`, name]));

    const {isLoading, data, error} = useFetch(`/file/${path}`, {
        depends: [!!params]
    });

    function render() {
        if (isLoading || error) {
            return <Loader/>;
        }
        return <Row xs={2} md={4} lg={6} xl={8} className="gx-0">
            {data.filter((file) => file.type === 'directory').map(({name}) => <Directory key={name} path={path} dir={name}/>)}
            {data.filter((file) => file.type === 'file').map(({name}) => <File key={name} path={path} file={name}/>)}
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
