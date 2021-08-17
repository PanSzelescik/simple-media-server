import express from 'express';
import file from './file.js';
import files from './files.js';

const router = express.Router({mergeParams: true});

router.use('/file', file);
router.use('/files', files);

export default router;
