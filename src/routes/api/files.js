import express from 'express';
import {readdir} from 'fs/promises';
import {map} from 'async';
import {filesDir} from '../../config.js';
import {getStats} from './utils/stat.js';

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => handle(req, res, ''));
router.get('/*', (req, res) => handle(req, res, decodeURIComponent(req._parsedUrl.pathname)));

async function handle(req, res, path = '') {
    try {
        const {type} = req.query;
        const dirents = await readdir(`${filesDir}/${path}`, { withFileTypes: true });
        const mapped = await map(dirents, async (dirent) => [dirent.name, await getStats(`${filesDir}/${path}/${dirent.name}`)]);
        const files = Object.fromEntries(mapped.filter(([, stats]) => stats.type !== 'directory' && filter(stats, type)));
        const directories = Object.fromEntries(mapped.filter(([, stats]) => stats.type === 'directory' && filter(stats, type)));
        res.json({
            path: path.substring(1),
            files,
            directories
        });
    } catch (e) {
        console.error(e);
        res.status(404).json({
            status: 404
        });
    }
}

function filter(stats, type) {
    return type ? stats.type === type : true;
}

export default router;
