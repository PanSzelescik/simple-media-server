import {Col, Container, Row} from 'react-bootstrap';
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

    const {isLoading, data, error} = useFetch(`/api/files/${path}`, {
        depends: [!!params]
    });

    function render() {
        if (data?.path !== path || isLoading || error) {
            return <Loader/>;
        }
        return <Row xs={2} md={4} lg={6} xl={8} className="gx-0">
            {Object.entries(data.directories).map(([dir, stats]) => <Directory key={dir} path={path} dir={dir} stats={stats}/>)}
            {Object.entries(data.files).map(([file, stats]) => <File key={file} path={path} file={file} stats={stats}/>)}
        </Row>
    }

    return <>
        <AppBreadcrumb position={Object.fromEntries(array)}/>
        <Row>
            <Col>
                {render()}
            </Col>
        </Row>
    </>
}
