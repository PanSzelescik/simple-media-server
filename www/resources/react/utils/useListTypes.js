import {useEffect, useState} from 'react';
import {getTypeFromHeaders} from './getType.js';

export default function useListTypes(path, files) {
    const [responses, setResponses] = useState(files.map(({name}) => fetch(`/file/${path}/${name}`, {method: 'HEAD'})));
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const array = await Promise.all(responses);
            setResponses(Object.fromEntries(array.map(({headers, url}) => {
                const splittedUrl = url.split('/');
                return [splittedUrl[splittedUrl.length - 1], {
                    type: getTypeFromHeaders(headers, true),
                    modified: headers.get('last-modified')
                }]
            })));
            setLoading(false);
        }

        fetchData();
    }, [path, files]);

    return {isLoading, responses}
}
