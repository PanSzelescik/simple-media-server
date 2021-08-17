import {spawn} from 'child_process';
import ffmpeg from 'ffmpeg-static';
import {filesDir, thumbnailsDir} from '../config.js';

export async function generateThumbnail(path = '') {
    return new Promise(((resolve, reject) => {
        const args = [
            '-i', `${filesDir}/${path}`,
            '-vf', 'select=eq(n\\,0)',
            `${thumbnailsDir}/${path}.webp`
        ];
        const process = spawn(ffmpeg.path || ffmpeg, args, {
            windowsHide: true,
            shell: false
        });
        process.once('error', reject);
        process.once('exit', (code, signal) => resolve({code, signal}));
    }))
}
