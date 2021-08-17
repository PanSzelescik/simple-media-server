import {mkdirSync} from 'fs';
import {resolve} from 'path';

export const port = 3100;
export const debug = false;
export const filesDir = resolve('./files');
export const cacheDir = resolve('./cache');
export const thumbnailsDir = resolve(`${cacheDir}/thumbnails`);

mkdirSync(filesDir, {recursive: true});
mkdirSync(thumbnailsDir, {recursive: true});
