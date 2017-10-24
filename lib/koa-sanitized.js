const createDOMPurify = require('dompurify');
const jsdom = require('jsdom');
const window = jsdom.jsdom('', {
    features: {
        FetchExternalResources: false, // disables resource loading over HTTP / filesystem
        ProcessExternalResources: false // do not execute JS within script blocks
    }
}).defaultView;
const DOMPurify = createDOMPurify(window);
_ = require('underscore');

const config = {
    ADD_ATTR: ['controls'],
    ADD_TAGS: ['iframe']
}

let koaSanitized = function () {
    return async (ctx, next) => {
        [ctx.request.body, ctx.query].forEach(function (val, ipar, request) {
            if (_.size(val)) {
                _.each(val, function (val, ichild) {

                    if (val) {
                        //strings
                        if (_.isString(val)) {
                            request[ipar][ichild] = sanitizeString(val);
                        }

                        //arrays and objects
                        if (_.isArray(val) || _.isObject(val)) {
                            request[ipar][ichild] = sanitizeObject(val);
                        }
                    }
                });
            }
        });
        await next();
    }
};

function sanitizeString(val) {
    let sanitized = DOMPurify.sanitize(val, config);
    sanitized = decodeStr(sanitized);
    return sanitized;
}

function sanitizeObject(val) {
    let restore;
    try {
        let teardown = JSON.stringify(val);
        let clean = DOMPurify.sanitize(teardown, config);
        clean = decodeStr(clean);
        restore = JSON.parse(clean);
    } catch (e) {
        console.log(e);
        restore = val;
    }

    return restore;
}

function decodeStr(text) {
    var replacements = [
        ['amp', '&'],
        ['apos', '\''],
        ['lt', '<'],
        ['gt', '>']
    ];

    replacements.forEach(function (replace) {
        text = text.replace(new RegExp('&' + replace[0] + ';', 'g'), replace[1]);
    });

    return text;
};

module.exports = koaSanitized;