import useFetch from 'react-fetch-hook';

export default function useListFiles(path, isView) {
    if (isView) {
        const array = path.split('/').filter(Boolean);
        array.pop();
        path = array.join('/');
    }

    const {isLoading, data, error} = useFetch(`/file/${path}`);
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
        files: data.filter((file) => file.type === 'file'),
        dirs: data.filter((file) => file.type === 'directory')
    }
}
