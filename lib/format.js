"use strict"
/**
 * `format` constructor.
 *
 * @api public
*/
const checkStatusCode = require('./helpers').checkStatusCode;

module.exports = {
    create: (statusCode, error, message, data, ctx) => {
        let rtnObj = {};
        if (!statusCode) throw new Error('Status code is required')
        if (isNaN(Number(statusCode))) throw new Error('Status code not a number')

        ctx.status = statusCode;
        rtnObj.statusCode = statusCode
        rtnObj.error = error || null
        rtnObj.data = data || null
        rtnObj.message = checkStatusCode(rtnObj.statusCode, message)

        return rtnObj
    },

    success: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 200;
        rtnObj.statusCode = 200
        rtnObj.error = false
        rtnObj.data = data || null
        rtnObj.message = message || 'OK'

        return rtnObj
    },

    badRequest: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 400;
        rtnObj.statusCode = 400
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Bad Request'

        return rtnObj
    },


    unAuthorized: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 401;
        rtnObj.statusCode = 401
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Unauth­orized'

        return rtnObj
    },

    forbidden: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 403;
        rtnObj.statusCode = 403
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Forbidden'

        return rtnObj
    },

    notFound: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 404;
        rtnObj.statusCode = 404
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Not Found'

        return rtnObj
    },

    notAllowed: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 405;
        rtnObj.statusCode = 405
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Method Not Allowed'

        return rtnObj
    },

    requestTimeout: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 408;
        rtnObj.statusCode = 408
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Request Timeout'

        return rtnObj
    },

    internalError: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 500;
        rtnObj.statusCode = 500
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Internal Server Error'

        return rtnObj
    },

    badGateway: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 502;
        rtnObj.statusCode = 502
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Bad Gateway'

        return rtnObj
    },

    unavailable: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 503;
        rtnObj.statusCode = 503
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Service Unavai­lable'

        return rtnObj
    },

    gatewayTimeout: (message, data, ctx) => {
        let rtnObj = {};

        ctx.status = 504;
        rtnObj.statusCode = 504
        rtnObj.error = true
        rtnObj.data = data || null
        rtnObj.message = message || 'Gateway Timeout'

        return rtnObj
    }
}
