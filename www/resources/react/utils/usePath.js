import {useRouteMatch} from 'react-router-dom';

export default function usePath() {
    const {params, url, path: routerPath} = useRouteMatch();
    let path = params[0] || '';
    if (path.endsWith('/')) {
        path = path.substring(0, path.length - 1);
    }

    const pathArray = [['/files', 'Pliki']];
    path.split('/')
        .filter(Boolean)
        .forEach((name, index, array) => pathArray.push([array.length - 1 === index ? url : `${pathArray[pathArray.length - 1][0]}/${name}`, name]));

    return {path, pathArray, isView: routerPath === '/view/*'};
}
