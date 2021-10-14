import {createContext} from 'react';

export const default_settings = {
    sort_name: 'name',
    sort_reverse: false,
    show_modified: false,
    show_size: false,
    setSettings: () => {}
};

export const SettingsContext = createContext(default_settings);
