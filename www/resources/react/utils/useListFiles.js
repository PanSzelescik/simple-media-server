import {useContext} from 'react';
import {SettingsContext} from './settings.js';
import {sorter} from './sorter.js';
import useFetch from './useFetch.js';

export default function useListFiles(path, isView) {
    if (isView) {
        const array = path.split('/').filter(Boolean);
        array.pop();
        path = array.join('/');
    }

    const settings = useContext(SettingsContext);
    const {isLoading, data = {}, error} = useFetch(`/api/files.php/${path}`);
    if (isLoading || error || path !== data?.path) {
        return {
            isLoading,
            error,
            files: [],
            dirs: []
        }
    }
    const files = data?.files?.sort?.(sorter[settings.sort_name]) ?? [];
    const dirs = data?.dirs?.sort?.(sorter[settings.sort_name === 'size' ? 'name' : settings.sort_name]) ?? [];
    return {
        isLoading,
        error,
        files: settings.sort_reverse ? files.reverse() : files,
        dirs: settings.sort_reverse ? dirs.reverse() : dirs
    }
}
