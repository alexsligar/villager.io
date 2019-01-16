'use strict';

const Joi = require('joi');
const Boom = require('boom');
const Schema = require('../../lib/responseSchema');

const swagger = Schema.generate(['400','400']);

module.exports = {
    description: 'Add list',
    tags: ['api', 'lists'],
    validate: {
        payload: { name: Joi.string().optional(), description: Joi.string().optional() },
        params:{ id: Joi.string().guid() }
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        if (credentials.role !== 'admin' || credentials.role !== 'mod') {
            const foundlist = await this.db.lists.findOne({ id: request.params.id });
            if (foundlist.owner !== credentials.username) {
                throw Boom.unauthorized('Not permitted to edit item');
            }
        }

        if (!request.payload.name) {
            throw Boom.badRequest('No name provided');
        }

        const list = request.payload;
        list.owner = credentials.username;

        await this.db.lists.updateOne({ id: request.params.id }, list);

        const returnlist = await this.db.lists.byid({ id: request.params.id });

        return reply({ data: returnlist });
    },
    response: {
        status: {
            200: Schema.list_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
