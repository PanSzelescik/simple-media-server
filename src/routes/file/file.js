import express from 'express';
import {filesDir} from '../../config.js';

const router = express.Router({mergeParams: true});
const options = {
    root: filesDir
};

router.get('/*', (req, res, next) => {
    const path = decodeURIComponent(req._parsedUrl.pathname);
    console.log(path);
    const {m} = req.query;
    const cb = (err) => {
        if (err) {
            next(err);
        }
    };
    if ('download' in req.query) {
        res.download(`./${path}`, cb);
    } else {
        res.sendFile(`./${path}`, {...options, maxAge: m ? 31536000000 : 0}, cb);
    }
});

export default router;
