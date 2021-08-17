import {Col, Row} from 'react-bootstrap';
import useFetch from 'react-fetch-hook';
import {useHistory, useRouteMatch} from 'react-router-dom';
import AppBreadcrumb from './AppBreadcrumb.jsx';
import Loader from './base/Loader.jsx';
import Image from './type/Image.jsx';
import Text from './type/Text.jsx';
import Unknown from './type/Unknown.jsx';
import {createElement} from 'react';
import Video from './type/Video.jsx';
import LeftNav from './view/LeftNav.jsx';
import RightNav from './view/RightNav.jsx';
import Swipeable from './view/Swipeable.jsx';

const types = {
    image: Image,
    video: Video,
    text: Text
};

export default function View() {
    const history = useHistory();
    const {params} = useRouteMatch();
    let path = params[0] || '';

    const array = [['/files', 'Pliki']];
    const dirs = path.split('/').filter(Boolean);
    dirs.forEach((name) => array.push([`${array[array.length - 1][0]}/${name}`, name]));

    const {isLoading, data, error} = useFetch(`/api${array[array.length - 2][0]}`, {
        depends: [!!params]
    });

    function render() {
        if (isLoading || error) {
            return <Loader/>;
        }
        const [fileName, stats] = Object.entries(data.files).find(([fileName]) => fileName === dirs[dirs.length - 1]);
        const index = Object.entries(data.files).findIndex(([fileName]) => fileName === dirs[dirs.length - 1]);
        const type = types[stats.type] || Unknown;

        function prev() {
            const dir = data.path ? `${data.path}/` : ''
            history.push(`/view/${dir}${Object.keys(data.files)[index - 1]}`);
        }

        function next() {
            const dir = data.path ? `${data.path}/` : ''
            history.push(`/view/${dir}${Object.keys(data.files)[index + 1]}`);
        }

        return <Row>
            <div className="view">
                <LeftNav onClick={prev} disabled={index === 0}/>
                <RightNav onClick={next} disabled={index === Object.entries(data.files).length - 1}/>
                <Swipeable onSwipedLeft={index === Object.entries(data.files).length - 1 ? null : next} onSwipedRight={index === 0 ? null : prev} children={createElement(type, {
                    key: path,
                    path: path,
                    stats
                })}/>
            </div>
        </Row>
        /*return <Row>
            {createElement(type, {
                key: path,
                path: path,
                stats: data
            })}
        </Row>*/
    }

    return <>
        <AppBreadcrumb position={Object.fromEntries(array)}/>
        <Row>
            <Col>
                {render()}
            </Col>
        </Row>
    </>
}
