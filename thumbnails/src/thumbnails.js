import express from 'express';
import {access} from 'fs/promises';
import {resolve} from 'path';
import {spawn} from 'child_process';
import ffmpeg from 'ffmpeg-static';

const router = express.Router({mergeParams: true});
const filesDir = resolve('./files');
const thumbnailsDir = resolve('./cache/thumbnails');
const options = {
    root: thumbnailsDir,
};

router.get('/*', async (req, res, next) => {
    const path = decodeURIComponent(req._parsedUrl.pathname);
    try {
        await check(path);
        res.sendFile(`./${path}.webp`, options, (err) => {
            if (err) {
                next(err);
            }
        })
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
        await generateThumbnail(path);
    }
}

async function generateThumbnail(path = '') {
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

export default router;
