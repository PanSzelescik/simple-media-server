import {Row} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import Loader from './base/Loader.jsx';
import {createElement, useContext} from 'react';
import {getType} from './utils/getType.js';
import {SettingsContext} from './utils/settings.js';
import useFetch from './utils/useFetch.js';
import LeftNav from './view/LeftNav.jsx';
import RightNav from './view/RightNav.jsx';
import Swipeable from './view/Swipeable.jsx';

export default function View({path, pathArray, files}) {
    const settings = useContext(SettingsContext);
    const navigate = useNavigate();

    const element = pathArray[pathArray.length - 1];
    const index = files.findIndex(({name}) => name === element[1]);

    const {isLoading, data, error} = useFetch(element[0].replace('/view', '/api/file.php'));

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return <h1 className={settings.getDarkModeText()}>Nie znaleziono strony bądź pliku</h1>
    }

    function prev(e) {
        const event = e.event || e.nativeEvent;
        if (!(event.target?.nodeName === 'VIDEO' && event.target === document.fullscreenElement)) {
            navigate(`${pathArray[pathArray.length - 2][0].replace('/files', '/view')}/${files[index - 1].name}`);
        }
    }

    function next(e) {
        const event = e.event || e.nativeEvent;
        if (!(event.target?.nodeName === 'VIDEO' && event.target === document.fullscreenElement)) {
            navigate(`${pathArray[pathArray.length - 2][0].replace('/files', '/view')}/${files[index + 1].name}`);
        }
    }

    const prevDisabled = index === 0;
    const nextDisabled = index === files.length - 1;
    const type = getType(data?.mime);

    return <Row>
        <div className="view">
            <LeftNav onClick={prev} disabled={prevDisabled}/>
            <RightNav onClick={next} disabled={nextDisabled}/>
            <Swipeable onSwipedLeft={nextDisabled ? null : next}
                       onSwipedRight={prevDisabled ? null : prev} children={createElement(type, {
                key: path,
                path: path,
                data
            })}/>
        </div>
    </Row>;
}
