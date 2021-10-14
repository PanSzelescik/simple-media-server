import {Row} from 'react-bootstrap';
import Directory from './cards/Directory.jsx';
import File from './cards/File.jsx';

export default function Files({path, files, dirs}) {
    return <>
        {dirs.length > 0 && DirsList(path, dirs)}
        {files.length > 0 && FilesList(path, files)}
    </>;
}

function DirsList(path, dirs) {
    return <>
        <h5>Foldery</h5>
        <Row xs={2} md={4} lg={6} xl={8} className="gx-0">
            {dirs.map(({name, modified, size}) => <Directory key={name} path={path} dir={name} modified={modified} size={size}/>)}
        </Row>
    </>;
}

function FilesList(path, files) {
    return <>
        <h5>Pliki</h5>
        <Row xs={2} md={4} lg={6} xl={8} className="gx-0">
            {files.map(({name, mime, modified}) => <File key={name} path={path} file={name} mime={mime} modified={modified}/>)}
        </Row>
    </>;
}
