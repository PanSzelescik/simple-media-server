import {createElement, useContext} from 'react';
import {Col, Row} from 'react-bootstrap';
import AppBreadcrumb from './AppBreadcrumb.jsx';
import Loader from './base/Loader.jsx';
import {SettingsContext} from './utils/settings.js';
import useListFiles from './utils/useListFiles.js';
import usePath from './utils/usePath.js';

export default function Main({children}) {
    const {path, pathArray, isView} = usePath();
    const {isLoading, error, files, dirs} = useListFiles(path, isView);
    const settings = useContext(SettingsContext);

    function render() {
        if (isLoading) {
            return <Loader/>;
        }

        if (error) {
            return <h1 className={settings.getDarkModeText()}>Nie znaleziono strony bądź pliku</h1>
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
