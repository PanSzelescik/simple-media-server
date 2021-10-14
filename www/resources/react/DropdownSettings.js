import {useContext} from 'react';
import {Nav, NavDropdown} from 'react-bootstrap';
import {SettingsContext} from './utils/settings.js';
import Cookies from 'universal-cookie';

export default function DropdownSettings() {
    const cookies = new Cookies();
    const settings = useContext(SettingsContext);

    function onSortChange(eventKey) {
        const array = eventKey.split('-', 2);
        const prop = array[0];
        const value = array[1];

        settings.setSettings((oldSettings) => {
            oldSettings[prop] = typeof value === 'undefined' ? !oldSettings[prop] : value;
            const newSettings = {...oldSettings};
            cookies.set('settings', Object.fromEntries(Object.entries(newSettings).filter(([key]) => key !== 'setSettings')));
            return newSettings;
        });
    }

    return <Nav>
        <NavDropdown title="Ustawienia" onSelect={onSortChange}>
            <NavDropdown.Header>Sortowanie</NavDropdown.Header>
            <NavDropdown.Item eventKey="sort_name-name" active={settings.sort_name === 'name'}>Nazwa</NavDropdown.Item>
            <NavDropdown.Item eventKey="sort_name-modified" active={settings.sort_name === 'modified'}>Czas modyfikacji</NavDropdown.Item>
            <NavDropdown.Item eventKey="sort_name-size" active={settings.sort_name === 'size'}>Rozmiar</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Item eventKey="sort_reverse" active={settings.sort_reverse}>Odwrotnie</NavDropdown.Item>
            <NavDropdown.Divider/>
            <NavDropdown.Header>Widok</NavDropdown.Header>
            <NavDropdown.Item eventKey="show_modified" active={settings.show_modified}>Czas modyfikacji</NavDropdown.Item>
            <NavDropdown.Item eventKey="show_size" active={settings.show_size}>Rozmiar</NavDropdown.Item>
        </NavDropdown>
    </Nav>;
}
