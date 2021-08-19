import {memo} from 'react';
import {Link, Route, Switch} from 'react-router-dom';
import Files from './Files.jsx';
import View from './View.jsx';

export default function AppSwitch() {
    return <Switch>
        <Route path="/files/*" component={Files}/>
        <Route path="/files" component={Files}/>
        <Route path="/view/*" component={View}/>
        <Route path="/" component={Home}/>
    </Switch>;
}

const Home = memo(() => (
    <Link to="/files">Przejdź do plików</Link>
));
