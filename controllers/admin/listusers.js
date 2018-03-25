'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate();

module.exports = {
    description: 'Returns all users',
    tags: ['api', 'admin'],
    validate: { headers: Joi.object({ 'authorization': Joi.string().required() }).unknown() },

    handler: async function (request, reply) {

        if (request.auth.credentials.role !== 'admin') {
            throw Boom.unauthorized();
        }

        const users = await this.db.users.getall();

        return reply({ data: users });
    },
    response: {
        status: {
            200: Schema.private_users_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
