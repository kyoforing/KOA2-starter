"use strict";

const Format = require('../lib/format.js');
const Router = require('koa-router');
const knex = require('../config/knexConfig').read();
const router = new Router();

router.post('/user', async ctx => {
    const { userName } = ctx.request.body;
    const userId = 1;

    ctx.body = Format.success(null, { userId, userName }, ctx);
});

router.get('/user/:userId', async ctx => {
    ctx.body = Format.success(null, sayHello('kyo'), ctx);
});

const sayHello = userName => `Hello ${userName}`;

module.exports = { sayHello, router };