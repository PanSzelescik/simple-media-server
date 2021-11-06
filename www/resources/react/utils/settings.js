import {createContext} from 'react';

const themeColor = document.querySelector('meta[name="theme-color"]');
const tileColor = document.querySelector('meta[name="msapplication-TileColor"]');

const default_settings = {
    sort_name: 'name',
    sort_reverse: false,
    show_modified: false,
    show_size: false,
    dark_mode: window.matchMedia('(prefers-color-scheme: dark)').matches,

    getDarkMode: function () {
        return this.dark_mode ? 'dark' : 'light';
    },
    getDarkModeInverted: function () {
        return this.dark_mode ? 'light' : 'dark';
    },
    getDarkModeText: function () {
        return this.dark_mode ? 'text-light' : 'text-dark';
    },
    setDarkModeClass: function () {
        const color = this.dark_mode ? '#000000' : '#ffffff';
        themeColor.setAttribute('content', color);
        tileColor.setAttribute('content', color);
        document.body.classList[this.dark_mode ? 'add' : 'remove']('dark-mode');
    },
    setSettings: () => {}
};

export const blacklisted_settings = ['getDarkMode', 'setDarkModeClass', 'setSettings'];

export const SettingsContext = createContext(default_settings);

export function getFirstSettings(cookies) {
    const fromCookies = cookies.get('settings');
    if (!fromCookies) {
        return default_settings;
    }

    Object.entries(default_settings).forEach(([key, prop]) => {
        if (!(key in fromCookies)) {
            fromCookies[key] = prop;
        }
    });

    return fromCookies;
}
