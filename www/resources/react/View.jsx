import {Row} from 'react-bootstrap';
import useFetch from 'react-fetch-hook';
import {useHistory} from 'react-router-dom';
import Loader from './base/Loader.jsx';
import {createElement} from 'react';
import {getType} from './utils/getType.js';
import LeftNav from './view/LeftNav.jsx';
import RightNav from './view/RightNav.jsx';
import Swipeable from './view/Swipeable.jsx';

export default function View({path, pathArray, files}) {
    const history = useHistory();

    const element = pathArray[pathArray.length - 1];
    const index = files.findIndex(({name}) => name === element[1]);

    const {isLoading, data, error} = useFetch(element[0].replace('/view', '/api/file.php'));

    if (isLoading) {
        return <Loader/>;
    }

    if (error) {
        return <h1>Nie znaleziono strony bądź pliku</h1>
    }

    function prev({event}) {
        if (!(event.target?.nodeName === 'VIDEO' && event.target === document.fullscreenElement)) {
            history.push(`${pathArray[pathArray.length - 2][0].replace('/files', '/view')}/${files[index - 1].name}`);
        }
    }

    function next({event}) {
        if (!(event.target?.nodeName === 'VIDEO' && event.target === document.fullscreenElement)) {
            history.push(`${pathArray[pathArray.length - 2][0].replace('/files', '/view')}/${files[index + 1].name}`);
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
