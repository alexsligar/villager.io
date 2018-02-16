'use strict';

const Joi = require('joi');
const Boom = require('boom');
// const Schema = require('../../lib/schema');
// const swagger = Schema.generate(['400']);

module.exports = {
    description: 'Add list',
    tags: ['api', 'users'],
    validate: {
        payload: { name: Joi.string().required(), description: Joi.string().required() },
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;

        if (!request.payload.name) {
            throw Boom.badRequest('No name provided');
        }
        const list = request.payload;
        list.owner = credentials.id;

        const returnlist = await this.db.lists.insert(list);
        return reply({ data: returnlist });
    }
};
