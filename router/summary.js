"use strict";

const Format = require('../lib/format.js');
const Router = require('koa-router');
const knex = require('../config/knexConfig').read();
const router = module.exports = new Router();


router.get('/test', async (ctx) => {
    let countResult = await knex('useraccount').count('* as count')
    .then((rows) => {
        return rows[0];
    }).catch(function(error) {
        throw error;
    });

    ctx.body = Format.success(null, countResult, ctx);
});