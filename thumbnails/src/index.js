import chalk from 'chalk';
import express from 'express';
import {format} from 'date-fns';
import locale from 'date-fns/locale/pl/index.js';
import logger from 'morgan';
import cleanup from './cleanup.js';
import thumbnails from './thumbnail.js';

const app = express();

app.disable('x-powered-by');

app.use(logger((tokens, req, res) => [
    format(new Date(), '[yyyy-MM-dd HH:mm:ss]', {locale}),
    tokens.method(req, res),
    getStatusWithColor(tokens.status(req, res)),
    tokens.url(req, res),
    `${tokens['response-time'](req, res)} ms`
].join(' ')));

app.use('/thumbnail', thumbnails);
app.use('/cleanup', cleanup);

app.listen(3000, () => {
    console.log('simple-media-server-thumbnails listening at http://localhost:3000');
});

function getStatusWithColor(status) {
    return status >= 500 ? chalk.red.bold(status) // red
        : status >= 400 ? chalk.yellow.bold(status) // yellow
            : status >= 300 ? chalk.cyan.bold(status) // cyan
                : status >= 200 ? chalk.green(status) // green
                    : status; // no color
}
