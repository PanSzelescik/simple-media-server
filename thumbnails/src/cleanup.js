import express from 'express';
import {rm} from 'fs/promises';
import {thumbnailsDir} from './thumbnail.js';

const router = express.Router({mergeParams: true});

router.delete('/', async (req, res) => {
    try {
        await rm(thumbnailsDir, {
            recursive: true,
            force: true
        });
        res.json({
            message: 'Deleted thumbnails cache'
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: 'Error deleting thumbnails'
        })
    }
})

export default router;
