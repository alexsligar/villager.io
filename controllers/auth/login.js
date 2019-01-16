'use strict';

const JWT = require('jsonwebtoken');
const Boom = require('boom');
const Schema = require('../../lib/responseSchema');
const RequestSchema = require('../../lib/requestSchema');
const Config = require('getconfig');

const swagger = Schema.generate(['401']);

module.exports = {
    description: 'Login user',
    tags: ['api', 'auth'],
    auth: false,
    validate: {
        payload: RequestSchema.authPayload
    },
    handler: async function (request, reply){

        const find_user = await this.db.users.findOne({ username: request.payload.username, password: request.payload.password }, ['id']);
        if (!find_user) {
            throw Boom.unauthorized('Username or password is invalid');
        }
        else {
            const token = JWT.sign(
                { id: find_user.id, username: find_user.username, timestamp: new Date() },
                Config.auth.secret,
                Config.auth.options
            );
            return reply({ data: { token } });
        }
    },
    response: {
        status: {
            200: Schema.token_response
        }
    },
    plugins: {
        'hapi-swagger': swagger
    }
};
