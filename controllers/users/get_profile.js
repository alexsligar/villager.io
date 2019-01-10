'use strict';

const Joi = require('joi');
//const Boom = require('boom');
const Schema = require('../../lib/schema');

const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns private user profile',
    tags: ['api', 'users'],
    validate: {
        headers: Joi.object({ 'authorization': Joi.string().required() }).unknown()
    },
    handler: async function (request, reply) {

        const credentials = request.auth.credentials;
        const user = await this.db.users.findOne({ username: credentials.username });

        return reply({ data: user });
    },
    response: {
        status: {
            200: Schema.private_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
