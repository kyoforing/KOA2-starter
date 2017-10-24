"use strict";

const Format = require('../lib/format.js');
const Router = require('koa-router');
const router = module.exports = new Router();

router.get('/test', (ctx, next) => {
    ctx.body = Format.success(null, 'HiHi', ctx);
});