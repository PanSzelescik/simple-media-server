import {Row} from 'react-bootstrap';
import Directory from './cards/Directory.jsx';
import File from './cards/File.jsx';
import useListTypes from './utils/useListTypes.js';

export default function Files({path, files, dirs}) {
    const {isLoading, responses} = useListTypes(path, files);

    return <Row xs={2} md={4} lg={6} xl={8} className="gx-0">
        {dirs.map(({name}) => <Directory key={name} path={path} dir={name}/>)}
        {files.map(({name}) => <File key={name} path={path} file={name} stats={isLoading ? null : responses[name]} />)}
    </Row>;
}
