import {render} from 'react-dom';
import Home from '../react/App.jsx';

render(<Home/>, document.getElementById('app'));

window.addEventListener('load', async () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/resources/service-worker.js', {scope: '/'});
    }
});
