import {useLocation, useParams} from 'react-router-dom';

export default function usePath() {
    const {pathname} = useLocation();
    const params = useParams();

    let path = params['*'] || '';
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }

    const pathArray = [['/files', 'Pliki']];
    path.split('/')
        .filter(Boolean)
        .map((name, index, array) => [array.length - 1 === index ? pathname : `${pathArray[pathArray.length - 1][0]}/${name}`, name])
        .forEach((x) => pathArray.push(x));

    return {path, pathArray, isView: pathname.startsWith('/view/')};
}
