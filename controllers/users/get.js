'use strict';

const Boom = require('boom');
const Schema = require('../../lib/responseSchema');
const RequestSchema = require('../../lib/requestSchema');

const swagger = Schema.generate(['404']);

module.exports = {
    description: 'Returns a user by username',
    tags: ['api', 'users', 'public'],
    auth: false,
    validate: {
        params: RequestSchema.usernameParam
    },
    handler: async function (request, reply) {

        const user = await this.db.users.get_public_by_username({ username: request.params.username });
        if (!user) {
            throw Boom.notFound();
        }

        return reply({ data: user });
    },
    response: {
        status: {
            200: Schema.get_user_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
