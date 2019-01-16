'use strict';

const Joi = require('joi');
const Boom = require('boom');
// const server = require('../../server');
const Schema = require('../../lib/responseSchema');

const swagger = Schema.generate(['404','401']);

module.exports = {
    description: 'Returns all owners of an item',
    tags: ['api', 'mod'],
    validate: {
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown(),
        params: { id: Joi.string().guid().required() }
    },
    handler: async function (request, reply) {

        const { id } = request.params;
        const relation = await this.db.item_owners.find({ item_id: id },['username']);
        const credentials = request.auth.credentials;
        if (credentials.role === 'user') {
            throw Boom.unauthorized('Not permitted use this feature');
        }

        if (!relation[0]) {
            throw Boom.notFound();
        }

        return reply({ data: relation });
    },
    response: {
        status: {
            200: Schema.usernames_reponse
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
