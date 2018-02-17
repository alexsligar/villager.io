'use strict';
const Joi = require('joi');
// const Boom = require('boom');
const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401', '404', '400']);

module.exports = {
    description: 'Add tag to an item',
    tags: ['api', 'mod'],
    validate: {
        params: Joi.object({
            'name': Joi.string().required()
        }),
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },
    handler: async function (request, reply) {

        // const credentials = request.auth.credentials;
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
