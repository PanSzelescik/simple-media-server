import {memo} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {BrowserRouter, Link} from 'react-router-dom';
import AppSwitch from './AppSwitch.jsx';

export default function App() {
    return <BrowserRouter>
        <SimpleNavbar/>
        <Container as={'main'}>
            <AppSwitch/>
        </Container>
    </BrowserRouter>;
}

const SimpleNavbar = memo(() => (
    <Navbar bg="light" expand="lg">
        <Container>
            <Link className="navbar-brand" to="/">Simple Media Server</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link className="nav-link" data-rb-event-key="/files" to="/files">Pliki</Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
));
