import {memo} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Files from './Files.jsx';
import Main from './Main.jsx';
import View from './View.jsx';

export default function AppSwitch() {
    return <Switch>
        <Route path="/files/*">
            <Main children={Files}/>
        </Route>
        <Route path="/files">
            <Main children={Files}/>
        </Route>
        <Route path="/view/*">
            <Main children={View}/>
        </Route>
        <Route path="/">
            <Home/>
        </Route>
    </Switch>;
}

const Home = memo(() => (
    <Link to="/files">Przejdź do plików</Link>
));
