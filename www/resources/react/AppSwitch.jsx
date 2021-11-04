import {memo} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Files from './Files.jsx';
import Main from './Main.jsx';
import View from './View.jsx';

export default function AppSwitch() {
    return <Routes>
        <Route path="/files/*" element={<Main children={Files}/>}/>
        <Route path="/files" element={<Main children={Files}/>}/>
        <Route path="/view/*" element={<Main children={View}/>}/>
        <Route path="/" element={<Home/>}/>
    </Routes>;
}

const Home = memo(() => (
    <Link to="/files">Przejdź do plików</Link>
));
