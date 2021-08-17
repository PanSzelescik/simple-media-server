import express from 'express';
import {access} from 'fs/promises'
import {thumbnailsDir} from '../../config.js';
import {generateThumbnail} from '../../utils/thumbnail.js';

const router = express.Router({mergeParams: true});
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
            status: 404
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

export default router;
