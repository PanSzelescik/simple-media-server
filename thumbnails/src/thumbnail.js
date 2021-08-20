import express from 'express';
import {access, mkdir} from 'fs/promises';
import {resolve} from 'path';
import {spawn} from 'child_process';
import ffmpegStatic from 'ffmpeg-static';
import ffprobeStatic from 'ffprobe-static';
import {EOL} from 'os';

const router = express.Router({mergeParams: true});
const filesDir = resolve('./files');
const thumbnailsDir = resolve('./cache/thumbnails');
const options = {
    root: thumbnailsDir
};

router.get('/*', async (req, res, next) => {
    const path = decodeURIComponent(req._parsedUrl.pathname);
    try {
        await check(path);
        res.sendFile(`./${path}.webp`, options, (err) => {
            if (err) {
                next(err);
            }
        });
    } catch (e) {
        console.error(e);
        res.status(404).json({
            message: `Thumbnail for ${path} not found`
        });
    }
});

async function check(path = '') {
    try {
        await access(`${thumbnailsDir}/${path}.webp`);
    } catch (e) {
        const dirs = path.split('/');
        dirs.pop();

        const [duration] = await Promise.all([
            getDuration(path),
            mkdir(`${thumbnailsDir}${dirs.join('/')}`, {recursive: true})
        ]);

        await generateThumbnail(path, duration);
    }
}

async function generateThumbnail(path = '', duration = 0) {
    console.log(`Generating thumbnail for: ${path}, duration: ${duration}`);
    return new Promise(((resolve, reject) => {
        const args = [
            '-ss', `${Math.floor(duration / 2)}`,
            '-i', `${filesDir}/${path}`,
            '-vframes', '1',
            `${thumbnailsDir}${path}.webp`
        ];
        const process = spawn(ffmpegStatic, args, {
            windowsHide: true,
            shell: false
        });
        process.once('error', reject);
        process.once('exit', (code, signal) => resolve({code, signal}));
    }));
}

async function getDuration(path = '') {
    console.log(`Getting duration for: ${path}`);
    return new Promise(((resolve, reject) => {
        let data = '';
        const args = [
            `${filesDir}/${path}`,
            '-show_entries', 'stream=duration'
        ];
        const process = spawn(ffprobeStatic.path, args, {
            windowsHide: true,
            shell: false
        });
        process.stdout.on('data', (buffer) => data += buffer.toString());
        process.once('error', reject);
        process.once('exit', () => {
            const array = data.split(EOL)
                .filter((string) => string && string !== '[STREAM]' && string !== '[/STREAM]' && string.startsWith('duration='));
            const item = array[0];
            if (item) {
                const duration = +(item.split('=')[1]);
                if (!isNaN(duration)) {
                    resolve(Math.floor(duration));
                    return;
                }
            }
            resolve(0);
        });
    }));
}

export default router;
