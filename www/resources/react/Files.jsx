import {useContext} from 'react';
import {Row} from 'react-bootstrap';
import Directory from './cards/Directory.jsx';
import File from './cards/File.jsx';
import {SettingsContext} from './utils/settings.js';

export default function Files({path, files, dirs}) {
    const settings = useContext(SettingsContext);

    return <>
        {dirs.length > 0 && DirsList(path, dirs, settings)}
        {files.length > 0 && FilesList(path, files, settings)}
    </>;
}

function DirsList(path, dirs, settings) {
    return <>
        <h5 className={settings.getDarkModeText()}>Foldery</h5>
        <Row xs={2} md={4} lg={6} xl={8} className="gx-0 dirs">
            {dirs.map(({name, modified, size}) => <Directory key={name} path={path} dir={name} modified={modified} size={size}/>)}
        </Row>
    </>;
}

function FilesList(path, files, settings) {
    return <>
        <h5 className={settings.getDarkModeText()}>Pliki</h5>
        <Row xs={2} md={4} lg={6} xl={8} className="gx-0 files">
            {files.map(({name, mime, modified}) => <File key={name} path={path} file={name} mime={mime} modified={modified}/>)}
        </Row>
    </>;
}
