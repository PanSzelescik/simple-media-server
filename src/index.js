import {spawn} from 'child_process';
import express from 'express';
import compression from 'compression';
import minifyHTML from 'express-minify-html-2';
import ffmpeg from 'ffmpeg-static';
import {debug, filesDir, port, thumbnailsDir} from './config.js';
import api from './routes/api/api.js';
import file from './routes/file/file.js';
import thumbnail from './routes/thumbnail/thumbnail.js';
import files from './routes/files.js';
import {configure, renderFile} from 'eta';
import logger from 'morgan';
import chalk from 'chalk';
import favicon from 'serve-favicon';
import {format} from 'date-fns';
import locale from 'date-fns/locale/pl/index.js';

const app = express();

if (!debug) {
    app.enable('view cache');
}

configure({
    cache: !debug,
    'view cache': !debug
});

app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compression({filter}))
app.engine('eta', renderFile);
app.set('view engine', 'eta');
app.set('views', './src/views');
app.use(favicon('./build/favicon.ico'));
app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));
app.use(logger((tokens, req, res) => [
    format(new Date(), '[yyyy-MM-dd HH:mm:ss]', {locale}),
    tokens.method(req, res),
    getStatusWithColor(tokens.status(req, res)),
    tokens.url(req, res),
    `${tokens['response-time'](req, res)} ms`
].join(' ')));

app.get('/', (req, res) => res.redirect(301, '/files'));

app.post('/ffmpeg', async (req, res) => {
    const result = await new Promise(((resolve, reject) => {
        const arr = [];
        const process = spawn(ffmpeg.path || ffmpeg, [], {
            windowsHide: true,
            shell: false
        });
        process.once('error', reject);
        process.stderr.on('data', data => arr.push(data.toString()));
        process.stdout.on('data', data => arr.push(data.toString()));
        process.once('exit', (code, signal) => resolve(arr));
    }));
    res.json(result);
})
app.use('/api', api);
app.use(['/files', '/view/*'], files);
app.use('/file', file);
app.use('/thumbnail', thumbnail);
app.get('/resources/service-worker.js', (req, res, next) => {
    res.setHeader('Service-Worker-Allowed', '/');
    next();
});
app.use('/resources', express.static('./build', {
    maxAge: debug ? 0 : 31536000000
}));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

function getStatusWithColor(status) {
    return status >= 500 ? chalk.red.bold(status) // red
        : status >= 400 ? chalk.yellow.bold(status) // yellow
            : status >= 300 ? chalk.cyan.bold(status) // cyan
                : status >= 200 ? chalk.green(status) // green
                    : status; // no color
}

function filter(req, res) {
    return req.headers['x-no-compression'] ? false : compression.filter(req, res)
}
