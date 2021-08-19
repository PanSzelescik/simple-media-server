import modifiedTimestamp from '../utils/modifiedTimestamp.js';

export default function Image({path = '', headers}) {
    return <img className="view-item" src={`/file/${path}?m=${modifiedTimestamp(headers.get('last-modified'))}`}
                alt={path.split('/').pop()}/>;
}
