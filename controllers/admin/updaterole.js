'use strict';

const Joi = require('joi');
const Boom = require('boom');

const Schema = require('../../lib/schema');
const swagger = Schema.generate(['401', '404']);

module.exports = {
    description: 'update user role',
    tags: ['api', 'admin'],
    validate: {
        params: {
            username: Joi.string().required()
        },
        payload: {
            role: Joi.any().valid('mod', 'user', 'admin')
        },
        headers: Joi.object({
            'authorization': Joi.string().required()
        }).unknown()
    },

    handler: async function (request, reply) {

        const credentials = request.auth.credentials;

        if (credentials.role === 'admin') {
        }
        else if (credentials.role === 'mod') {
            if (request.payload.role === 'admin') {
                throw Boom.unauthorized();
            }
        }
        else {
            throw Boom.unauthorized();
        }

        let foundUser = await this.db.users.findOne({ username: request.params.username });
        if (!foundUser) {
            throw Boom.notFound();
        }

        await this.db.users.updateOne({ id: foundUser.id }, request.payload);
        foundUser = await this.db.users.get_public_by_username({ username: request.params.username });

        return reply({ data: foundUser });
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
