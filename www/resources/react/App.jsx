import {useState} from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
import {QueryClient, QueryClientProvider} from 'react-query';
import {BrowserRouter, Link} from 'react-router-dom';
import AppSwitch from './AppSwitch.jsx';
import DropdownSettings from './DropdownSettings.jsx';
import {getFirstSettings, SettingsContext} from './utils/settings.js';
import Cookies from 'universal-cookie';

const queryClient = new QueryClient();

export default function App() {
    const cookies = new Cookies();
    const [settings, setSettings] = useState(getFirstSettings(cookies));
    const value = {...settings, setSettings};

    settings.setDarkModeClass();

    return <QueryClientProvider client={queryClient}>
        <SettingsContext.Provider value={value}>
            <BrowserRouter>
                <Navbar collapseOnSelect variant={settings.getDarkMode()} bg={settings.getDarkMode()} expand="lg">
                    <Container>
                        <Link className="navbar-brand" to="/">Simple Media Server</Link>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" title="Opcje"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link className="nav-link" data-rb-event-key="/files" to="/files">Pliki</Link>
                            </Nav>
                            <DropdownSettings/>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container as={'main'} className={[settings.show_size && 'size', settings.show_modified && 'modified'].filter(Boolean).join(' ')}>
                    <AppSwitch/>
                </Container>
            </BrowserRouter>
        </SettingsContext.Provider>
    </QueryClientProvider>;
}
