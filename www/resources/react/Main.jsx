import {createElement} from 'react';
import {Col, Row} from 'react-bootstrap';
import AppBreadcrumb from './AppBreadcrumb.jsx';
import Loader from './base/Loader.jsx';
import useListFiles from './utils/useListFiles.js';
import usePath from './utils/usePath.js';

export default function Main({children}) {
    const {path, pathArray, isView} = usePath();
    const {isLoading, error, files, dirs} = useListFiles(path, isView);
    console.log(files);

    function render() {
        if (isLoading) {
            return <Loader/>;
        }

        if (error) {
            return <h1>Nie znaleziono strony bądź pliku</h1>
        }

        return createElement(children, {
            path,
            pathArray,
            files,
            dirs
        });
    }

    return <>
        <AppBreadcrumb position={Object.fromEntries(pathArray)}/>
        <Row>
            <Col>
                {render()}
            </Col>
        </Row>
    </>;
}
