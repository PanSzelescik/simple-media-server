import {useQuery} from 'react-query';

export default function useFetch(path) {
    return useQuery(path, () => fetch(path).then((res) => {
        if (res.ok) {
            return res.json();
        }
        const error = new Error('Fetch Error');
        error.res = res;
        error.path = path;
        throw error;
    }));
}
