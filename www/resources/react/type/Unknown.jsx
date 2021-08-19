import {memo} from 'react';

const Unknown = memo(({path}) => (
    <h1>Nieznany typ pliku, <a href={`/file/${path}`}>pobierz go</a></h1>
));

export default Unknown;
