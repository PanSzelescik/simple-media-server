import express from 'express';
import {filesDir} from '../../config.js';
import {getStats} from './utils/stat.js';

const router = express.Router({mergeParams: true});

router.get('/*', (req, res) => handle(req, res, decodeURIComponent(req._parsedUrl.pathname)));

async function handle(req, res, path = '') {
    try {
        res.json(await getStats(`${filesDir}/${path}`));
    } catch (e) {
        console.error(e);
        res.status(404).json({
            status: 404
        });
    }
}

export default router;
