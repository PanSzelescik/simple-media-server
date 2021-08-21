export default function Image({path = '', data}) {
    const {modified} = data;
    return <img className="view-item" src={`/file/${path}?m=${modified}`}
                alt={path.split('/').pop()}/>;
}
