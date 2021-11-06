import {memo, useContext} from 'react';
import {SettingsContext} from '../utils/settings.js';

const Unknown = memo(({path}) => {
    const settings = useContext(SettingsContext);

    return <h1 className={settings.getDarkModeText()}>Nieznany typ pliku, <a href={`/file/${path}?download`}>pobierz go</a></h1>
});

export default Unknown;
