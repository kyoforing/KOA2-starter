require('./config/env-loader');
const env = process.env.NODE_ENV || 'development';
const helmet = require('koa-helmet');
const logger = require('koa-morgan');
const koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const summary = require('./router/summary');
const Format = require('./lib/format.js');
const koaSanitized = require('./lib/koa-sanitized.js');

if (!process.env.VERSION) {
    throw new Error('Can not find configuration file!');
}

// Create a web service
const app = new koa();

// Add log middleware upon other middlewares.
app.use(logger((tokens, req, res) => {
    var logArr = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        'Referrer:', tokens.req(req, res, 'referer'), '-',
        'Origin:', tokens.req(req, res, 'origin'), '-'];
    return logArr.join(' ');
}));
app.use(bodyParser());

// CORS setting
const options = {
    origin: process.env.WHITE_LIST,
    allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
    credentials: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE']
};
app.use(cors(options));

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'", '*']
    },
    setAllHeaders: true
}));
app.use(async (ctx, next) => {
    ctx.set('Strict-Transport-Security', 'max-age=5184000');
    await next();
});

// Error Handler
app.use(async (ctx, next) => {
    if (ctx.originalUrl === '/') {
        return ctx.body = 'Welcome to KOA2';
    }

    try {
        await next();
    } catch (e) {
        console.error(e);
        ctx.status = e.status || 400;

        return ctx.body = Format.create(ctx.status, true, null, e.message || "Unexpected Error.");
    }
});
app.use(koaSanitized());

app.use(async (ctx, next) => {
    let method = ctx.req.method;
    let allowMethod = ['GET', 'PUT', 'POST', 'DELETE'];

    if (allowMethod.indexOf(method) === -1) {
        let err = new Error('Method Not Allowed');
        err.status = 405;
        throw err;
    }
    else {
        await next();
    }
});

// Route Config
app.use(summary.routes());

let port_setting = 8080;
app.listen(port_setting, () => {
    console.log(`[${env}][v${process.env.VERSION}]Server listening on port ${port_setting}`);
});

app.on('error', (err) => {
    console.error('server error', err);
});
