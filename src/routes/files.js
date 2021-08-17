import express from 'express';

const router = express.Router({mergeParams: true});

router.get('/*', (req, res) => res.render('files'));

export default router;
