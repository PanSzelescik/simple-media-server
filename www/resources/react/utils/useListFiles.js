import useFetch from 'react-fetch-hook';
import {sorter} from './sorter.js';

export default function useListFiles(path, isView) {
    if (isView) {
        const array = path.split('/').filter(Boolean);
        array.pop();
        path = array.join('/');
    }

    const {isLoading, data, error} = useFetch(`/api/files.php/${path}`);
    if (isLoading || error) {
        return {
            isLoading,
            error,
            files: [],
            dirs: []
        }
    }
    return {
        isLoading,
        error,
        files: data.files.sort(sorter.name),
        dirs: data.dirs.sort(sorter.name)
    }
}
