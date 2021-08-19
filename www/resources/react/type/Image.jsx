import modifiedTimestamp from '../utils/modifiedTimestamp.js';

export default function Image({path = '', headers = {}, stats = {}}) {
    return <img className="view-item" src={`/file/${path}?m=${modifiedTimestamp(stats.modified)}`}
                alt={path.split('/').pop()}/>;
}
