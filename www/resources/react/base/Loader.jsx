import {memo, useContext} from 'react';
import {Spinner} from 'react-bootstrap';
import {SettingsContext} from '../utils/settings.js';

const Loader = memo(() => {
    const settings = useContext(SettingsContext);

    return <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" variant={settings.getDarkModeInverted()}>
            <span className={`visually-hidden ${settings.getDarkModeText()}`}>Ładowanie...</span>
        </Spinner>
    </div>;
});

export default Loader;
