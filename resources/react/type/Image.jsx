import useFetch from 'react-fetch-hook';
import ImageGallery from 'react-image-gallery';
import {useHistory} from 'react-router-dom';
import Loader from '../base/Loader.jsx';
import modifiedTimestamp from '../utils/modifiedTimestamp.js';

export default function Image({path = '', stats = {}}) {
    /*const array = path.split('/');
    array.pop();
    const dir = array.join('/')

    const {isLoading, data} = useFetch(`/api/files/${dir}?type=image`);
    const history = useHistory();

    function render() {
        if (isLoading) {
            return <Loader/>;
        }
        const items = Object.keys(data.files).map((name) => ({
            original: `/file/${dir}/${name}`
        }));
        console.log(items);
        console.log(path);
        return <ImageGallery items={items} lazyLoad startIndex={items.findIndex(({original}) => original === `/file/${path}`)} onSlide={(index) => history.push(items[index].original.replace('/file', '/view'))}/>;
    }
    return render();*/
    return <img className="view-item" src={`/file/${path}?m=${modifiedTimestamp(stats.modified)}`}
                alt={path.split('/').pop()}/>;
}
